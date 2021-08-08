import React, {useState} from 'react';
import {Card, Col, Row} from "react-bootstrap";

const FreeTime = (props) => {

    return (
        <Card style={{backgroundColor: "transparent", border: "solid 0px", marginBottom: 0, height: props.height}}>
            <Card.Body>
                <Row>
                    {/*<Col md={2}>*/}
                    {/*    <Row>*/}
                    {/*        <h6>{props.calculatedStartTime}</h6>*/}
                    {/*    </Row>*/}
                    {/*    <Row>*/}
                    {/*        <h6>{props.calculatedEndTime}</h6>*/}
                    {/*    </Row>*/}
                    {/*</Col>*/}
                </Row>
            </Card.Body>
        </Card>
    )
        ;
};

export default FreeTime;
