import React, {useState} from 'react';
import {Card, Col, Row, ToggleButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Bike, Bus, Car, Walk} from "tabler-icons-react";
import SingleTag from "../../../questions/tags/SingleTag";

const Mobility = () => {

    const [checkedStatus, setCheckedStatus] = useState([false, false, false]);
    const title = "Mobility"
    const subTitle = "How would you like to get there?";
    const isCheckedIconColor = '#FFFFFF';
    const grey = '#656D77';

    function onCheckedEventHandler(e, index) {
        let newCheckedStatus = [false, false, false];
        newCheckedStatus[index] = e.currentTarget.checked;

        setCheckedStatus(newCheckedStatus);
    }


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
                        <Card.Subtitle className="mb-2 text-muted"><h4>{subTitle}</h4></Card.Subtitle>
                        <Card.Text>
                            {<Row>
                                <Col>
                                    <ToggleButton
                                        id="toggle-check"
                                        type="checkbox"
                                        variant="secondary"
                                        checked={checkedStatus[0]}
                                        value="1"
                                        onChange={(e) => onCheckedEventHandler(e, 0)}
                                    >
                                        {<Car
                                            strokeWidth={2}
                                            color={checkedStatus[0] ? isCheckedIconColor : grey}
                                        />}
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        id="toggle-check2"
                                        type="checkbox"
                                        variant="secondary"
                                        checked={checkedStatus[1]}
                                        value="2"
                                        onChange={(e) => onCheckedEventHandler(e, 1)}
                                    >
                                        {<Bus
                                            strokeWidth={2}
                                            color={checkedStatus[1] ? isCheckedIconColor : grey}
                                        />}
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        id="toggle-check3"
                                        type="checkbox"
                                        variant="secondary"
                                        checked={checkedStatus[2]}
                                        value="3"
                                        onChange={(e) => onCheckedEventHandler(e, 2)}
                                    >
                                        {<Walk
                                            strokeWidth={2}
                                            color={checkedStatus[2] ? isCheckedIconColor : grey}
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
