import React from 'react';
import {Col, Row} from "react-bootstrap";
import {MdFlight, MdFlightLand, MdFlightTakeoff} from "react-icons/all";
import {IconContext} from "react-icons";

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

const Segment = (props) => {
    let stops;

    if(props.segment.stop === '0'){
        stops = <h6 style={{display: 'flex', justifyContent: 'center', color: 'green'}}>Non-stop</h6>;
    }
    else {
        stops = <h6 style={{display: 'flex', justifyContent: 'center', color: 'red'}}>{props.segment.stop} Stop</h6>
    }

    return <Row>
        <Col md={{span: 2}} style={{marginTop: 20}}>
            <h4>{props.segment.departureTime}</h4>
            <h4>{props.segment.departureAirport}</h4>
        </Col>
        <Col md={{span: 6}}>
            <h6 style={{display: 'flex', justifyContent: 'center'}}>{props.segment.duration}</h6>
            <hr
                style={{
                    color: "grey",
                    backgroundColor: "grey",
                    height: 5
                }}
            />
            {stops}
        </Col>
        <Col md={{span: 2}}>
            <IconContext.Provider value={{style: {fontSize: '30px', marginTop: '35', transform: 'rotate(90deg)'}}}>
                <div>
                    <MdFlight />
                </div>
            </IconContext.Provider>
        </Col>
        <Col md={{span: 2}} style={{marginTop: 20}}>
            <h4>{props.segment.arrivalTime}</h4>
            <h4>{props.segment.arrivalAirport}</h4>
        </Col>
    </Row>
}

export default Segment;
