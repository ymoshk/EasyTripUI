import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import AttractionSmall from "../AttractionSmall";


const AttractionsSelectBox = (props) => {
    const defaultText = "Select A Type";
    const [firstChange, setFirstChange] = useState(false);
    const [currentType, setCurrentType] = useState(defaultText);
    const attractionsDictionary = props.data;

    function onChangeEventHandler(e) {
        setCurrentType(e.target.value); // e.target.value is a string


        //TODO - get attractions from server

        setFirstChange(true);
    }

    function mapAttraction(attraction) {
        return <AttractionSmall name={attraction.name}
                                type={attraction.type}
                                image={attraction.image}
                                rating={attraction.rating}
                                userTotalRating={attraction.userTotalRating}
                                closedTemporarily={attraction.closedTemporarily}
                                priceRange={attraction.priceRange}
                                showImage={false}
                                isRecommended={attraction.isRecommended}/>
    }

    function renderBody() {
        let res;

        if (currentType === defaultText) {
            res = <div style={{textAlign: "center"}}><h3>Please Pick A Type</h3></div>
        } else {
            const relevantAttractions = attractionsDictionary[currentType];
            if (relevantAttractions !== undefined && relevantAttractions.length !== 0) {
                res = relevantAttractions.map((attraction) => mapAttraction(attraction));
            } else {
                res = <div style={{textAlign: "center"}}><h3>Could not find any relevant attractions</h3></div>
            }
        }

        return res;
    }

    return (
        <Card>
            <Card.Header>
                <Form.Select aria-label="Default select example" onChange={onChangeEventHandler}>
                    {<option disabled={firstChange}>{defaultText}</option>}
                    {props.types.map((typeAsString) => <option>{typeAsString}</option>)}
                </Form.Select>
            </Card.Header>
            <Card.Body>
                {renderBody()}
            </Card.Body>
        </Card>

    );
};

export default AttractionsSelectBox;