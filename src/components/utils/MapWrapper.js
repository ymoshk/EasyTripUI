import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker
} from "react-google-maps";
import EiffelTour from "../../images/EiffelTour.jpg";
import Beach from "../../images/beach.jpg";

const DUMMY_ATTRACTIONS = [{
    name: "Eiffel Tower",
    id: 1,
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
    },
    lat: 48.8584,
    lng: 2.2945
},
    {
        name: "Louvre",
        id: 2,
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
        },
        lat: 48.8606,
        lng: 2.3376
    },
    {
        name: "notre dame",
        id: 3,
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
        },
        lat: 48.8530,
        lng: 2.3499
    }];

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const findAverage = (coordinates) => {
    let total = 0;
    for (let i = 0; i < coordinates.length; i++) {
        total += coordinates[i];
    }

    return total / coordinates.length;
}

const MapContent = () => {
    const lat = findAverage(DUMMY_ATTRACTIONS.map(attraction => attraction.lat));
    const lng = findAverage(DUMMY_ATTRACTIONS.map(attraction => attraction.lng));
    const coordinates = {lat: lat, lng: lng};

    return (
        <GoogleMap
            defaultZoom={13}
            center={coordinates}
        >
            {DUMMY_ATTRACTIONS.map((place, index) => (
                <Marker
                    key={place.id}
                    label={labels[index % labels.length]}
                    title={place.name + "\n" + place.startTime + "-" + place.endTime}
                    position={{
                        lat: place.lat,
                        lng: place.lng
                    }}
                    clickable={false}
                />
            ))}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(MapContent));

const MapWrapper = () => {
    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY
                }`}
                //googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCFHYMWMtBsJ6LM8BfYW2lGq_wG3vT1YY0`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        </div>
    );
}

export default MapWrapper;
