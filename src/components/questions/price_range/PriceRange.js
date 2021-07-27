import React, {useState} from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {CurrencyDollar} from "tabler-icons-react";


const PriceRange = (props) => {
    const [value, setValue] = useState(0);
    const onAfterChange = props.onAfterChange;

    function onChangeEventHandler(e) {
        setValue(e.target.value);
    }

    function onAfterChangeEventHandler(e) {
        onAfterChange(value);
    }

    function tooltipLabelValue(currentVal) {
        let array = [<CurrencyDollar
            size={15}
            strokeWidth={2}
            color={'white'}
        />];
        let res = <div>{array}</div>;
        for (let i = 0; i < currentVal; i++) {
            array.push(<CurrencyDollar
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
