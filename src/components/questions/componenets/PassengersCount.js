import React from "react";
import StepsCounter from "../../utils/StepsCounter";
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../../store/questionnaire-slice";


function PassengersCount(props) {
    const data = useSelector(state => state.questionnaireData.questionnaire.stages[props.stageIndex].data)
    const dispatch = useDispatch()

    const onUpdateAdults = (adults) => {
        dispatch(questionnaireActions.setCurrentData({
            adultsCount: adults,
            childrenCount: data.childrenCount
        }));
    }


    const onUpdateChildren = (children) => {
        dispatch(questionnaireActions.setCurrentData({
            adultsCount: data.adultsCount,
            childrenCount: children
        }));
    }

    return (
        <div>
            <StepsCounter
                setValue={onUpdateAdults}
                initValue={data.adultsCount}
                maxVal={10}
                minVal={1}
                title="Adults"/>

            <StepsCounter
                setValue={onUpdateChildren}
                initValue={data.childrenCount}
                maxVal={10}
                minVal={0}
                title="Children"/>
        </div>);
}

export default PassengersCount;
