import React from 'react';
import {Card, Col, Row, ToggleButton} from "react-bootstrap";
import {Bike, Car, Walk} from "tabler-icons-react";

const CheckoutAttraction = (props) => {

    return (
        <Card style={{height: props.height, padding: 0, margin: 0, backgroundColor: "rgb(237, 237, 239,0.8)"}}>
            <Card.Body as={"h4"} className={"text-center"}>
                {props.name}
            </Card.Body>
        </Card>
    )
};

export default CheckoutAttraction;
