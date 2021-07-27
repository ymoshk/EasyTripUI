import React from "react";
import StepsCounter from "../utils/StepsCounter";


function PassengersCount(props) {

    return (
        <div>
            <StepsCounter setValue={(adults) => {
                props.updateAdults(adults);
            }} initValue={1} maxVal={10} minVal={1} title="Adults"/>
            <StepsCounter setValue={(children) => {
                props.updateChildren(children)
            }} initValue={0} maxVal={10} minVal={0} title="Children"/>
        </div>);
}

export default PassengersCount;
