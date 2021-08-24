import React, {useRef} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import HoursBar from "../../hoursBar/HoursBar";
import {ONE_HOUR_HEIGHT_CHECKOUT} from "../../Constants";
import FreeTime from "../../attraction/special/FreeTime";
import CheckoutAttraction from "./CheckoutAttraction";


const DailyCheckout = (props) => {

    const dayIndex = useSelector(state => state.itineraryData.itinerary.currentDayIndex);
    const dayAttractions = props.dailyItinirary.activities;


    const extractTime = (attraction) => {
        let startTime = new Date("01-01-2030 " + attraction.startTime + ":00");
        let endTime = new Date("01-01-2030 " + attraction.endTime + ":00");

        return Math.abs((endTime - startTime) / (1000 * 60 * 60));
    }

    const getHeight = (attraction) => {
        if (attraction) {
            return (ONE_HOUR_HEIGHT_CHECKOUT * extractTime(attraction)).toString() + "vh"
        } else {
            return "auto";
        }
    }

    const mapComponent = (attractionNode, index) => {
        let res;

        if (attractionNode.type === "ATTRACTION") {
            res =
                <div key={index} style={{textAlign: "center"}}>
                    <Row>
                        <Col md={1}/>
                        <Col>
                            <CheckoutAttraction
                                startTime={attractionNode.startTime}
                                endTime={attractionNode.endTime}
                                name={attractionNode.attraction.name}
                                height={getHeight(attractionNode)}/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                </div>
        } else if (attractionNode.type === "MOBILITY") {
            //TODO - handle mobility
        } else if (attractionNode.type === "FREE_TIME") {
            res =
                <div key={index}>
                    <FreeTime
                        calcHeight={true}
                        calculatedStartTime={attractionNode.startTime}
                        calculatedEndTime={attractionNode.endTime}
                        height={getHeight(attractionNode)}/>
                </div>
        }

        return res;
    }
    const dayAttractionsAsComponents = dayAttractions.map((attractionNode, index) => mapComponent(attractionNode, index));


    return (
        <Card id={"DailyCheckoutContainer"} style={{height: "100%"}}>
            <HoursBar startHour={8} count={17} oneHourHeight={ONE_HOUR_HEIGHT_CHECKOUT}/>
            <Row style={{
                zIndex: 10,
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 11
            }}>
                <Col xs={{span: 11, offset: 1}}>
                    <div style={{marginLeft: 11, height: "100%", width: "100%"}}>
                        <Row style={{height: "100%"}}>
                            <Col>
                                {dayAttractionsAsComponents}
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default DailyCheckout;