import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Attraction from "./itinerary/attraction/modal/Attraction";
import {Row, Col} from "react-bootstrap";
import AttractionSmall from "./itinerary/attraction/menu/AttractionSmall";
import {useDispatch} from "react-redux";
import {fetchAttractionData, sendItinerary} from "../store/itinerary-actions";

let isInitial = true;

const reduxTest = () => {
    const itinerary = useSelector(state => state.attraction.itinerary);
    const attractions = useSelector(state => state.attraction.attractionList);
    const isChanged = useSelector(state => state.attraction.changed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAttractionData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (isChanged) {
            dispatch(sendItinerary(itinerary));
        }
    }, [itinerary, dispatch])

    const itineraryList = itinerary.map((attraction) =>
        <Attraction attraction={attraction} key={attraction.id}/>);

    const attractionList = attractions.map((attraction) =>
        <AttractionSmall attraction={attraction} key={attraction.id}/>);

    return <React.Fragment>
        <Row>
            <Col>
                {attractionList}
            </Col>
            <Col>
                {itineraryList}
            </Col>
        </Row>

    </React.Fragment>;
};

export default reduxTest;
