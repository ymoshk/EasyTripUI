import React, {useEffect, useState} from 'react';
import Flight from "./Flight";
import {Fragment} from "react";
import useHttp from "../../hooks/UseHttp";

const FlightList = () => {
    const [flights, setFlights] = useState([]);

    const {isLoading, error, sendRequest: fetchFlights} = useHttp();

    useEffect(() => {
        const transformFlights = (flightsObj) => {
            console.log(flightsObj);

            setFlights(flightsObj);
        }

        fetchFlights({url: process.env.REACT_APP_SERVER_URL + "/getFlights"},
            transformFlights);
    }, [])

    return flights.map(flight => <Flight flight={flight}/>);
}

export default FlightList;