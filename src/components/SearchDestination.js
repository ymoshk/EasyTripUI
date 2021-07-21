import React from 'react';
import AutocompleteTextBox from "./AutocompleteTextBox";

const CITIES_LIST = ['Tel Aviv', 'Jerusalem', 'Berlin', 'Madrid', 'Paris', 'Prage', 'Portugal', 'Rome'];


const SearchDestination = () => {
    return <AutocompleteTextBox suggestionsList={CITIES_LIST}
    placeHolder={"Where would you like to go?"}
    ariaLabel={"Destination"}
    buttonLabel={"Start Your Trip"}
    errorMessage={"Could not find the destination, please enter city, region or country"}/>;
}

export default SearchDestination;