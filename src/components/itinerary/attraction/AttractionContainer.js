import React, {useContext, useEffect, useState} from 'react';
import ChangeHoursContext from "../ChangeHourContext";
import ONE_HOUR_HEIGHT from "../Constants";
import formatDateToHours from "../../utils/helpers/DateFormatter";
import {Resizable} from "re-resizable";
import CompactAttraction from "./CompactAttraction";
import FreeTime from "./special/FreeTime";

const AttractionContainer = (props) => {
    const helpersContext = useContext(ChangeHoursContext);
    const [hoursChange, setHoursChange] = useState(0);
    const [endHourChange, setEndHourChange] = useState(0);
    const [calculatedStartTime, setCalculatedStartTime] = useState(props.attractionNode.startTime);
    const [calculatedEndTime, setCalculatedEndTime] = useState(props.attractionNode.endTime);


    const extractTime = () => {
        let startTime = new Date("01-01-2030 " + calculatedStartTime + ":00");
        let endTime = new Date("01-01-2030 " + calculatedEndTime + ":00");

        return Math.abs((endTime - startTime) / (1000 * 60 * 60));
    }

    const getHeight = () => {
        if (props.calcHeight) {
            return (ONE_HOUR_HEIGHT * extractTime()).toString() + "vh"
        } else {
            return "auto"
        }
    }

    const updateContext = () => {
        helpersContext.changeHoursFunc = setHoursChange;
        helpersContext.changeEndHourFunc = setEndHourChange;
    }

    const addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60000);
    }

    useEffect(() => {
        let startTime = new Date("01-01-2030 " + props.attractionNode.startTime + ":00");
        let endTime = new Date("01-01-2030 " + props.attractionNode.endTime + ":00");

        let newStartTime = addMinutes(startTime, hoursChange);
        let newEndTime = addMinutes(endTime, hoursChange);

        setCalculatedStartTime(formatDateToHours(newStartTime));
        setCalculatedEndTime(formatDateToHours(newEndTime));
    }, [hoursChange])

    useEffect(() => {
        let endTime = new Date("01-01-2030 " + props.attractionNode.endTime + ":00");
        let newEndTime = addMinutes(endTime, endHourChange);
        setCalculatedEndTime(formatDateToHours(newEndTime));
    }, [endHourChange])

    const onResizeStartHandler = () => {
        helpersContext.isDragDisabled = true;
    }

    const onResizeEndHandler = () => {
        helpersContext.isDragDisabled = false;
    }

    const getComponent = () => {
        if (props.attractionNode.type === "FREE_TIME") {
            return <FreeTime
                calcHeight={true}
                calculatedStartTime={calculatedStartTime}
                calculatedEndTime={calculatedEndTime}
                height={getHeight()}/>
        } else if (props.attractionNode.type === "ATTRACTION") {
            return <CompactAttraction
                index={props.index}
                calcHeight={true}
                calculatedStartTime={calculatedStartTime}
                calculatedEndTime={calculatedEndTime}
                attraction={props.attractionNode.attraction}
                height={getHeight()}/>
        }
    }

    return (
        <div onMouseDown={updateContext}>
            <Resizable
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false
                }}
                onResizeStart={onResizeStartHandler}
                onResizeStop={onResizeEndHandler}>
                {getComponent()}
            </Resizable>
        </div>
    );
};

export default AttractionContainer;
