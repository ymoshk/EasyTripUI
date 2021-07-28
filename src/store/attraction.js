import {createSlice} from "@reduxjs/toolkit";

import EiffelTour from "../images/EiffelTour.jpg";
import louvre from "../images/louvre.jpg";
import nortedame from "../images/nortedame.jpg";

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
    {
        name: "Louvre",
        id: 4.5,
        type: "Art",
        rating: 2.2,
        userTotalRating: 123,
        image: {url: louvre, height: 780, width: 1280},
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
        },
        lat: 48.8606,
        lng: 2.3376,
        address: "Rue de Rivoli, 75001 Paris, France"
    },
    {
        name: "notre dame",
        id: 3,
        type: "Art",
        rating: 3.5,
        userTotalRating: 123,
        image: {url: nortedame, height: 868, width: 636},
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
        },
        lat: 48.8530,
        lng: 2.3499,
        address: "6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France"
    }
];

const initialState = {itinerary: [], attractionList: DUMMY_ATTRACTIONS};

const attractionSlice = createSlice({
    name: 'attractions',
    initialState: initialState,
    reducers: {
        remove(state, action) {
            state.itinerary = state.itinerary.filter(attraction => attraction.id !== action.payload);
        },
        add(state, action){
            const newAttraction = state.attractionList.find(attraction => attraction.id === action.payload);
            state.itinerary.push(newAttraction);
        }
    }
})

export const attractionActions = attractionSlice.actions;
export default attractionSlice;