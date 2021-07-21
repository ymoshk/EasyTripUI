import React from 'react';
import EiffelTour from "../../images/EiffelTour.jpg";
import Beach from "../../images/beach.jpg";

import Attraction from "./Attraction";

const DUMMY_ATTRACTIONS = [{
    name: "Eiffel Tower",
    type: "Must See",
    rating: 4.5,
    userTotalRating: 358,
    image: {url: EiffelTour, height: 1025, width: 616},
    closedTemporarily: false,
    priceRange: 3,
    startTime: '10:30',
    endTime: '12:00',
    hours: {
        sunday: '9am-6pm',
        monday: '9am-6pm',
        tuesday: '9am-6pm',
        wednesday: '9am-6pm',
        thursday: '9am-6pm',
        friday: '9am-6pm',
        saturday: 'Closed'
    }
},
    {
        name: "Empire State Building",
        type: "Art",
        rating: 3.5,
        userTotalRating: 123,
        image: {url: Beach, height: 283, width: 425},
        closedTemporarily: true,
        priceRange: 1,
        startTime: '12:00',
        endTime: '12:30',
        hours: {
            sunday: '9am-6pm',
            monday: '9am-6pm',
            tuesday: '9am-6pm',
            wednesday: '9am-6pm',
            thursday: '9am-6pm',
            friday: '9am-6pm',
            saturday: 'Closed'
        }
    },
    {
        name: "Louvree",
        type: "Art",
        rating: 3.5,
        userTotalRating: 123,
        image: {url: Beach, height: 283, width: 425},
        closedTemporarily: false,
        priceRange: 1,
        startTime: '12:00',
        endTime: '12:30',
        hours: {
            sunday: '9am-6pm',
            monday: '9am-6pm',
            tuesday: '9am-6pm',
            wednesday: '9am-6pm',
            thursday: '9am-6pm',
            friday: '9am-6pm',
            saturday: 'Closed'
        }
    }];


const AttractionList = () => {
    return DUMMY_ATTRACTIONS.map((attraction) => <Attraction name={attraction.name}
                                                             type={attraction.type}
                                                             image={attraction.image}
                                                             rating={attraction.rating}
                                                             userTotalRating={attraction.userTotalRating}
                                                             closedTemporarily={attraction.closedTemporarily}
                                                             priceRange={attraction.priceRange}
                                                             startTime={attraction.startTime}
                                                             endTime={attraction.endTime}
                                                             hours={attraction.hours}/>);
}

export default AttractionList;