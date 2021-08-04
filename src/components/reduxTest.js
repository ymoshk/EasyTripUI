import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Attraction from "./attraction/Attraction";
import {Row, Col} from "react-bootstrap";
import AttractionSmall from "./attraction/AttractionSmall";
import {useDispatch} from "react-redux";
import {fetchAttractionData, sendItinerary} from "../store/attraction-actions";

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

    const itineraryList = itinerary.map((attraction) => <Attraction name={attraction.name}
                                                                    type={attraction.type}
                                                                    image={attraction.image}
                                                                    rating={attraction.rating}
                                                                    userTotalRating={attraction.userTotalRating}
                                                                    closedTemporarily={attraction.isTemporarlyClose}
                                                                    priceRange={attraction.priceLevel}
                                                                    startTime={attraction.startTime}
                                                                    endTime={attraction.endTime}
                                                                    hours={attraction.openingHoursText}
                                                                    address={attraction.address}
                                                                    isRecommended={true}
                                                                    id={attraction.id}
                                                                    phoneNumber={attraction.internationalNumber}
                                                                    website={attraction.website}
                                                                    key={attraction.id}/>);

    const attractionList = attractions.map((attraction) => <AttractionSmall name={attraction.name}
                                                                            type={attraction.type}
                                                                            image={attraction.image}
                                                                            rating={attraction.rating}
                                                                            userTotalRating={attraction.userTotalRating}
                                                                            closedTemporarily={attraction.closedTemporarily}
                                                                            priceRange={attraction.priceLevel}
                                                                            showImage={false}
                                                                            isRecommended={true}
                                                                            id={attraction.id}
                                                                            key={attraction.id}/>);

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