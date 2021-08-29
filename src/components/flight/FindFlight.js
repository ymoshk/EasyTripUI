import React, {useEffect, useState, Fragment, useContext} from 'react';
import Flight from "./Flight";
import useHttp from "../../hooks/UseHttp";
import PlaceSelection from "../questions/componenets/destination/PlaceSelection";
import {useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {ListGroup} from "react-bootstrap";
import LoaderContext from "../utils/loader/LoaderContext";

const FindFlight = (props) => {
    const [flights, setFlights] = useState([]);
    const [showFlights, setShowFlights] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState("");

    const {isLoading, error, sendRequest: fetchFlights} = useHttp();
    const loader = useContext(LoaderContext);

    //retrieve flight details from previous stages
    const originLocation = useSelector(state => state.questionnaireData.questionnaire.stages[props.stageIndex].data);
    const destinationLocation = useSelector(state => state.questionnaireData.questionnaire.stages[0].data);
    const numOfPassengers = 1; //useSelector(state => state.questionnaireData.questionnaire.stages[2].data.adultsCount);
    let departureDate = new Date(useSelector(state => state.questionnaireData.questionnaire.stages[1].data.startDate));
    let returnDate = new Date(useSelector(state => state.questionnaireData.questionnaire.stages[1].data.endDate));

    departureDate.setHours(12);
    departureDate.setMinutes(0);
    departureDate.setSeconds(0);
    returnDate.setHours(12);
    returnDate.setMinutes(0);
    returnDate.setSeconds(0);

    let showButton = false;

    useEffect(() => {
        if (isLoading) {
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    if(originLocation.country !== null && originLocation.country !== undefined &&
        originLocation.city !== null && originLocation.city !== undefined){
        showButton = true;
    }

    const onFindFlightsHandler = () => {
        const flightDetails = {originCountry: originLocation.country,
            originCity: originLocation.city,
            destinationCountry: destinationLocation.country,
            destinationCity: destinationLocation.city,
            departureDate: departureDate,
            returnDate: returnDate,
            oneWay: '0',
            numberOfPassengers: numOfPassengers.toString()};

        const transformFlights = (flightsObj) => {
            setFlights(flightsObj);
            setShowFlights(true);
        }

        fetchFlights({
                url: process.env.REACT_APP_SERVER_URL + "/getFlights",
                method: 'POST',
                body: flightDetails
            },
            transformFlights);
    }

    const setFlightHandler = (flight) => {
        setSelectedFlight(flight);
    }

    const removeFlightHandler = () => {
        setSelectedFlight("");
    }

    return <Fragment>
        {!selectedFlight && showFlights && <div style={{height: "80vh", overflowY: "scroll"}} className="selection-area">
            <ListGroup>
                {flights.map((flight, index) => <Flight flight={flight} key={index} setFlight={setFlightHandler} removeFlight={removeFlightHandler} selected={false}/>)}
            </ListGroup>
        </div>}
        {selectedFlight && <Flight flight={selectedFlight} setFlight={setFlightHandler} removeFlight={removeFlightHandler} selected={true}/>}
        {!showFlights && !selectedFlight && <PlaceSelection stageIndex={props.stageIndex}/>}
        {!showFlights && showButton && <Button onClick={onFindFlightsHandler}>Find flights</Button>}
    </Fragment>;
}

export default FindFlight;