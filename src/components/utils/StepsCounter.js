import React from 'react';
import {Button, Col, FormControl, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';

const StepsCounter = (props) => {
    const [counter, setCounter] = useState(props.initValue);

    function incrementHandler(){
        if(counter < props.maxVal)
            setCounter((prevState => prevState + 1));
    }
    function decrementHandler(){
        if (counter > props.minVal)
            setCounter((prevState => prevState - 1));
    }

    const onChangeHandler = (event) => {
        const value = Number(event.target.value);

        if(value > props.maxVal || value < props.minVal){
            return;
        }

        setCounter(value);
    }

    return(
        <div>
            <Row>
                <Col md={{span: 3, offset: 0}} xs={{span: 3, offset: 0}}>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg">{props.title}</InputGroup.Text>
                        <Button size="lg" onClick={decrementHandler} variant="outline-primary">-</Button>
                        <FormControl value={counter} onChange={onChangeHandler} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                        <Button size="lg" onClick={incrementHandler} variant="outline-primary">+</Button>
                    </InputGroup>
                </Col>
            </Row>
            <br/>
        </div>);
};

export default StepsCounter;