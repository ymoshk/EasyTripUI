import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import AttractionSmall from "../../attraction/AttractionSmall";
import {useSelector} from "react-redux";


const AttractionsSelectBox = () => {
    const defaultText = "Select Attraction Type";
    const [firstChange, setFirstChange] = useState(false);
    const [currentType, setCurrentType] = useState(defaultText);
    const attractionsDictionary = useSelector(state => state.attraction.attractionList);
    const typesArray = useSelector(state => state.attraction.tags);

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
            res = <div style={{textAlign: "center"}}><h3>Select Attraction Type</h3></div>
        } else {
            const relevantAttractions = attractionsDictionary[currentType];
            if (relevantAttractions !== undefined && relevantAttractions.length !== 0) {
                res = relevantAttractions.map((attraction) => mapAttraction(attraction));
            } else {
                res = <div style={{textAlign: "center"}}><h3>Couldn't find any relevant attractions</h3></div>
            }
        }

        return res;
    }

    return (
        <Card style={{height: "100%"}}>
            <Card.Header>
                <Form.Select onChange={onChangeEventHandler}>
                    {<option disabled={firstChange}>{defaultText}</option>}
                    {typesArray.map((typeAsString) => <option>{typeAsString}</option>)}
                </Form.Select>
            </Card.Header>
            <Card.Body>
                <div style={{height: "90vh", overflowY: "scroll"}}>
                    {renderBody()}
                </div>
            </Card.Body>
        </Card>

    );
};

export default AttractionsSelectBox;