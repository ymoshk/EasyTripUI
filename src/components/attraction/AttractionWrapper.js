import React from 'react';
import EiffelTour from "../../images/EiffelTour.jpg";
import Beach from "../../images/beach.jpg";

import Attraction from "./Attraction";

const DUMMY_ATTRACTIONS = [{
    name: "Eiffel Tower",
    type: "Must See",
    rating: 4.5,
    userTotalRating: 358,
    image: EiffelTour,
    closedTemporarily: false,
    priceRange: 3,
    startTime: '10:30',
    endTime: '12:00'
},
    {
        name: "Eiffel Tower",
        type: "Art",
        rating: 3.5,
        userTotalRating: 123,
        image: Beach,
        closedTemporarily: true,
        priceRange: 1,
        startTime: '12:00',
        endTime: '12:30'
    }];

const AttractionWrapper = () => {
    return DUMMY_ATTRACTIONS.map((attraction) => <Attraction name={attraction.name}
                                                             type={attraction.type}
                                                             image={attraction.image}
                                                             rating={attraction.rating}
                                                             userTotalRating={attraction.userTotalRating}
                                                             closedTemporarily={attraction.closedTemporarily}
                                                             priceRange={attraction.priceRange}
                                                             startTime={attraction.startTime}
                                                             endTime={attraction.endTime}/>);
}

export default AttractionWrapper;