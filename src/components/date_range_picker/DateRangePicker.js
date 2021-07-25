import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'

//documentation - https://www.npmjs.com/package/react-bootstrap-daterangepicker

import React from 'react';

const DateRangeInput = (props) => {

    let startDate, endDate;

    function onCallbackEventHandler(start, end) {
        startDate = start;
        endDate = end;
        props.onApply(start, end);
    }

    return (
        <DateRangePicker
            onCallback={(start, end) => onCallbackEventHandler(start, end)}
            initialSettings={{startDate: new Date(), endDate: new Date()}}>
            <input type="text" className="form-control"/>
        </DateRangePicker>
    );
};

export default DateRangeInput;

