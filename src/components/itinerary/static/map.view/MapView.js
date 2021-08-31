import React, {useState} from 'react';
import Timeline from "../../../Timeline";
import {Col, Container, Row} from "react-bootstrap";
import DayPicker from "../../dayPicker/DayPicker";
import AttractionMap from "./AttractionMap";
import AttractionMapList from "./AttractionMapList";
import MapWrapper from "../../../utils/MapWrapper";
import backGround from "../../../../images/siteBackground/maldivs.jpg";

const MapView = (props) => {
    const itinerary = props.itinerary;
    const itineraryDays = props.itinerary.itineraryDays;
    const [currentDay, setCurrentDay] = useState(itineraryDays[0]);
    const AttractionsOnlyCurrentDay = currentDay.activities.filter(attractionNode =>
        "ATTRACTION" === attractionNode.type
    );
    console.log(AttractionsOnlyCurrentDay);

    const getDates = () => {
        const formatDate = (date) => {
            if (date !== undefined) {
                return date.year + '-' + date.month + '-' + date.day;
            }
        }

        return itineraryDays.map(day => formatDate(day.date))
    }

    let dayChangedHandler = (index) => {
        setCurrentDay(itineraryDays[index]);
    };

    return (
        <>
            <Row>
                <Col/>
                <Col md={10}>
                    <DayPicker onDayChange={dayChangedHandler} dates={getDates()}/>
                </Col>
                <Col/>
            </Row>
            <Row>
                <Col md={3}>
                    {/*<AttractionMap attractionNode={AttractionsOnlyCurrentDay[0]}/>*/}
                    <AttractionMapList attractions={AttractionsOnlyCurrentDay}/>
                </Col>
                <Col>
                    <MapWrapper attractions={AttractionsOnlyCurrentDay}/>
                </Col>
            </Row>
        </>
    );
};

export default MapView;
