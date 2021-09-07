import React from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker
} from "react-google-maps";


const MapWrapper = (props) => {
    const attractionsNodes = props.attractions;
    let center = props.center;

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const findAverage = (coordinates) => {
        let total = 0;
        for (let i = 0; i < coordinates.length; i++) {
            total += coordinates[i];
        }

        return total / coordinates.length;
    }

    const MapContent = () => {
        if(center === undefined) {
            const lat = findAverage(attractionsNodes.map(attractionNode => attractionNode.attraction.lat));
            const lng = findAverage(attractionsNodes.map(attractionNode => attractionNode.attraction.lng));
            center = {lat: lat, lng: lng};
        }

        return (
            <GoogleMap
                defaultZoom={props.defaultZoom}
                center={center}
            >
                {attractionsNodes.map((attractionNode, index) => (
                    <Marker
                        key={attractionNode.attraction.id}
                        label={labels[index % labels.length]}
                        title={attractionNode.attraction.name + "\n" + attractionNode.startTime + "-" + attractionNode.endTime}
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
        <div style={{width: "100%", height: "60vh"}}>
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
