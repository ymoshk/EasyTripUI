import React from "react";
import {No} from "tabler-react";
import {Xo} from "tabler-react";


function PassengersCount(props){
    return(<Xo label="Ratios">
        <No Display Name
            defaultValue="15"
            max={50}
            min={0}
            step={5}
        />
    </Xo>);
}

export default PassengersCount;