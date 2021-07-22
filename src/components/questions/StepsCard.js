import React, {useState} from 'react';
import {Card} from "tabler-react";
import {Alert, Button, Col, ProgressBar, Row} from "react-bootstrap";
import styles from "./Fotter.module.css";
import DummyContent from "./dummyContent";


const SESSION_STEP_CARD_MEM = "steps_card_memory";

const StepsCard = () => {
    const getStage = () => {
        const value = localStorage.getItem(SESSION_STEP_CARD_MEM);
        if (value !== null && value !== undefined) {
            return parseInt(value);
        } else {
            return 0;
        }
    }

    const [stagesList, setStageList] = useState([
        {

            header: "",
            content:
                <DummyContent
                    text={0}
                    index={0}
                    setValidation={(index, value) => {
                        stagesList[getStage()].isValid = value;
                    }}
                />,
            isValid: false,
            data: {}
        },
        {
            header: "step 1",
            content:
                <DummyContent
                    text={1}
                    index={1}
                    setValidation={(index, value) => {
                        stagesList[getStage()].isValid = value;
                    }}
                />,
            isValid: false,
            data: {}
        },
        {
            header: "step 2",
            content:
                <DummyContent
                    text={2}
                    index={2}
                    setValidation={(index, value) => {
                        stagesList[getStage()].isValid = value;
                    }}
                />,
            isValid: false,
            data: {}
        }
    ]);

    const [showError, setShowError] = useState(false);
    const [previousState, setPreviousState] = useState(getStage() !== 0);
    const [finishButton, setFinishButton] = useState(getStage() === stagesList.length - 1);


    const setStage = (stage) => {
        localStorage.setItem(SESSION_STEP_CARD_MEM, stage);
    }


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
        if (getStage() < stagesCount && checkValidation(getStage())) {
            changeStage(getStage() + 1);
        }
    }

    const previousClick = () => {
        if (getStage() > 0) {
            changeStage(getStage() - 1);
        }
    }

    const finish = () => {
        if (getStage() === stagesCount && checkValidation(getStage())) {
            localStorage.setItem(SESSION_STEP_CARD_MEM, 0)
            alert("finish");
        }
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
                <Card.Title>{stagesList[getStage()].header}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Alert style={{display: showError ? "" : "none"}} variant={'danger'}>You must fill in all the required
                    fields.</Alert>
                {stagesList[getStage()].content}
            </Card.Body>
            <Card.Footer>
                <Row className={"align-items-center"}>
                    <Col className={styles.marginTop} xs={12} md={8}>
                        <ProgressBar animated striped={true} now={getStage() * blockSize}/>
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
                                    variant={finishButton ? "info" : "outline-primary"}>
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
