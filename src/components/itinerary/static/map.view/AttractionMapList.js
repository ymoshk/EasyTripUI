import React from 'react';
import AttractionSmall from "../../attraction/menu/AttractionSmall";
import AttractionMap from "./AttractionMap";

const AttractionMapList = (props) => {
    const attractions = props.attractions;

    function mapAttraction(attraction, index) {
        return <AttractionMap key={"attSmall_" + index.toString()} attractionNode={attraction}/>
    }

    function renderBody() {
        let res;

        if (attractions !== undefined && attractions.length !== 0) {
            res = attractions.map((attraction, index) => mapAttraction(attraction, index));
        } else {
            res = <div style={{textAlign: "center"}}><h3>Couldn't find any relevant attractions</h3></div>
        }


        return res;
    }

    return (
        <div style={{height: "100vh", overflowY: "scroll"}}>
            {renderBody()}
        </div>
    );
};

export default AttractionMapList;