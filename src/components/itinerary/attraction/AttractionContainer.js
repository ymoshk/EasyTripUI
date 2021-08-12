import React, {useContext, useEffect, useState} from 'react';
import ChangeHoursContext from "../ChangeHourContext";
import ONE_HOUR_HEIGHT from "../Constants";
import formatDateToHours from "../../utils/helpers/DateFormatter";
import CompactAttraction from "./CompactAttraction";
import FreeTime from "./special/FreeTime";

const AttractionContainer = (props) => {
    const helpersContext = useContext(ChangeHoursContext);
    const [hoursChange, setHoursChange] = useState(0);
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


    const onUpdateDuration = (newDuration) => {
        props.onChangeDuration(newDuration);
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
                resetDraggedId={props.resetDraggedId}
                index={props.index}
                calcHeight={true}
                duration={extractTime()}
                calculatedStartTime={calculatedStartTime}
                calculatedEndTime={calculatedEndTime}
                attraction={props.attractionNode.attraction}
                height={getHeight()}
                updateDuration={onUpdateDuration}/>
        }
    }

    return (
        <div {...props.drag} onMouseDown={updateContext}>
            {getComponent()}
        </div>
    );
};

export default AttractionContainer;
