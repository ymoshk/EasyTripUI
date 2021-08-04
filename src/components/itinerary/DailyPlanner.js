import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import AttractionsSelectBox from "./selectBox/AttractionsSelectBox";
import EiffelTour from "../../images/EiffelTour.jpg";
import louvre from "../../images/louvre.jpg";
import nortedame from "../../images/nortedame.jpg";
import styles from "./DailyPlanner.module.css";
import DailyDnd from "./DailyDnd";
import HoursBar from "./hoursBar/HoursBar";
import ChangeHoursContext from "./ChangeHourContext";
import DayPicker from "./dayPicker/DayPicker";


const DailyPlanner = () => {
    let data = {
        Restaurants:
            [{
                name: "Eiffel Tower",
                isRecommended: true,
                id: 1,
                type: "Must See",
                rating: 4.5,
                userTotalRating: 358,
                image: {url: EiffelTour, height: 1025, width: 616},
                closedTemporarily: false,
                priceRange: 3,
                startTime: '10:30',
                endTime: '12:00',
                hours: {
                    sunday: '9am-6pm',
                    monday: '9am-6pm',
                    tuesday: '9am-6pm',
                    wednesday: '9am-6pm',
                    thursday: '9am-6pm',
                    friday: '9am-6pm',
                    saturday: 'Closed'
                },
                lat: 48.8584,
                lng: 2.2945
            },
                {
                    name: "Louvre",
                    isRecommended: false,
                    id: 2,
                    type: "Art",
                    rating: 3.5,
                    userTotalRating: 123,
                    image: {url: louvre, height: 780, width: 1280},
                    closedTemporarily: true,
                    priceRange: 1,
                    startTime: '12:00',
                    endTime: '12:30',
                    hours: {
                        sunday: '9am-6pm',
                        monday: '9am-6pm',
                        tuesday: '9am-6pm',
                        wednesday: '9am-6pm',
                        thursday: '9am-6pm',
                        friday: '9am-6pm',
                        saturday: 'Closed'
                    },
                    lat: 48.8606,
                    lng: 2.3376
                },
                {
                    name: "notre dame",
                    id: 3,
                    isRecommended: true,
                    type: "Art",
                    rating: 3.5,
                    userTotalRating: 123,
                    image: {url: nortedame, height: 868, width: 636},
                    closedTemporarily: false,
                    priceRange: 1,
                    startTime: '12:00',
                    endTime: '12:30',
                    hours: {
                        sunday: '9am-6pm',
                        monday: '9am-6pm',
                        tuesday: '9am-6pm',
                        wednesday: '9am-6pm',
                        thursday: '9am-6pm',
                        friday: '9am-6pm',
                        saturday: 'Closed'
                    },
                    lat: 48.8530,
                    lng: 2.3499
                }
            ]
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
                                    types={["Restaurants", "Test2"]}
                                    data={data}
                                />
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col>
                                        <DayPicker/>
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
