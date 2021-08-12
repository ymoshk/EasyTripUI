import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'

//documentation - https://www.npmjs.com/package/react-bootstrap-daterangepicker
import React, {useEffect} from 'react';

const DateRangeInput = (props) => {

    let startDate, endDate;

    useEffect(() => {
        props.setData(getDateAfter(1), getDateAfter(2))
    }, [])

    const onCallbackEventHandler = (start, end) => {
        startDate = start;
        endDate = end;

        props.setData(start, end);
        let temp = new Date();
        temp.setHours(23, 59, 59, 0);
        props.setValidation(Date.parse(start) >= temp);
    }

    const getDateAfter = (daysCount) => {
        let today = new Date();
        return new Date(today.getTime() + (daysCount * 24 * 60 * 60 * 1000));
    }

    return (
        <>
            <label style={{marginBottom: 20}}>Select dates for your trip</label>
            <DateRangePicker
                onCallback={(start, end) => onCallbackEventHandler(start, end)}
                initialSettings={{startDate: getDateAfter(1), endDate: getDateAfter(2)}}>
                <input style={{fontFamily: "sans-serif"}} type="text" className="form-control"/>
            </DateRangePicker>
        </>
    );
};

export default DateRangeInput;

