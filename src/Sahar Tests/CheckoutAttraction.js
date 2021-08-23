import React from 'react';
import {Card, Col, Row, ToggleButton} from "react-bootstrap";
import {Bike, Car, Walk} from "tabler-icons-react";

const CheckoutAttraction = (props) => {

    return (
        <Card style={{height: props.height, padding: 0, margin: 0}}>
            <Card.Body className={"text-center"} >
                <h4 style={{textAlign: "center"}}>
                    {props.name}
                </h4>
            </Card.Body>
        </Card>
    )
};

export default CheckoutAttraction;
