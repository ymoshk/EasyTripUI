import React, {useRef} from 'react';
import AttractionContainer from "../components/itinerary/attraction/AttractionContainer";
import {Card, Col, Row} from "react-bootstrap";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useSelector} from "react-redux";
import DailyDnd from "../components/itinerary/DailyDnd";
import HoursBar from "../components/itinerary/hoursBar/HoursBar";
import CompactAttraction from "../components/itinerary/attraction/CompactAttraction";
import ONE_HOUR_HEIGHT, {ONE_HOUR_HEIGHT_CHECKOUT} from "../components/itinerary/Constants";
import CheckoutAttraction from "./CheckoutAttraction";


const DailyCheckout = (props) => {

    const HOURS_PER_DAY = 17;
    const dayIndex = useSelector(state => state.itineraryData.itinerary.currentDayIndex);
    // const dayAttractions = props.activities
    const dayAttractions = useSelector(state => state.itineraryData.itinerary.itineraryDays[dayIndex].activities);
    const dayAttractionsAsComponents = dayAttractions.map((attractionNode, index) => mapComponent(attractionNode, index));

    const extractTime = () => {
        let startTime = new Date("01-01-2030 " + props.attractionNode.startTime + ":00");
        let endTime = new Date("01-01-2030 " + props.attractionNode.endTime + ":00");

        return Math.abs((endTime - startTime) / (1000 * 60 * 60));
    }

    const getHeight = () => {
        if (props.calcHeight) {
            return (ONE_HOUR_HEIGHT_CHECKOUT * extractTime()).toString() + "vh"
        } else {
            return "auto";
        }
    }

    const mapComponent = (attractionNode, index) => {
        return (
            <div>
                <CheckoutAttraction
                    // index={index}
                    startTime={attractionNode.attraction.startTime}
                    endTime={attractionNode.attraction.endTime}
                    name={attractionNode.attraction.name}
                    height={getHeight()}/>
            </div>
        );
    }

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