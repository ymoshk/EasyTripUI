import React, {useEffect, useState} from 'react';
import SearchDestination from "./SearchDestination";

// TODO: handle arabic letter support

const PlaceSelection = (props) => {
    const [country, setCountry] = useState(null);
    const [showCitySearch, setShowCitySearch] = useState(false);
    const [city, setCity] = useState(null);


    useEffect(() => {
        if (country !== null && country !== '') {
            setShowCitySearch(true);
        } else {
            setShowCitySearch(false);
        }

    }, [country])

    const getCitySearchBar = () => {
        if (country !== null) {
            return <div style={{marginTop: 20}}>
                <SearchDestination url={process.env.REACT_APP_SERVER_URL + '/getCities?country=' + country}
                                   placeHolder={"Which city would you like to visit?"}
                                   ariaLabel={"Destination"}
                                   buttonText={"Select"}
                                   errorMessage={"You must select a destination city"}
                                   cleanOnSubmit={false}
                                   onChangeHandler={onCityChange}
                                   onSubmitHandler={onCitySelection}
                                   showButton={false}/>
            </div>
        }
    }


    const onCitySelection = (cityName) => {
        if (cityName !== '') {
            setCity(cityName);
            props.setValidation(true);
            props.setData(country, cityName)
        } else {
            props.setValidation(false);
            emptyData();
        }
    }


    const onCountrySelection = (countryName) => {
        if (countryName !== '') {
            setCountry(countryName);
        }
    }

    const onCityChange = () => {
        props.setValidation(false);
        setCity(null);
        emptyData();
    }

    const onCountryChange = () => {
        setCountry(null);
        emptyData();
    }

    const emptyData = () => {
        props.setData(null, null);
    }


    return (
        <div>
            <SearchDestination url={process.env.REACT_APP_SERVER_URL + '/getCountryNames'}
                               placeHolder={"Which country would you like to visit?"}
                               ariaLabel={"Destination"}
                               buttonText={"Select"}
                               errorMessage={"You must select a destination country"}
                               cleanOnSubmit={false}
                               onChangeHandler={onCountryChange}
                               onSubmitHandler={onCountrySelection}
                               showButton={false}/>
            {showCitySearch && getCitySearchBar()}
        </div>
    );
};

export default PlaceSelection;
