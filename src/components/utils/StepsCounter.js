import React, {useEffect} from 'react';
import {Button, Col, FormControl, Row} from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react';
import styles from './StepsCounter.module.css'

const StepsCounter = (props) => {
    const [counter, setCounter] = useState(props.initValue);

    useEffect(() => {
        props.setValue(counter);
    }, [counter])

    function incrementHandler() {
        if (counter < props.maxVal) {
        }
        setCounter((prevState => prevState + 1));
    }

    function decrementHandler() {
        if (counter > props.minVal) {
            setCounter((prevState => prevState - 1));
        }
    }

    const onChangeHandler = (event) => {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value <= props.maxVal && value >= props.minVal) {
            setCounter(value);
        }
    }

    return (
        <div className={styles.marginTop}>
            <Row>
                <Col xs={{span: 12}} md={{offset: 2, span: 8}}>
                    <InputGroup size="lg">
                        <InputGroup.Text
                            className={styles.title}>{props.title}</InputGroup.Text>
                        <Button size="lg" onClick={decrementHandler} variant="outline-primary">-</Button>
                        <FormControl className={styles.value} value={counter} onChange={onChangeHandler}
                                     aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
                        <Button size="lg" onClick={incrementHandler} variant="outline-primary">+</Button>
                    </InputGroup>
                </Col>
            </Row>
            <br/>
        </div>);
};

export default StepsCounter;
