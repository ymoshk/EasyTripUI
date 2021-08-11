import React from 'react';
import {Card, Col, Row, ToggleButton} from "react-bootstrap";
import {Bike, Car, Walk} from "tabler-icons-react";

const CheckoutAttraction = (props) => {

    return (
        <Card style={{height: props.height}}>
            <Card.Body>
                <Row style={{height: "100%"}}>
                    <Col md={{span: 1, offset: 0}} xs={{span: 3, offset: 0}}>
                        <Row>
                            <h5>{props.startTime}</h5>
                        </Row>
                        <Row>
                            <h5>{props.endTime}</h5>
                        </Row>
                    </Col>
                    <Col md={{span: 11, offset: 0}} xs={{span: 9, offset: 0}}>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h3 style={{textAlign: "center"}}>
                                        {props.name}
                                    </h3>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
};

export default CheckoutAttraction;
