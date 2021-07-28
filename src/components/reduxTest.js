import React from 'react';
import {useSelector} from "react-redux";
import Attraction from "./attraction/Attraction";
import {Row, Col} from "react-bootstrap";
import AttractionSmall from "./attraction/AttractionSmall";

const reduxTest = () => {
    const itinerary = useSelector(state => state.attraction.itinerary);
    const attractions = useSelector(state => state.attraction.attractionList);

    const itineraryList = itinerary.map((attraction) => <Attraction name={attraction.name}
                                                                    type={attraction.type}
                                                                    image={attraction.image}
                                                                    rating={attraction.rating}
                                                                    userTotalRating={attraction.userTotalRating}
                                                                    closedTemporarily={attraction.closedTemporarily}
                                                                    priceRange={attraction.priceRange}
                                                                    startTime={attraction.startTime}
                                                                    endTime={attraction.endTime}
                                                                    hours={attraction.hours}
                                                                    address={attraction.address}
                                                                    isRecommended={true}
                                                                    id={attraction.id}/>);

    const attractionList = attractions.map((attraction) => <AttractionSmall name={attraction.name}
                                                                            type={attraction.type}
                                                                            image={attraction.image}
                                                                            rating={attraction.rating}
                                                                            userTotalRating={attraction.userTotalRating}
                                                                            closedTemporarily={attraction.closedTemporarily}
                                                                            priceRange={attraction.priceRange}
                                                                            showImage={false}
                                                                            isRecommended={true}
                                                                            id={attraction.id}/>);

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