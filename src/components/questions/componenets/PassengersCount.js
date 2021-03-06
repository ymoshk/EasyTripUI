import React from "react";
import StepsCounter from "../../utils/StepsCounter";
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../../store/questionnaire-slice";
import london from "../../../images/london.jpg";
import {Text} from "tabler-react";


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
        <>
            <img src={london} style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                marginBottom: 10
            }}/>
            <Text style={{fontSize: '175%'}}>{props.text}</Text>
            <br/>
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
            </div>
            </>);
}

export default PassengersCount;
