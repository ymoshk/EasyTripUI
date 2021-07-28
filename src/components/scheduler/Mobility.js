import React, {useEffect, useState} from 'react';
import {Card, Col, Row, ToggleButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Bike, Car, Walk} from "tabler-icons-react";
import SingleTag from "../questions/tags/SingleTag";

const Mobility = () => {

    const [checkedStatus, setCheckedStatus] = useState([false, false, false]);
    const title = "Mobility"
    const isCheckedIconColor = '#FFFFFF';
    const grey = '#656D77';
    const primary = 'primary';
    console.log(checkedStatus);
    let btn1 = false;
    let btn2 = false;
    let btn3 = false;
    // let tmp = checkedIndex;

    useEffect(() => {
        btn1 = checkedStatus[0];
        btn2 = checkedStatus[1];
        btn3 = checkedStatus[2];

    }, [checkedStatus])

    //
    // function onCheckedEventHandler(id) {
    //     isChecked[id] = !isChecked[id];
    //
    //     if (!isChecked[id]) {
    //         setCheckIndex(-1);
    //
    //     } else {
    //         setCheckIndex(id);
    //     }
    // }

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={{span: 1, offset: 0}} xs={{span: 3, offset: 0}}>
                        <Row>
                            <h5>{"start time"}</h5>
                        </Row>
                        <Row>
                            <h5>{"end time"}</h5>
                        </Row>
                    </Col>
                    <Col md={{span: 11, offset: 0}} xs={{span: 9, offset: 0}}>
                        <Card.Title>
                            <h3>{title}</h3>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><h4>Pick your way ...</h4></Card.Subtitle>
                        <Card.Text>
                            {<Row>
                                <Col>
                                    <ToggleButton
                                        id="toggle-check"
                                        type="checkbox"
                                        variant="secondary"
                                        checked={btn1}
                                        value="1"
                                        onChange={(e) => setCheckedStatus([!e.currentTarget.checked, false, false])}
                                    >
                                        {<Car
                                            strokeWidth={2}
                                            color={btn1 ? isCheckedIconColor : grey}
                                        />}
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        id="toggle-check"
                                        type="checkbox"
                                        variant="secondary"
                                        checked={btn2}
                                        value="2"
                                        onChange={(e) => setCheckedStatus([false, !e.currentTarget.checked, false])}
                                    >
                                        {<Bike
                                            strokeWidth={2}
                                            color={btn2 ? isCheckedIconColor : grey}
                                        />}
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        id="toggle-check"
                                        type="checkbox"
                                        variant="secondary"
                                        checked={btn3}
                                        onChange={(e) => setCheckedStatus([false, false, !e.currentTarget.checked])}
                                    >
                                        {<Walk
                                            strokeWidth={2}
                                            color={btn3 ? isCheckedIconColor : grey}
                                        />}
                                    </ToggleButton>
                                </Col>
                            </Row>}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Mobility;