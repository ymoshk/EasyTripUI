import React from 'react';
import SingleHour from "./SingleHour";

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
                <div style={{height: "15vh"}}>
                    <SingleHour hour={formatDate(current).toString()}/>
                </div>
            )
            current.setHours(current.getHours() + 1);
        }

        return result;
    }

    return (
        <div>
            {createBar()}
        </div>
    );
};

export default HoursBar;
