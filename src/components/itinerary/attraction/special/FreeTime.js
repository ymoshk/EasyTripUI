import React from 'react';
import {Card, Row} from "react-bootstrap";

const FreeTime = (props) => {

    return (
        <Card style={{backgroundColor: "transparent", border: "solid 0px", marginBottom: 0, height: props.height}}>
            <Card.Body>
                <Row>
                </Row>
            </Card.Body>
        </Card>
    )
        ;
};

export default FreeTime;
