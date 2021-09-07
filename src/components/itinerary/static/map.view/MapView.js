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
        const [center, setCenter] = useState(undefined);
        const [zoom, setZoom] = useState(12);
        const AttractionsOnlyCurrentDay = currentDay.activities.filter(attractionNode =>
            "ATTRACTION" === attractionNode.type
        );

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
            setCenter(undefined);
            setZoom(12);
        };

    let onIconClickEventHandler = (lat,lng) => {
        setCenter({lat: lat, lng: lng});
        setZoom(17);
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
                {AttractionsOnlyCurrentDay.length > 0 && <Row>
                    <Col md={3}>
                        <AttractionMapList onIconClick={onIconClickEventHandler} attractions={AttractionsOnlyCurrentDay}/>
                    </Col>
                    <Col>
                        <MapWrapper center={center} defaultZoom={zoom} attractions={AttractionsOnlyCurrentDay}/>
                    </Col>
                </Row>}
                {AttractionsOnlyCurrentDay.length === 0 && <Row>
                    <Col>
                        <div style={{textAlign: "center"}}>
                            <h3>Couldn't find any relevant attractions</h3>
                        </div>
                    </Col>
                </Row>}
            </>
        );
    };

export default MapView;
