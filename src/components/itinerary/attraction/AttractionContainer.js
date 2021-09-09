import React, {useContext, useEffect, useState} from 'react';
import ChangeHoursContext from "../ChangeHourContext";
import ONE_HOUR_HEIGHT from "../Constants";
import formatDateToHours from "../../utils/helpers/DateFormatter";
import CompactAttraction from "./CompactAttraction";
import FreeTime from "./special/FreeTime";
import uuid from "uuid-random";

const AttractionContainer = (props) => {
    const helpersContext = useContext(ChangeHoursContext);
    const [hoursChange, setHoursChange] = useState(0);
    const [calculatedStartTime, setCalculatedStartTime] = useState(props.attractionNode.startTime);
    const [calculatedEndTime, setCalculatedEndTime] = useState(props.attractionNode.endTime);
    const [redBackground, setRedBackGround] = useState(false);

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

    const addMinutesToHour = (hour, minutesCount) => {
        let result = new Date();
        result.setTime(hour.getTime() + minutesCount * 1000 * 60);

        return result;
    }

    useEffect(() => {
        let startTime = new Date("01-01-2030 " + props.attractionNode.startTime + ":00");
        let endTime = new Date("01-01-2030 " + props.attractionNode.endTime + ":00");

        let newStartTime = addMinutes(startTime, hoursChange);
        let newEndTime = addMinutes(endTime, hoursChange);

        let durationMinutes = (newEndTime.getTime() - newStartTime.getTime()) / (1000 * 60);

        let minStart = new Date("01-01-2030 08:00:00");
        let minEnd = addMinutesToHour(minStart, durationMinutes);

        let maxEnd = new Date("01-01-2030 23:59:00");
        let maxStart = addMinutesToHour(maxEnd, -durationMinutes);


        if (newStartTime.getTime() < minStart.getTime()) {
            newStartTime = minStart;
            newEndTime = minEnd;
            setRedBackGround(true);
        } else if (newEndTime.getTime() > maxEnd.getTime()) {
            newEndTime = maxEnd;
            newStartTime = maxStart;
            setRedBackGround(true);
        } else {
            setRedBackGround(false);
        }

        setCalculatedStartTime(formatDateToHours(newStartTime));
        setCalculatedEndTime(formatDateToHours(newEndTime));
    }, [hoursChange])


    const onUpdateDuration = (newDuration) => {
        props.onChangeDuration(newDuration);
    }

    const getComponent = () => {
        if (props.attractionNode.type === "FREE_TIME") {
            return <FreeTime
                transportation={props.attractionNode.showTransportationIcon}
                myIndex={props.attractionNode.myIndex}
                calcHeight={true}
                srcLocation={props.attractionNode.srcLocation}
                destLocation={props.attractionNode.destLocation}
                calculatedStartTime={calculatedStartTime}
                calculatedEndTime={calculatedEndTime}
                height={getHeight()}/>
        } else if (props.attractionNode.type === "ATTRACTION") {
            return <CompactAttraction
                transportation={props.attractionNode.transportation}
                redBackground={redBackground}
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
