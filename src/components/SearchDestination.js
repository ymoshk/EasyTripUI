import React, {useContext, useEffect, useState} from 'react';
import AutocompleteTextBox from "./utils/AutocompleteTextBox";
import useHttp from "../hooks/use-http";
import LoaderContext from "./utils/loader/LoaderContext";

const GET_CITIES_SUFFIX = '/api/getCities';

const SearchDestination = () => {
    const [countries, setCountries] = useState([]);
    const {isLoading, error, sendRequest: fetchCountries} = useHttp();
    const loader = useContext(LoaderContext)

    useEffect(() => {
        if(isLoading){
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    useEffect(() => {
        const urlCountries = new URL(process.env.REACT_APP_SERVER_URL.concat(GET_CITIES_SUFFIX));
        const params = [['country', 'Israel']];
        urlCountries.search = new URLSearchParams(params).toString();

        const transformCountries = (countriesObj) => {
            const loadedCountries = [];

            for (const countryKey in countriesObj) {
                loadedCountries.push(countriesObj[countryKey]);
            }

            setCountries(loadedCountries);
        };

        fetchCountries({url: urlCountries}, transformCountries);
    }, [fetchCountries])


    return <React.Fragment>
        <AutocompleteTextBox suggestionsList={countries}
                             placeHolder={"Where would you like to go?"}
                             ariaLabel={"Destination"}
                             buttonLabel={"Get started"}
                             errorMessage={"Could not find the destination, please enter city, region or country"}
                             size={"lg"}
        />
    </React.Fragment>;
}

export default SearchDestination;
