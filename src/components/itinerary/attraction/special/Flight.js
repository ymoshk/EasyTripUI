import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {MdFlight} from "react-icons/all";
import {useSelector} from "react-redux";

const Flight = (props) => {
    const flightData = useSelector(state => state.itineraryData.itinerary.questionsData.flight)
    const theFlight = props.outbound ? flightData.Outbound : flightData.Return;


    return (
        <>
            <Card as={"div"} style={{
                // display: 'flex', flexDirection: 'row',
                // alignItems: "center",
                backgroundColor: "#c6c6c6",
                border: "solid 2px",
                marginBottom: 0,
                height: props.height,
            }}>
                <Card.Body as={"div"}>
                    <Row>
                        <Col md={1}>
                            <MdFlight size={30}/>
                        </Col>
                        <Col>
                            <h2>Flight</h2>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <h4>Departure Airport: {theFlight.departureAirport}</h4>
                            <h4>Departure time: {theFlight.departureTime}</h4>
                            <h4>Duration: {theFlight.duration}</h4>
                        </Col>
                        <Col>
                            <h4>Arrival Airport: {theFlight.arrivalAirport}</h4>
                            <h4>Arrival time: {theFlight.arrivalTime}</h4>
                            <h4>Number of stops: {theFlight.stop}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default Flight;
