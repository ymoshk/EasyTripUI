import React, {useContext, useEffect, useState} from 'react';
import {Col, Row, ToggleButton} from "react-bootstrap";
import {Bus, Car, Trash, Walk} from "tabler-icons-react";
import {useDispatch, useSelector} from "react-redux";
import {itineraryActions} from "../../../../store/itinerary-slice";
import Button from "react-bootstrap/Button";
import ChangeHourContext from "../../ChangeHourContext";
import uuid from "uuid-random";
import useHttp from "../../../../hooks/UseHttp";
import LoaderContext from "../../../utils/loader/LoaderContext";

const Mobility = (props) => {
    const context = useContext(ChangeHourContext)
    const loader = useContext(LoaderContext);
    const dayIndex = useSelector(state => state.itineraryData.itinerary.currentDayIndex);
    const itinerary = useSelector(state => state.itineraryData.itinerary);
    const {isLoading, error, sendRequest: fetchTransportation} = useHttp();
    const initType = props.initType;
    const [checkedStatus, setCheckedStatus] = useState(
        [initType === "CAR", initType === "TRANSIT", initType === "WALK"]);
    const dispatch = useDispatch();
    const [type, setType] = useState(props.initType);
    const isCheckedIconColor = '#FFFFFF';
    const grey = '#656D77';

    const onCheckedEventHandler = (index) => {
        let newCheckedStatus = [false, false, false];
        newCheckedStatus[index] = true;
        setCheckedStatus(newCheckedStatus);

        if (props.transDuration.WALK === undefined || props.transDuration.TRANSIT === undefined || props.transDuration.CAR === undefined) {
            getAndUpdateMissingDurations();
        } else {
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
    }

    useEffect(() => {
        if(isLoading !== undefined){
            loader.setShow(isLoading);
        }
    }, [isLoading])

    const getAndUpdateMissingDurations = () => {
        const dayAttractions = itinerary.itineraryDays[dayIndex].activities
        const previous = dayAttractions[props.index - 2];
        const thisNode = dayAttractions[props.index];

        const data = {
            srcLat: previous.attraction.lat.toString(),
            srcLng: previous.attraction.lng.toString(),
            destLat: thisNode.attraction.lat.toString(),
            destLng: thisNode.attraction.lng.toString()
        }

        fetchTransportation({
            url: process.env.REACT_APP_SERVER_URL + "/getTransportation",
            method: "POST",
            credentials: 'include',
            body: data
        }, result => updateMissingDurations(result)).then();
    }

    const updateMissingDurations = (durations) => {
        // props.transDuration = data;
        const data = {
            data: durations,
            index: props.index
        }

        dispatch(itineraryActions.updateMobilityDurations(data));
        // thisNode.transportation = data;
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
                                id={uuid()}
                                size={"sm"}
                                type="checkbox"
                                variant="secondary"
                                checked={checkedStatus[0]}
                                value="1"
                                onChange={(e) => onCheckedEventHandler(0)}
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
                                id={uuid()}
                                size={"sm"}
                                type="checkbox"
                                variant="secondary"
                                checked={checkedStatus[1]}
                                value="2"
                                onChange={(e) => onCheckedEventHandler(1)}
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
                                id={uuid()}
                                size={"sm"}
                                type="checkbox"
                                variant="secondary"
                                checked={checkedStatus[2]}
                                value="3"
                                onChange={(e) => onCheckedEventHandler(2)}
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
