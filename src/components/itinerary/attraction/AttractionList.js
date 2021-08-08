import React from 'react';
import EiffelTour from "../../../images/EiffelTour.jpg";

import Attraction from "../../attraction/Attraction";

const DUMMY_ATTRACTIONS = [{
    name: "Eiffel Tower",
    id: 1,
    type: "Must See",
    rating: 4.7,
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
    },
    lat: 48.8584,
    lng: 2.2945,
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France"
},

];


const AttractionList = () => {
    return DUMMY_ATTRACTIONS.map((attraction) => <Attraction attraction={attraction}/>);
}

export default AttractionList;
