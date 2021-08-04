import React, {useState} from 'react';
import HorizontalTimeline from "react-horizontal-timeline";

// https://www.npmjs.com/package/react-horizontal-timeline

function DayPicker() {

    const [value, setValue] = useState(0);
    const [previous, setPrevious] = useState(0);

    // Values should be only date
    const VALUES = ["2021-01-01", "2021-01-15", "2021-03-22","2021-01-01", "2021-01-15", "2021-03-22"];

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
                    setPrevious(value);
                }}
                values={VALUES}
                slidingMotion={{stiffness: 150, damping: 25}}
                isOpenBeginnin={false}

            />
        </div>
    );
}

export default DayPicker;
