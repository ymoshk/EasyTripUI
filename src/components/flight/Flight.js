import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Segment from "./Segment";
import Button from "react-bootstrap/Button";
import {AiOutlineArrowRight} from "react-icons/all";

const DUMMY_SEGMENT = {
    carrierCode: 'Iberia',
    departureAirport: 'TLV',
    arrivalAirport: 'MAD',
    departureTime: '12:10 PM',
    arrivalTime: '8:35 PM',
    duration: '9h 25m',
    stop: 1,
    stopAirport: 'MXP'
}

const DUMMY_FLIGHT = {
    outbound: DUMMY_SEGMENT,
    return: DUMMY_SEGMENT,
    price: '113$'
}

const Flight = (props) => {
    return <Row>
        <Card>
            <Card.Body>
                <Card.Text>
                    <Row>
                        <Col md={{span: 9}}>
                            <Segment segment={props.flight.Outbound}/>
                            <br/>
                            <Segment segment={props.flight.Return}/>
                        </Col>
                        <Col md={{span: 3}} style={{marginTop: 70}}>
                            <h3>{props.flight.price}</h3>
                            <Button style={{background: 'green'}}>Select<AiOutlineArrowRight style={{marginLeft: '5'}}/></Button>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    </Row>
}

export default Flight;