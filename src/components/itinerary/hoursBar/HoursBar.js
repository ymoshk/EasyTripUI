import React from 'react';
import SingleHour from "./SingleHour";
import ONE_HOUR_HEIGHT from "../Constants"

const HoursBar = (props) => {
    const oneHourHeight = props.oneHourHeight === undefined ? ONE_HOUR_HEIGHT : props.oneHourHeight;

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('he-IL', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }

    const createBar = () => {
        let current = new Date(0, 0, 0, props.startHour, 0)

        let result = [];

        for (let i = 0; i < props.count; i++) {
            result.push(
                <div key={i} style={{height: oneHourHeight.toString() + "vh"}}>
                    <SingleHour hour={formatDate(current).toString()}/>
                </div>
            )
            current.setHours(current.getHours() + 1);
        }

        return result;
    }

    return (
        <div style={{zIndex: 1, position: "relative", width: "100%"}}>
            {createBar()}
        </div>
    );
};

export default HoursBar;
