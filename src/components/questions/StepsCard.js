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
import TagsListDup from "./tags/TagsListDup";
import {ITINERARY_ID_STORAGE} from "../itinerary/Constants";
import loaderContext from "../../components/utils/loader/LoaderContext"


const SESSION_STEP_CARD_MEM = "steps_card_memory";

const StepsCard = () => {

    const loader = useContext(loaderContext)

    const tripVibesTags = [
        {id: 0, name: "Chill", src: ""},
        {id: 1, name: "Tag2", src: ""},
        {id: 2, name: "Tag3", src: ""}
    ]

    const favoriteAttractionTags = [
        {
            id: 3,
            name: "Amusement Park",
            src: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/06/02/580699-amusement-park-060217.jpg"
        },
        {
            id: 4,
            name: "Aquarium",
            src: "https://www.georgiaaquarium.org/wp-content/uploads/2019/05/GAQ-Digital-Marketing-201-1-1024x683.jpg"
        },
        {
            id: 5,
            name: "Zoo",
            src: "https://images.miamiandbeaches.com/crm/simpleview/image/upload/c_fit,w_1440,h_900/crm/miamifl/Zoo_Miami_Kids_Feeding_Giraffes_12.17.20_405706D2-5056-A36A-0B8E0EDD9C2F8424-405705585056a36_40570728-5056-a36a-0bd4ba282c839594.jpg"
        },
        {
            id: 6,
            name: "Art Gallery",
            src: "https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2019/01/dg00xh.jpg"
        },
        {
            id: 7,
            name: "Camp Ground",
            src: "https://365cincinnati.com/wp-content/uploads/2020/05/Camping-at-the-camground-900x525.jpg"
        },
        {
            id: 8,
            name: "Casino",
            src: "https://ventsmagazine.com/wp-content/uploads/2020/11/Firekeepers-Casino-Hotel_54_990x660.jpg"
        },
        {id: 9, name: "Museum", src: "https://media.timeout.com/images/105246805/image.jpg"},
        {
            id: 10,
            name: "Night Life",
            src: "https://belgradeatnight.com/wp-content/uploads/2018/04/Belgrade-nightlife-tips-for-how-to-survive.jpg"
        },
        {
            id: 11,
            name: "Park",
            src: "https://images.theconversation.com/files/118670/original/image-20160414-4709-vaix4b.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop"
        },
        {
            id: 12,
            name: "Shopping Mall",
            src: "https://i.pinimg.com/originals/0f/3d/f9/0f3df9f9f55c2250c16163e9be797809.jpg"
        },
        {
            id: 13,
            name: "Spa",
            src: "https://vilaspa.co.il/wp-content/uploads/2020/07/spa-arrangement-with-towel-soap-salt_23-2148268482-300x200.jpg"
        },
        {id: 14, name: "Test", src: "https://www.pro-sky.com/images/en/news/news_header_webseite_-49-_342_big.jpg"}
    ]

    const getStage = () => {
        return localStorage.getItem(SESSION_STEP_CARD_MEM);
    }
    const {isLoading, error, sendRequest: postData} = useHttp();
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
            isValid: false,
            defaultValid: false
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
            content: <TagsList
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
            content: <TagsListDup
                updateList={(value) => {
                    stagesList[getStage()].data = value
                }}
                tagsList={tripVibesTags}
                imageTag={true}/>,
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
        if(isLoading){
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
                        name: tag.name,
                        src: tag.src
                    }))) : JSON.stringify([]),
            tripVibes: stagesList[5].data !== undefined ? JSON.stringify(stagesList[5].data
                .filter(tag => tag.status === true)
                .map(tag => (
                    {
                        id: tag.id.toString(),
                        name: tag.name,
                        src: tag.src
                    }))) : JSON.stringify([])
        };

        postData({
            url: process.env.REACT_APP_SERVER_URL + "/completeQuestions",
            method: "POST",
            body: data
        }, setItinerary).then(loader.setShow(false));
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
                                <Button
                                    style={{cursor: previousState ? 'pointer' : 'not-allowed'}}
                                    className={previousState ? 'active' : 'disabled'}
                                    onClick={previousClick}
                                    block={true}
                                    variant="outline-secondary">
                                    Previous
                                </Button>{' '}
                            </Col>
                            <Col xs={6}>
                                <Button
                                    onClick={finishButton ? finish : nextClick}
                                    block={true}
                                    variant={"outline-primary"}>
                                    {finishButton ? "Finish" : "Next"}
                                </Button>{' '}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default StepsCard;
