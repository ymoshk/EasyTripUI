import React, {useState} from 'react';
import HorizontalTimeline from "react-horizontal-timeline";
import {useSelector} from "react-redux";

// https://www.npmjs.com/package/react-horizontal-timeline
const DayPicker = (props) => {
    const [value, setValue] = useState(0);

    return (
        <div style={{
            height: "100px",
            margin: "0 auto"
        }}>
            <HorizontalTimeline
                styles={{outline: "#737373", foreground: "gray"}}
                index={value}
                indexClick={(index) => {
                    setValue(index);
                    props.onDayChange(index);
                }}
                values={props.dates}
                slidingMotion={{stiffness: 150, damping: 25}}
                isOpenBeginnin={false}

            />
        </div>
    );
}

export default DayPicker;
