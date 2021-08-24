import React, {useContext, useState} from 'react';
import {Card, Col, Row, ToggleButton} from "react-bootstrap";
import {Bus, Car, Walk} from "tabler-icons-react";
import styles from "../CompactAttraction.module.css";
import ChangeHourContext from "../../ChangeHourContext";
import {useDispatch} from "react-redux";
import {itineraryActions} from "../../../../store/itinerary-slice";

const Mobility = (props) => {
    const initType = props.initType;
    const itineraryContext = useContext(ChangeHourContext);
    const [checkedStatus, setCheckedStatus] = useState(
        [initType === "CAR", initType === "TRANSIT", initType === "WALK"]);
    const dispatch = useDispatch();
    const [type, setType] = useState(props.initType);
    const isCheckedIconColor = '#FFFFFF';
    const grey = '#656D77';

    const onCheckedEventHandler = (e, index) => {
        let newCheckedStatus = [false, false, false];
        newCheckedStatus[index] = e.currentTarget.checked;
        setCheckedStatus(newCheckedStatus);

        if (index === 0) {
            setType("CAR");
            dispatch(itineraryActions.changeTransportationMethod(createMethodObject("CAR")));
        } else if (index === 1) {
            setType("TRANSIT");
            dispatch(itineraryActions.changeTransportationMethod(createMethodObject("TRANSIT")));
        } else {
            setType("WALK")
            dispatch(itineraryActions.changeTransportationMethod(createMethodObject("WALK")));
        }
    }

    const createMethodObject = (method) => {
        return {
            index: props.index,
            newMethod: method,
            data: props.transDuration
        }
    }

    return (
        <Card className={props.redBackground ? styles.myCardError : styles.myCard} style={{height: props.height}}>
            <Card.Body as={"div"} style={{paddingTop: 3, paddingBottom: 3}}
                       onMouseDown={() => {
                           itineraryContext.state = "DRAG"
                       }}
                       onMouseUp={() => {
                           itineraryContext.state = "NONE"
                       }}
            >
                <Row className={"d-flex align-items-center"} style={{height: "100%"}}>
                    <Col md={2}>
                        <Row>
                            <h6>{props.calculatedStartTime}</h6>
                        </Row>
                        <Row>
                            <h6>{props.calculatedEndTime}</h6>
                        </Row>
                    </Col>
                    <Col md={{span: 4, offset: 2}} xs={{span: 3, offset: 0}}>
                        <Row>
                            {props.duration * 60 <= 10 &&
                            <h4>{props.transDuration[type]} minutes
                                by {type.toLowerCase() === "transit" ? "public transport" : type.toLowerCase()}</h4>}
                            {props.duration * 60 > 10 &&
                            <h3>{props.transDuration[type]} minutes
                                by {type.toLowerCase() === "transit" ? "public transport" : type.toLowerCase()}</h3>}
                        </Row>
                    </Col>
                    <Col md={{span: 4, offset: 0}} xs={{span: 9, offset: 0}}>
                        <Row onMouseEnter={() => {
                            itineraryContext.isOnButton = true;
                        }} onMouseLeave={() => {
                            itineraryContext.isOnButton = false;
                        }}>
                            <Col>
                                <ToggleButton
                                    id="toggle-check"
                                    size={"sm"}
                                    type="checkbox"
                                    variant="secondary"
                                    checked={checkedStatus[0]}
                                    value="1"
                                    onChange={(e) => onCheckedEventHandler(e, 0)}
                                >
                                    {<Car
                                        size={props.duration * 60 <= 10 ? 20 : 30}
                                        strokeWidth={2}
                                        color={checkedStatus[0] ? isCheckedIconColor : grey}
                                    />}
                                </ToggleButton>
                            </Col>
                            <Col>
                                <ToggleButton
                                    id="toggle-check2"
                                    size={"sm"}
                                    type="checkbox"
                                    variant="secondary"
                                    checked={checkedStatus[1]}
                                    value="2"
                                    onChange={(e) => onCheckedEventHandler(e, 1)}
                                >
                                    {<Bus
                                        size={props.duration * 60 <= 10 ? 20 : 30}
                                        strokeWidth={2}
                                        color={checkedStatus[1] ? isCheckedIconColor : grey}
                                    />}
                                </ToggleButton>
                            </Col>
                            <Col>
                                <ToggleButton
                                    id="toggle-check3"
                                    size={"sm"}
                                    type="checkbox"
                                    variant="secondary"
                                    checked={checkedStatus[2]}
                                    value="3"
                                    onChange={(e) => onCheckedEventHandler(e, 2)}
                                >
                                    {<Walk
                                        size={props.duration * 60 <= 10 ? 20 : 30}
                                        strokeWidth={2}
                                        color={checkedStatus[2] ? isCheckedIconColor : grey}
                                    />}
                                </ToggleButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Mobility;
