import React, {useEffect, useState} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import AttractionsSelectBox from "./selectBox/AttractionsSelectBox";
import styles from "./DailyPlanner.module.css";
import DailyDnd from "./DailyDnd";
import HoursBar from "./hoursBar/HoursBar";
import ChangeHoursContext from "./ChangeHourContext";
import DayPicker from "./dayPicker/DayPicker";
import {itineraryActions} from "../../store/itinerary-slice";
import {useDispatch} from "react-redux";
import {fetchItineraryData} from "../../store/itinerary-actions";

const DailyPlanner = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItineraryData());
    }, [dispatch])


    const dayChangedHandler = (index) => {
        dispatch(itineraryActions.updateDay(index));
    }

    return (
        <ChangeHoursContext.Provider
            value={{
                changeHoursFunc: undefined,
                changeEndHourFunc: undefined,
                isDragDisabled: false
            }}>
            <Card style={{height: "100%"}}>
                <Card.Body>
                    <Card.Text>
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
    );
};

export default DailyPlanner;
