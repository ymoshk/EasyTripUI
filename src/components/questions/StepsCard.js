import React, {useContext, useEffect, useState} from 'react';
import {Card} from "tabler-react";
import {Alert, Button, Col, ProgressBar, Row} from "react-bootstrap";
import styles from "./Fotter.module.css";
import PlaceSelection from "./destination/PlaceSelection";
import DateRangePicker from "../date/DateRangePicker";
import PassengersCount from "./PassengersCount";
import PriceRange from "./price_range/PriceRange";
import TagsList from "./tags/TagsList";
import useHttp from "../../hooks/UseHttp";
import {ITINERARY_ID_STORAGE} from "../itinerary/Constants";
import loaderContext from "../../components/utils/loader/LoaderContext"
import zoo from "../../images/stepsCard/tags/zoo.png"
import amusementPark from "../../images/stepsCard/tags/amusementPark.png"
import aquarium from "../../images/stepsCard/tags/aquarium.png"
import artGallery from "../../images/stepsCard/tags/artGallery.png"
import campground from "../../images/stepsCard/tags/campground.png"
import casino from "../../images/stepsCard/tags/casino.png"
import museum from "../../images/stepsCard/tags/museum.png"
import nightlife from "../../images/stepsCard/tags/nightlife.png"
import park from "../../images/stepsCard/tags/park.png"
import shoppingMall from "../../images/stepsCard/tags/shoppingMall.png"
import spa from "../../images/stepsCard/tags/spa.png"
import SweetAlert from "react-bootstrap-sweetalert";


const SESSION_STEP_CARD_MEM = "steps_card_memory";

const StepsCard = () => {

    const loader = useContext(loaderContext)

    const tripVibesTags = [
        {id: 0, name: "Chill", src: undefined},
        {id: 1, name: "Tag2", src: undefined},
        {id: 2, name: "Tag3", src: undefined}
    ]

    const favoriteAttractionTags = [
        {
            id: 3,
            name: "Amusement Park",
            src: amusementPark
        },
        {
            id: 4,
            name: "Aquarium",
            src: aquarium
        },
        {
            id: 5,
            name: "Zoo",
            src: zoo
        },
        {
            id: 6,
            name: "Art Gallery",
            src: artGallery
        },
        {
            id: 7,
            name: "Camp Ground",
            src: campground
        },
        {
            id: 8,
            name: "Casino",
            src: casino
        },
        {
            id: 9,
            name: "Museum",
            src: museum
        },
        {
            id: 10,
            name: "Night Life",
            src: nightlife
        },
        {
            id: 11,
            name: "Park",
            src: park
        },
        {
            id: 12,
            name: "Shopping Mall",
            src: shoppingMall
        },
        {
            id: 13,
            name: "Spa",
            src: spa
        },
        {
            id: 14,
            name: "Test",
            src: "https://www.pro-sky.com/images/en/news/news_header_webseite_-49-_342_big.jpg"
        }
    ]

    const getStage = () => {
        return localStorage.getItem(SESSION_STEP_CARD_MEM);
    }
    const {isLoading, error, sendRequest: postData} = useHttp();

    const [showSendError, setShowSendError] = useState(false)

    useEffect(() => {
        if (error !== null) {
            setShowSendError(true);
            setTimeout(() => setShowSendError(false), 2000);
        } else {
            setShowSendError(false)
        }
    }, [error])

    const [stage, setStage] = useState(0);
    const [stagesList, setStageList] = useState([
        {
            key: 0,
            header: "Select Destination",
            content: <PlaceSelection
                setValidation={(value) => {
                    stagesList[getStage()].isValid = value;
                }}
                setData={(country, city) => {
                    stagesList[getStage()].data = {country: country, city: city}
                }}
            />,
            isValid: false,
            defaultValid: false
        },
        {
            key: 1,
            header: "Dates Selection",
            content: <DateRangePicker
                setValidation={(value) => {
                    stagesList[getStage()].isValid = value;
                }}
                setData={(start, end) => {
                    stagesList[getStage()].data = {startDate: start, endDate: end}
                }}
            />,
            isValid: true,
            defaultValid: true
        },
        {
            key: 2,
            header: "Passengers Count",
            content: <PassengersCount
                updateAdults={(adults) => {
                    stagesList[getStage()].data = {...stagesList[getStage()].data, adultsCount: adults}
                }}
                updateChildren={(children) => {
                    stagesList[getStage()].data = {...stagesList[getStage()].data, childrenCount: children}
                }}
            />,
            data: {adultsCount: 1, childrenCount: 0},
            isValid: true,
            defaultValid: true
        },
        {
            key: 3,
            header: "Budget Selection",
            content: <Col md={{offset: 2, span: 8}}><PriceRange
                onAfterChange={(value) => {
                    stagesList[getStage()].data = {priceRange: value}
                }}
            /></Col>,
            isValid: true,
            defaultValid: true,
            data: {priceRange: 0}
        },
        {
            key: 4,
            header: "Favorite attractions",
            content: <TagsList key={"step4"}
                               updateList={(value) => {
                                   stagesList[getStage()].data = value
                               }}
                               tagsList={favoriteAttractionTags}
                               imageTag={true}/>,
            isValid: true,
            defaultValid: true,
        },
        {
            key: 5,
            header: "Trip Vibes",
            content: <TagsList key={"step5"}
                               updateList={(value) => {
                                   stagesList[getStage()].data = value
                               }}
                               tagsList={tripVibesTags}
                               imageTag={false}/>,
            isValid: true,
            defaultValid: true,
        },
    ]);

    const [header, setHeader] = useState(stagesList[0].header);
    const [content, setContent] = useState(stagesList[0].content);

    useEffect(() => {
        setHeader(stagesList[stage].header);
        setContent(stagesList[stage].content);
        localStorage.setItem(SESSION_STEP_CARD_MEM, stage);
    }, [stage])

    useEffect(() => {
        if (isLoading) {
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    const [showError, setShowError] = useState(false);
    const [previousState, setPreviousState] = useState(stage !== 0);
    const [finishButton, setFinishButton] = useState(stage === stagesList.length - 1);
    const stagesCount = stagesList.length - 1;
    const blockSize = 100 / stagesCount;

    const changeStage = (newStage) => {
        if (newStage === 0) {
            setPreviousState(false);
            setFinishButton(false);
        } else if (newStage === stagesCount) {
            setFinishButton(true);
            setPreviousState(true);
        } else {
            setPreviousState(true);
            setFinishButton(false);
        }

        setStage(newStage)
    }

    const nextClick = () => {
        if (stage < stagesCount && checkValidation(stage)) {
            changeStage(stage + 1);
        }
    }

    const previousClick = () => {
        if (stage > 0) {
            stagesList[getStage() - 1].isValid = stagesList[getStage() - 1].defaultValid;
            changeStage(stage - 1);
        }
    }

    const finish = () => {
        if (stage === stagesCount && checkValidation(stage)) {
            localStorage.setItem(SESSION_STEP_CARD_MEM, 0);
            sendData();
        }
    }
    const sendData = () => {
        let startDateObject = new Date(stagesList[1].data.startDate);
        let endDateObject = new Date(stagesList[1].data.endDate);

        startDateObject.setHours(12);
        endDateObject.setHours(12);
        startDateObject.setMinutes(0);
        endDateObject.setMinutes(0);

        const data = {
            country: stagesList[0].data.country,
            city: stagesList[0].data.city,
            startDate: startDateObject,
            endDate: endDateObject,
            adultsCount: stagesList[2].data.adultsCount.toString(),
            childrenCount: stagesList[2].data.childrenCount.toString(),
            budget: stagesList[3].data.priceRange.toString(),
            favoriteAttraction: stagesList[4].data !== undefined ? JSON.stringify(stagesList[4].data
                .filter(tag => tag.status === true)
                .map(tag => (
                    {
                        id: tag.id.toString(),
                        name: tag.name !== undefined ? tag.name : "",
                        src: tag.src !== undefined ? tag.src : ""
                    }))) : JSON.stringify([]),
            tripVibes: stagesList[5].data !== undefined ? JSON.stringify(stagesList[5].data
                .filter(tag => tag.status === true)
                .map(tag => (
                    {
                        id: tag.id.toString(),
                        name: tag.name !== undefined ? tag.name : "",
                        src: tag.src !== undefined ? tag.src : ""
                    }))) : JSON.stringify([])
        };

        postData({
            url: process.env.REACT_APP_SERVER_URL + "/completeQuestions",
            method: "POST",
            body: data
        }, setItinerary).then();
    }

    const setItinerary = (data) => {
        localStorage.setItem(ITINERARY_ID_STORAGE, data)
        window.location = '/itinerary';
    }

    const checkValidation = (newStage) => {
        if (stagesList[newStage].isValid) {
            setShowError(false);
            return true;
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000)
            return false;
        }
    }

    return (
        <Card>
            {showSendError && <SweetAlert
                danger
                confirmBtnText="OK"
                title="Error!"
                focusCancelBtn
                onConfirm={() => window.location = '/'}
                onCancel={() => window.location = '/'}
                timeout={2000}
            >
                {error}
            </SweetAlert>
            }
            <Card.Header>
                <Card.Title>{header}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Alert style={{display: showError ? "" : "none"}} variant={'danger'}>You must fill in all the required
                    fields.</Alert>
                {content}
            </Card.Body>
            <Card.Footer>
                <Row className={"align-items-center"}>
                    <Col className={styles.marginTop} xs={12} md={8}>
                        <ProgressBar animated striped={true}
                                     now={stagesList.length === 1 ? 100 : stage * blockSize}/>
                    </Col>
                    <Col className={styles.marginTop} xs={12} md={4}>
                        <Row>
                            <Col xs={6}>
                                <div className="d-grid gap-2">
                                    <Button
                                        style={{cursor: previousState ? 'pointer' : 'not-allowed'}}
                                        className={previousState ? 'active' : 'disabled'}
                                        onClick={previousClick}
                                        variant="outline-secondary">
                                        Previous
                                    </Button>{' '}
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div className="d-grid gap-2">
                                    <Button
                                        onClick={finishButton ? finish : nextClick}
                                        variant={"outline-primary"}>
                                        {finishButton ? "Finish" : "Next"}
                                    </Button>{' '}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default StepsCard;
