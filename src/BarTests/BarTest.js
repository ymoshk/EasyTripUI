import React from "react";
import {Button, Col, FormControl, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';


function PassengersCount(props){
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const MAX_PASSENGERS = 10;
    const MIN_CHILDREN = 0;
    const MIN_ADULT = 1;


    function addAdult(){
        if(adultCount < MAX_PASSENGERS)
            setAdultCount((prevState => prevState + 1));
    }
    function descentAdult(){
        if (adultCount > MIN_ADULT)
            setAdultCount((prevState => prevState - 1));
    }

    function addChildren(){
        if(childrenCount < MAX_PASSENGERS)
            setChildrenCount((previousState => previousState + 1));
    }
    function descentChildren(){
        if(childrenCount > MIN_CHILDREN)
            setChildrenCount((previousState => previousState - 1));
    }


    return(
        <div>
            <Row>
                <Col md={{span: 3, offset: 0}} xs={{span: 3, offset: 0}} style={{width:258}}>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg">Adults</InputGroup.Text>
                        <Button size="lg" onClick={descentAdult} variant="outline-secondary">-</Button>
                        <FormControl placeholder={adultCount} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        <Button size="lg" onClick={addAdult} variant="outline-secondary">+</Button>
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md={{span: 3, offset: 0}} xs={{span: 3, offset: 0}} style={{width:276}}>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg">Children</InputGroup.Text>
                        <Button size="lg" onClick={descentChildren} variant="outline-secondary">-</Button>
                        <FormControl placeholder={childrenCount} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        <Button size="lg" onClick={addChildren} variant="outline-secondary">+</Button>
                    </InputGroup>
                </Col>
            </Row>
        </div>);
}

export default PassengersCount;