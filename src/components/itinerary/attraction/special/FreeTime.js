import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import StarRating from "../../../utils/StarRating";
import CollapsibleDiv from "../../../utils/CollapsibleDiv";
import OpenHours from "../../../attraction/OpenHours";

const FreeTime = (props) => {

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={{span: 1, offset: 0}} xs={{span: 3, offset: 0}}>
                        <Row>
                            <h5>{props.startTime}</h5>
                        </Row>
                        <Row>
                            <h5>{props.endTime}</h5>
                        </Row>
                    </Col>
                    <Col md={{span: 11, offset: 0}} xs={{span: 9, offset: 0}}>
                        <Card.Text>
                            <h1 style={{textAlign: "center"}}>Free Time</h1>
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default FreeTime;
