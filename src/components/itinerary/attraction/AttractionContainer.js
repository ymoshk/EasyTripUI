import React, {useContext, useEffect, useState} from 'react';
import ChangeHoursContext from "../ChangeHourContext";
import ONE_HOUR_HEIGHT from "../Constants";
import formatDateToHours from "../../utils/helpers/DateFormatter";
import {Resizable} from "re-resizable";
import CompactAttraction from "./CompactAttraction";

const AttractionContainer = (props) => {

    const helpersContext = useContext(ChangeHoursContext);
    const [hoursChange, setHoursChange] = useState(0);
    const [endHourChange, setEndHourChange] = useState(0);
    const [calculatedStartTime, setCalculatedStartTime] = useState(props.startTime);
    const [calculatedEndTime, setCalculatedEndTime] = useState(props.end);


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
        let startTime = new Date("01-01-2030 " + props.startTime + ":00");
        let endTime = new Date("01-01-2030 " + props.endTime + ":00");

        let newStartTime = addMinutes(startTime, hoursChange);
        let newEndTime = addMinutes(endTime, hoursChange);

        setCalculatedStartTime(formatDateToHours(newStartTime));
        setCalculatedEndTime(formatDateToHours(newEndTime));
    }, [hoursChange])

    useEffect(() => {
        let endTime = new Date("01-01-2030 " + props.endTime + ":00");
        let newEndTime = addMinutes(endTime, endHourChange);
        setCalculatedEndTime(formatDateToHours(newEndTime));
    }, [endHourChange])

    const onResizeStartHandler = (e) => {
        helpersContext.isDragDisabled = true;
    }

    const onResizeEndHandler = (e) => {
        helpersContext.isDragDisabled = false;
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

                <CompactAttraction
                    name={props.name}
                    type={props.type}
                    image={props.image}
                    rating={props.rating}
                    userTotalRating={props.userTotalRating}
                    closedTemporarily={props.closedTemporarily}
                    priceRange={props.priceRange}
                    startTime={props.startTime}
                    endTime={props.endTime}
                    hours={props.hours}
                    address={props.address}
                    isRecommended={props.isRecommended}
                    calcHeight={true}
                    id={props.id}
                    phoneNumber={props.phoneNumber}
                    calculatedStartTime={calculatedStartTime}
                    calculatedEndTime={calculatedEndTime}
                    website={props.website}
                    attraction={props.attraction}
                    height={getHeight()}/>
            </Resizable>
        </div>
    );
};

export default AttractionContainer;
