import React from "react";
import StepsCounter from "../utils/StepsCounter";


function PassengersCount(props){
    return(
        <div>
            <StepsCounter initValue={1} maxVal={10} minVal={1} title="Adults"/>
            <StepsCounter initValue={0} maxVal={10} minVal={0} title="Children"/>
        </div>);
}

export default PassengersCount;