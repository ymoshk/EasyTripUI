import React, {useEffect, useState} from 'react';
import SearchDestination from "./SearchDestination";
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../../../store/questionnaire-slice";

// TODO: handle arabic letter support

const PlaceSelection = (props) => {
    const data = useSelector(state => state.questionnaireData.questionnaire.stages[props.stageIndex].data)
    const dispatch = useDispatch();

    const [initCountry, setInitCountry] = useState(null);
    const [initCity, setInitCity] = useState(null);

    useEffect(() => {
        if (data !== undefined) {
            if (data.country !== undefined) {
                setInitCountry(data.country);
            }

            if (data.city !== undefined) {
                setInitCity(data.city);
            }
        }
    }, [data])


    const getCitySearchBar = () => {
        if (data.country !== null && data.country !== undefined) {
            return <div style={{marginTop: 20}}>
                <SearchDestination url={process.env.REACT_APP_SERVER_URL + '/getCities?country=' + data.country}
                                   placeHolder={props.cityPlaceHolder}
                                   ariaLabel={"Destination"}
                                   buttonText={"Select"}
                                   errorMessage={"You must select a destination city"}
                                   cleanOnSubmit={false}
                                   onChangeHandler={onCityChange}
                                   onSubmitHandler={onCitySelection}
                                   showButton={false}
                                   value={initCity}
                />
            </div>
        }
    }


    const onCitySelection = (cityName) => {
        if (cityName !== '') {
            dispatch(questionnaireActions.setIsValid(true));
            dispatch(questionnaireActions.setCurrentData(
                {
                    country: data.country,
                    city: cityName
                }));
        } else {
            dispatch(questionnaireActions.setIsValid(false));
        }
    }


    const onCountrySelection = (countryName) => {
        if (countryName !== '') {
            dispatch(questionnaireActions.setIsValid(false));
            dispatch(questionnaireActions.setCurrentData(
                {
                    country: countryName,
                    city: null
                }));
        }
    }

    const onCityChange = () => {
        dispatch(questionnaireActions.setIsValid(false));
        dispatch(questionnaireActions.setCurrentData(
            {
                country: data.country,
                city: null
            }));
    }

    const onCountryChange = () => {
        dispatch(questionnaireActions.setIsValid(false));
        dispatch(questionnaireActions.setCurrentData(
            {
                country: null,
                city: null
            }));
    }


    return (
        <div>
            <SearchDestination url={process.env.REACT_APP_SERVER_URL + '/getCountryNames'}
                               placeHolder={props.countryPlaceHolder}
                               ariaLabel={"Destination"}
                               buttonText={"Select"}
                               errorMessage={"You must select a destination country"}
                               cleanOnSubmit={false}
                               onChangeHandler={onCountryChange}
                               onSubmitHandler={onCountrySelection}
                               showButton={false}
                               value={initCountry}/>
            {data.country !== '' && getCitySearchBar()}
            <img src={props.image} style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
            }}/>
        </div>
    );
};

export default PlaceSelection;
