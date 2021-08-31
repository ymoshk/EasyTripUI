import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker
} from "react-google-maps";
import EiffelTour from "../../images/EiffelTour.jpg";
import Beach from "../../images/beach.jpg";


const MapWrapper = (props) => {
    const attractionsNodes = props.attractions;

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const findAverage = (coordinates) => {
        let total = 0;
        for (let i = 0; i < coordinates.length; i++) {
            total += coordinates[i];
        }

        return total / coordinates.length;
    }

    const MapContent = () => {
        const lat = findAverage(attractionsNodes.map(attractionNode => attractionNode.attraction.lat));
        const lng = findAverage(attractionsNodes.map(attractionNode => attractionNode.attraction.lng));
        const coordinates = {lat: lat, lng: lng};

        return (
            <GoogleMap
                defaultZoom={15}
                center={coordinates}
            >
                {attractionsNodes.map((attractionNode, index) => (
                    <Marker
                        key={attractionNode.attraction.id}
                        label={labels[index % labels.length]}
                        title={attractionNode.attraction.name + "\n" + attractionNode.attraction.startTime + "-" + attractionNode.attraction.endTime}
                        position={{
                            lat: attractionNode.attraction.lat,
                            lng: attractionNode.attraction.lng
                        }}
                        clickable={false}
                    />
                ))}
            </GoogleMap>
        );
    }

    const MapWrapped = withScriptjs(withGoogleMap(MapContent));

    return (
        <div style={{width: "100%", height: "100vh"}}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                    process.env.REACT_APP_GOOGLE_KEY
                }`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100%`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        </div>
    );
}

export default MapWrapper;
