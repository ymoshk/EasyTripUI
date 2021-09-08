import React from 'react';
import CheckoutAttraction from "../checkout/CheckoutAttraction";
import {Card, Col, Row} from "react-bootstrap";
import {BiMap, FaMapMarker} from "react-icons/all";
import Button from "react-bootstrap/Button";
import {MapPin} from "tabler-icons-react";

const AttractionMap = (props) => {
    const attractionNode = props.attractionNode;
    const iconClickCallback = props.onIconClick;
    console.log(iconClickCallback)

    return (
        <Card style={{height: "20vh", padding: 0, margin: 0}}>
            <Card.Body className={"text-center"}>
                <Row>
                    <Col md={3}>
                        <Row>
                            <h6>{attractionNode.startTime}</h6>
                        </Row>
                        <Row>
                            <h6>{attractionNode.endTime}</h6>
                        </Row>
                    </Col>
                    <Col>
                        <h4 style={{textAlign: "center"}}>
                            {attractionNode.attraction.name}
                        </h4>
                    </Col>
                    <Col>
                        <span style={{cursor: "pointer", color: "#ea4335"}}
                              onClick={() => iconClickCallback(attractionNode.attraction.lat, attractionNode.attraction.lng)}>
                            <FaMapMarker/>
                        </span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AttractionMap;