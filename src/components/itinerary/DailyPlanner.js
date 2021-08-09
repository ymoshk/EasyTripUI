import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import AttractionsSelectBox from "./attraction/menu/selectBox/AttractionsSelectBox";
import styles from "./DailyPlanner.module.css";
import DailyDnd from "./DailyDnd";
import HoursBar from "./hoursBar/HoursBar";
import ChangeHoursContext from "./ChangeHourContext";
import DayPicker from "./dayPicker/DayPicker";
import {itineraryActions} from "../../store/itinerary-slice";
import {useDispatch, useSelector} from "react-redux";
import {fetchAttractionsDurations, fetchItineraryData, updateItineraryDay} from "../../store/itinerary-actions";
import SweetAlert from "react-bootstrap-sweetalert";

const DailyPlanner = () => {
    const dispatch = useDispatch();
    const myItinerary = useSelector(state => state.itineraryData.itinerary);

    useEffect(() => {
        dispatch(fetchItineraryData());
        dispatch(fetchAttractionsDurations());
    }, [dispatch])


    const dayChangedHandler = (index) => {
        dispatch(itineraryActions.updateDay(index));
    }

    useEffect(() => {
        const id = myItinerary.itineraryId;
        const index = myItinerary.currentDayIndex;
        const currentDay = myItinerary.itineraryDays[index];
        updateItineraryDay(id, currentDay, index);
    }, [myItinerary])


    const [showCleanDayAlert, setShowCleanDayAlert] = useState(false);

    const cleanDayAlert = () => {
        return <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, clean the current day"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            focusCancelBtn
            onConfirm={() => {
                dispatch(itineraryActions.cleanDay());
                setShowCleanDayAlert(false);
            }}
            onCancel={() => setShowCleanDayAlert(false)}
        >
            Any attraction you added to the current day will be removed.
        </SweetAlert>
    }

    const [showStartOverAlert, setShowStartOverAlert] = useState(false);

    const startOverAlert = () => {
        return <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, start over planning your trip"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            focusCancelBtn
            onConfirm={() => {
                dispatch(itineraryActions.startOver());
                setShowStartOverAlert(false);
            }}
            onCancel={() => setShowStartOverAlert(false)}
        >
            If you confirm this action, any attraction you added to your trip will be removed.
        </SweetAlert>
    }

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const finishItineraryAlert = () => {
        const moveToItineraryPage = () => {
            // TODO
            setShowSuccessAlert(false);
            alert('moving to itinerary page');
        }
        return <SweetAlert
            success
            title="Saved!"
            onConfirm={moveToItineraryPage}
            timeout={2000}
        >
            Your trip is now saved!
        </SweetAlert>
    }

    return (
        // <SiteWrapper>
        <ChangeHoursContext.Provider
            value={{
                changeHoursFunc: undefined,
                changeEndHourFunc: undefined,
                isDragDisabled: false,
                isOnButton: false
            }}>
            <Card style={{height: "100%"}}>
                {showCleanDayAlert && cleanDayAlert()}
                {showStartOverAlert && startOverAlert()}
                {showSuccessAlert && finishItineraryAlert()}
                <Card.Body>
                    <Card.Text as={"div"}>
                        <Row>
                            <Col md={4}>
                                <AttractionsSelectBox
                                    classname={styles.maxSize}
                                />
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col>
                                        <DayPicker onDayChange={dayChangedHandler}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={{span: 4}}>
                                        <div className="d-grid gap-2">
                                            <Button onClick={() => setShowCleanDayAlert(true)}
                                                    style={{marginBottom: 20}}
                                                    variant={"outline-primary"}
                                                    size="lg">Clean Day</Button>
                                        </div>
                                    </Col>
                                    <Col md={{span: 4}}>
                                        <div className="d-grid gap-2">
                                            <Button onClick={() => setShowSuccessAlert(true)}
                                                    style={{marginBottom: 20}}
                                                    variant={"outline-success"}
                                                    size="lg">Save Your Trip</Button>
                                        </div>
                                    </Col>
                                    <Col md={{span: 4}}>
                                        <div className="d-grid gap-2">
                                            <Button onClick={() => setShowStartOverAlert(true)}
                                                    style={{marginBottom: 20}}
                                                    variant={"outline-dark"}
                                                    size="lg">Start Over</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Card id={"DailyPlannerContainer"} style={{height: "100%"}}>
                                        <HoursBar startHour={8} count={17}/>
                                        <Row style={{
                                            zIndex: 10,
                                            position: "absolute",
                                            height: "100%",
                                            width: "100%",
                                            top: 11
                                        }}>
                                            <Col xs={{span: 11, offset: 1}}>
                                                <div style={{marginLeft: 11, height: "100%", width: "100%"}}>
                                                    <DailyDnd/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </ChangeHoursContext.Provider>
        // </SiteWrapper>
    );
};

export default DailyPlanner;
