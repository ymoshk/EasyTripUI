import React, {useEffect, useState} from 'react';
import AutocompleteTextBox from "./utils/AutocompleteTextBox";
import useHttp from "../hooks/use-http";


const SearchDestination = () => {
    const [countries, setCountries] = useState([]);

    const {isLoading, error, sendRequest: fetchCountries} = useHttp();

    useEffect(()=>{
        const transformCountries = (countriesObj) => {
            const loadedCountries = [];

            for(const countryKey in countriesObj){
                loadedCountries.push(countriesObj[countryKey].name);
            }

            setCountries(loadedCountries);
        };

        fetchCountries({url: 'https://easy-trip-d51f1-default-rtdb.firebaseio.com/countries.json'},
            transformCountries);
    }, [fetchCountries])

    return <AutocompleteTextBox suggestionsList={countries}
    placeHolder={"Where would you like to go?"}
    ariaLabel={"Destination"}
    buttonLabel={"Get started"}
    errorMessage={"Could not find the destination, please enter city, region or country"}
    size={"lg"}/>;
}

export default SearchDestination;
