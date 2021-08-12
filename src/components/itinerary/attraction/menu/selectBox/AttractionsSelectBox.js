import React, {useState} from 'react';
import {Card, Form} from "react-bootstrap";
import AttractionSmall from "../AttractionSmall";
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
        typesArray.sort();
    }

    const onChangeEventHandler = (e) => {
        setCurrentType(e.target.value); // e.target.value is a string
        let str = e.target.value.replace(' ', '');

        if (durationsDic[e.target.value] !== undefined) {
            setDuration(durationsDic[str] / 60);
        } else {
            setDuration(1.5);
        }

        setFirstChange(true);
    }

    const mapAttraction = (attraction, index) => {
        return <AttractionSmall key={"attSmall_" + index.toString()} attraction={attraction}
                                category={currentType} duration={duration}/>
    }

    const renderBody = () => {
        let res;

        if (currentType === defaultText) {
            res =
                <div style={{textAlign: "center"}}><h3>Select Attraction Type</h3></div>
        } else {
            const relevantAttractions = attractionsDictionary[currentType];
            if (relevantAttractions !== undefined && relevantAttractions.length !== 0) {
                res = relevantAttractions.map((attraction, index) => mapAttraction(attraction, index));
            } else {
                res = <div style={{textAlign: "center"}}><h3>Couldn't find any relevant attractions</h3></div>
            }
        }

        return res;
    }

    let i = 0;

    return (
        <Card style={{height: "100%"}}>
            <Card.Header as={"div"}>
                <Form.Select onChange={onChangeEventHandler}>
                    {<option disabled={firstChange}>{defaultText}</option>}
                    {typesArray.map((typeAsString) => {
                        return <option
                            selected={typeAsString === currentType}
                            key={currentType + "_" + (i++).toString()}>
                            {typeAsString}
                        </option>
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
};

export default AttractionsSelectBox;
