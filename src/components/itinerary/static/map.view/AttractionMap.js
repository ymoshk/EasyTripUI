import React from 'react';
import CheckoutAttraction from "../checkout/CheckoutAttraction";
import {Card, Col, Row} from "react-bootstrap";

const AttractionMap = (props) => {
    const attractionNode = props.attractionNode;
    console.log(attractionNode)

    return (
        // <CheckoutAttraction
        //     startTime={attractionNode.attraction.startTime}
        //     endTime={attractionNode.attraction.endTime}
        //     name={attractionNode.attraction.name}
        //     height={"20vh"}/>
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
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AttractionMap;