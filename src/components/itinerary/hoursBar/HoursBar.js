import React from 'react';
import SingleHour from "./SingleHour";
import ONE_HOUR_HEIGHT from "../Constants"

const HoursBar = (props) => {

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
                <div key={i} style={{height: ONE_HOUR_HEIGHT.toString() + "vh"}}>
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
