import React, {useEffect, useState} from 'react';
import AutocompleteTextBox from "../../utils/AutocompleteTextBox";
import useHttp from "../../../hooks/UseHttp";


const SearchDestination = (props) => {
    const [countries, setCountries] = useState([]);

    const {isLoading, error, sendRequest: fetchCountries} = useHttp();

    useEffect(() => {
        const transformCountries = (countriesObj) => {
            const loadedCountries = [];

            for (const countryKey in countriesObj) {
                loadedCountries.push(countriesObj[countryKey]);
            }

            setCountries(loadedCountries);
        };

        fetchCountries({url: props.url},
            transformCountries);
    }, [fetchCountries])

    return <AutocompleteTextBox suggestionsList={countries}
                                placeHolder={props.placeHolder}
                                ariaLabel={props.ariaLabel}
                                buttonLabel={props.buttonText}
                                errorMessage={props.errorMessage}
                                onSubmitHandler={props.onSubmitHandler}
                                onChangeHandler={props.onChangeHandler}
                                cleanOnSubmit={props.cleanOnSubmit}
                                size={"md"}
                                showButton={props.showButton}/>;
}

export default SearchDestination;
