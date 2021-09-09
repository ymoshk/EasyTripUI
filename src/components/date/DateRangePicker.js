import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap-daterangepicker/daterangepicker.css'

//documentation - https://www.npmjs.com/package/react-bootstrap-daterangepicker
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../store/questionnaire-slice";
import planTrip from "../../images/planTrip.jpg";
import {Text} from "tabler-react";

const DateRangeInput = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(questionnaireActions.setCurrentData(
            {
                startDate: getDateAfter(1).getTime(),
                endDate: getDateAfter(2).getTime()
            }));
    }, [])

    const onCallbackEventHandler = (start, end) => {
        dispatch(questionnaireActions.setCurrentData(
            {
                startDate: start.toDate().getTime(),
                endDate: end.toDate().getTime()
            }));
        let temp = new Date();
        temp.setHours(23, 59, 59, 0);

        dispatch(questionnaireActions.setIsValid(Date.parse(start) >= temp));
        dispatch(questionnaireActions.setErrorMsg("The trip must be at least one day long and cannot " +
            "start from a date that has already passed"))
    }

    const getDateAfter = (daysCount) => {
        let today = new Date();
        return new Date(today.getTime() + (daysCount * 24 * 60 * 60 * 1000));
    }

    return (
        <>
            <img src={planTrip} style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                marginBottom: 10
            }}/>
            <Text style={{fontSize: '125%'}}>{props.text}</Text>
            <br/>
            <DateRangePicker
                onCallback={(start, end) => onCallbackEventHandler(start, end)}
                initialSettings={{startDate: getDateAfter(1), endDate: getDateAfter(2)}}>
                <input style={{fontFamily: "sans-serif"}} type="text" className="form-control"/>
            </DateRangePicker>
            <br/>
        </>
    );
};

export default DateRangeInput;

