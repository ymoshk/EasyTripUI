import React, {useState} from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {CurrencyDollar} from "tabler-icons-react";
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../../../store/questionnaire-slice";


const PriceRange = (props) => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.questionnaireData.questionnaire.stages[props.stageIndex].data)

    const [value, setValue] = useState(data.priceRange !== undefined ? data.priceRange : 0);

    function onChangeEventHandler(e) {
        setValue(e.target.value);
    }

    function onAfterChangeEventHandler(e) {
        dispatch(questionnaireActions.setCurrentData({priceRange: value}));
    }

    function tooltipLabelValue(currentVal) {
        let array = [<CurrencyDollar
            key={0}
            size={15}
            strokeWidth={2}
            color={'white'}
        />];
        let res = <div>{array}</div>;
        for (let i = 0; i < currentVal; i++) {
            array.push(<CurrencyDollar
                key={i + 1}
                size={15}
                strokeWidth={2}
                color={'white'}
            />);
        }

        return res;
    }

    return (
        <RangeSlider
            value={value}
            tooltip={'auto'}
            min={0}
            max={4}
            tooltipPlacement={'bottom'}
            tool
            tooltipLabel={(currentVal) => tooltipLabelValue(currentVal)}
            onChange={e => onChangeEventHandler(e)}
            onAfterChange={e => onAfterChangeEventHandler(e)}
        />
    );
}

export default PriceRange;
