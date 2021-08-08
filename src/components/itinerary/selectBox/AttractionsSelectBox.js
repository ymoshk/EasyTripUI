import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import AttractionSmall from "../../attraction/AttractionSmall";
import {useSelector} from "react-redux";


const AttractionsSelectBox = () => {
        const defaultText = "Select Attraction Type";
        const [firstChange, setFirstChange] = useState(false);
        const [currentType, setCurrentType] = useState(defaultText);
        const [duration, setDuration] = useState(1.5);
        const attractionsDictionary = useSelector(state => state.itineraryData.itinerary.attractions);
        const durationsDic = useSelector(state => state.itineraryData.defaultDurations);
        let typesArray = [];

        if (attractionsDictionary !== undefined) {
            typesArray = Object.keys(attractionsDictionary);
        }

        function onChangeEventHandler(e) {
            setCurrentType(e.target.value); // e.target.value is a string
            setDuration(durationsDic[e.target.value]);
            setFirstChange(true);
        }

        function mapAttraction(attraction) {
            return <AttractionSmall attraction={attraction} category={currentType} duration={duration}/>
        }

        function renderBody() {
            let res;

            if (currentType === defaultText) {
                res =
                    <div style={{textAlign: "center"}}><h3>Select Attraction Type</h3></div>
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
                        {typesArray.map((typeAsString) => {
                            return <option>{typeAsString}</option>
                        })}
                    </Form.Select>
                </Card.Header>
                <Card.Body>
                    <div style={{height: "90vh", overflowY: "scroll"}}>
                        {renderBody()}
                    </div>
                </Card.Body>
            </Card>

        );
    }
;

export default AttractionsSelectBox;
