import React, {useEffect, useState} from 'react';
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

const SESSION_STEP_CARD_MEM = "steps_card_memory";

const StepsCard = () => {

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
                tagsList={["Tag1", "Tag2", "Tag3"]}/>,
            // srcList={["Tag1", "Tag2", "Tag3"]}
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
                tagsList={["Tag1", "Tag2", "Tag4"]}/>,
            // srcList={["Tag1", "Tag2", "Tag3"]}
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
        const data = {
            country: stagesList[0].data.country,
            city: stagesList[0].data.city,
            startDate: stagesList[1].data.startDate,
            endDate: stagesList[1].data.endDate,
            adultsCount: stagesList[2].data.adultsCount.toString(),
            childrenCount: stagesList[2].data.childrenCount.toString(),
            budget: stagesList[3].data.priceRange.toString(),
            favoriteAttraction: JSON.stringify(stagesList[4].data),
            tripVibes: JSON.stringify(stagesList[5].data)
        };

        postData({
                url: process.env.REACT_APP_SERVER_URL + "/completeQuestions",
                method: "POST",
                body: data
            }).then(console.log("done"));
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
