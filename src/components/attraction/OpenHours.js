import React from 'react';
import {Row, Col} from "react-bootstrap";

const OpenHours = (props) => {
    return <React.Fragment>
        <Row>
            <Col md={2} xs={4}><b>Sunday</b></Col>
            <Col md={1} xs={4}>{props.hours.sunday}</Col>
        </Row>
        <Row>
            <Col md={2} xs={4}><b>Monday</b></Col>
            <Col md={1} xs={4}>{props.hours.monday}</Col>
        </Row>
        <Row>
            <Col md={2} xs={4}><b>Tuesday</b></Col>
            <Col md={1} xs={4}>{props.hours.tuesday}</Col>
        </Row>
        <Row>
            <Col md={2} xs={4}><b>Wednesday</b></Col>
            <Col md={1} xs={4}>{props.hours.wednesday}</Col>
        </Row>
        <Row>
            <Col md={2} xs={4}><b>Thursday</b></Col>
            <Col md={1} xs={4}>{props.hours.thursday}</Col>
        </Row>
        <Row>
            <Col md={2} xs={4}><b>Friday</b></Col>
            <Col md={1} xs={4}>{props.hours.friday}</Col>
        </Row>
        <Row>
            <Col md={2} xs={4}><b>Saturday</b></Col>
            <Col md={1} xs={4}>{props.hours.saturday}</Col>
        </Row>
    </React.Fragment>
}

export default OpenHours;