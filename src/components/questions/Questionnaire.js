import React, {useContext, useEffect, useState} from 'react';
import {Card} from "tabler-react";
import {Alert, Button, Col, OverlayTrigger, ProgressBar, Row, Tooltip} from "react-bootstrap";
import styles from "./Fotter.module.css";
import loaderContext from "../../components/utils/loader/LoaderContext"
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../store/questionnaire-slice";
import SweetAlert from "react-bootstrap-sweetalert";
import useHttp from "../../hooks/UseHttp";
import {questionnaireComponents} from "./Stages";
import {ITINERARY_ID_STORAGE, QUESTIONNAIRE_STORAGE} from "../itinerary/Constants";


const Questionnaire = () => {
    const MANUAL_TOOL_TIP = "Move to the manual trip builder to complete planning your trip.";
    const AUTO_TOOL_TIP = "Let us build the trip for you, check the building progress via \"my trips\" page.";
    const LOCAL_KEY = QUESTIONNAIRE_STORAGE;
    const questionnaire = useSelector(state => state.questionnaireData.questionnaire);
    const stages = useSelector(state => state.questionnaireData.questionnaire.stages)
    const step = useSelector(state => state.questionnaireData.questionnaire.stage)
    const error = useSelector(state => state.questionnaireData.questionnaire.error)
    const errorMsg = useSelector(state => state.questionnaireData.questionnaire.errorMsg)
    const blockSize = useSelector(state => state.questionnaireData.questionnaire.blockSize)
    const dispatch = useDispatch();
    const loader = useContext(loaderContext)

    useEffect(() => {
        const loader = localStorage.getItem(LOCAL_KEY);

        if (loader !== undefined && loader !== null && loader !== "") {
            const questionnaire = JSON.parse(loader);
            dispatch(questionnaireActions.set(questionnaire));
        }

    }, [])

    useEffect(() => {
        const asString = JSON.stringify(questionnaire);
        localStorage.setItem(LOCAL_KEY, asString);
    }, [questionnaire])

    const {isLoading, httpError, sendRequest: postData} = useHttp();
    const [showSendError, setShowSendError] = useState(false)


    useEffect(() => {
        if (httpError !== null && httpError !== undefined) {
            setShowSendError(true);
            setTimeout(() => setShowSendError(false), 2000);
        } else {
            setShowSendError(false)
        }
    }, [httpError])

    useEffect(() => {
        if (isLoading) {
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    const allowPreviousButton = () => {
        return step !== 0
    }

    const allowFinishButton = () => {
        return step === stages.length - 1
    }

    const previousClick = () => {
        dispatch(questionnaireActions.previousStage());
    }

    const nextClick = () => {
        dispatch(questionnaireActions.nextStage());
    }

    const finish = () => {
        localStorage.removeItem(LOCAL_KEY);
        const data = prepareData();

        postData({
            url: process.env.REACT_APP_SERVER_URL + "/completeQuestions",
            method: "POST",
            credentials: 'include',
            body: data
        }, setItinerary).then();
    }

    const setItinerary = (data) => {
        localStorage.setItem(ITINERARY_ID_STORAGE, data)
        window.location = '/itinerary';
    }

    const prepareData = () => {
        let startDateObject = new Date(stages[1].data.startDate);
        let endDateObject = new Date(stages[1].data.endDate);

        startDateObject.setHours(12);
        endDateObject.setHours(12);
        startDateObject.setMinutes(0);
        endDateObject.setMinutes(0);

        return {
            country: stages[0].data.country,
            city: stages[0].data.city,
            startDate: startDateObject,
            endDate: endDateObject,
            adultsCount: stages[2].data.adultsCount.toString(),
            childrenCount: stages[2].data.childrenCount.toString(),
            budget: stages[3].data.priceRange.toString(),
            favoriteAttraction: stages[4].data !== undefined ? JSON.stringify(stages[4].data
                .filter(tag => tag.status === true)
                .map(tag => (
                    {
                        id: tag.id.toString(),
                        name: tag.name !== undefined ? tag.name : "",
                        src: tag.src !== undefined ? tag.src : ""
                    }))) : JSON.stringify([]),
            tripVibes: stages[5].data !== undefined ? JSON.stringify(stages[5].data
                .filter(tag => tag.status === true)
                .map(tag => (
                    {
                        id: tag.id.toString(),
                        name: tag.name !== undefined ? tag.name : "",
                        src: tag.src !== undefined ? tag.src : ""
                    }))) : JSON.stringify([])
        }
    }

    const finishAuto = () => {
        localStorage.removeItem(LOCAL_KEY);
        const data = prepareData();

        postData({
            url: process.env.REACT_APP_SERVER_URL + "/completeQuestionsAuto",
            method: "POST",
            credentials: 'include',
            body: data
        }, setItinerary).then();
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
                <Card.Title>{stages[step].header}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Alert style={{display: error ? "block" : "none"}} variant={'danger'}>
                    {errorMsg === undefined ? "You must fill in all the required fields." : errorMsg}
                </Alert>
                {questionnaireComponents[step]}
            </Card.Body>
            <Card.Footer>
                <Row className={"align-items-center"}>
                    <Col className={styles.marginTop} xs={12} md={allowFinishButton() ? 6 : 8}>
                        <ProgressBar animated striped={true}
                                     now={stages.length === 1 ? 100 : (step + 1) * blockSize}/>
                    </Col>
                    <Col className={styles.marginTop} xs={12} md={allowFinishButton() ? 6 : 4}>
                        <Row>
                            <Col>
                                <div className="d-grid gap-2">
                                    <Button
                                        style={{cursor: allowPreviousButton() ? 'pointer' : 'not-allowed'}}
                                        className={allowPreviousButton() ? 'active' : 'disabled'}
                                        onClick={previousClick}
                                        variant="outline-secondary">
                                        Previous
                                    </Button>{' '}
                                </div>
                            </Col>
                            {!allowFinishButton() &&
                            <Col>
                                <div className="d-grid gap-2">
                                    <Button
                                        onClick={nextClick}
                                        variant={"outline-primary"}>
                                        Next
                                    </Button>{' '}
                                </div>
                            </Col>}
                            {allowFinishButton() &&
                            <>
                                <Col>
                                    <OverlayTrigger placement="top"
                                                    overlay={<Tooltip
                                                        id={"manualToolTip"}>{MANUAL_TOOL_TIP}</Tooltip>
                                                    }>
                                        <div className="d-grid gap-2">
                                            <Button
                                                onClick={finish}
                                                variant={"outline-primary"}>
                                                Finish Manually
                                            </Button>{' '}
                                        </div>
                                    </OverlayTrigger>
                                </Col>
                                <Col>
                                    <OverlayTrigger placement="top"
                                                    overlay={<Tooltip
                                                        id={"autoToolTip"}>{AUTO_TOOL_TIP}</Tooltip>
                                                    }>
                                        <div className="d-grid gap-2">
                                            <Button
                                                onClick={finishAuto}
                                                variant={"outline-success"}>
                                                Send To Auto Fill
                                            </Button>{' '}
                                        </div>
                                    </OverlayTrigger>
                                </Col>
                            </>}
                        </Row>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default Questionnaire;
