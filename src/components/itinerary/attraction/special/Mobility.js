import React, {useContext, useState} from 'react';
import {Col, Row, ToggleButton} from "react-bootstrap";
import {Bus, Car, Trash, Walk} from "tabler-icons-react";
import {useDispatch} from "react-redux";
import {itineraryActions} from "../../../../store/itinerary-slice";
import Button from "react-bootstrap/Button";
import ChangeHourContext from "../../ChangeHourContext";

const Mobility = (props) => {
    const context = useContext(ChangeHourContext)
    const initType = props.initType;
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

    function onRemoveHandler() {
        dispatch(itineraryActions.removeTransportation(props.index));
    }

    return (
        <>
            <Row
                onMouseEnter={() => {
                    context.isOnButton = true;
                }}
                onMouseLeave={() => {
                    context.isOnButton = false;
                }}
                className={"d-flex align-items-center"} style={{height: "100%"}}>
                <Col md={{span: 6, offset: 0}} xs={{span: 3, offset: 0}}>
                    <Row>
                        <h4>Get there in {props.transDuration[type]} minutes
                            by {type.toLowerCase() === "transit" ? "public transportation" : type.toLowerCase()}</h4>
                    </Row>
                </Col>
                <Col md={{span: 6, offset: 0}} xs={{span: 9, offset: 0}}>
                    <Row>
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
                                    size={25}
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
                                    size={25}
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
                                    size={25}
                                    strokeWidth={2}
                                    color={checkedStatus[2] ? isCheckedIconColor : grey}
                                />}
                            </ToggleButton>
                        </Col>
                        <Col>
                            <Button
                                size={"sm"}
                                type="checkbox"
                                value="3"
                                variant={"secondary"}
                                onClick={() => onRemoveHandler()}
                            >
                                {<Trash
                                    size={25}
                                    strokeWidth={2}
                                    color={"black"}
                                />}
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <hr/>
            </Row>
        </>

    );
};

export default Mobility;
