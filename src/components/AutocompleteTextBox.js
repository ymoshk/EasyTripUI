import React, {useState} from 'react';
import {Form, Button, Row, Col, InputGroup, FormControl, Card, ListGroup, ListGroupItem} from 'react-bootstrap';

const CITIES_LIST = ['Tel Aviv', 'Jerusalem', 'Berlin', 'Madrid', 'Paris', 'Prage', 'Portugal', 'Rome'];

const AutocompleteTextBox = () => {
    const [searchBar, setSearchBar] = useState({suggestions: [], text: ""});
    const [isValidSearch, setIsValidSearch] = useState(true);

    const onChangeHandler = (event) => {
        const value = event.target.value;
        let suggestions = [];

        setIsValidSearch(true);

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = CITIES_LIST.sort().filter(value => regex.test(value));
        }
        setSearchBar({suggestions: suggestions, text: value});
    }

    const onSelectSuggestionHandler = (value) => {
        setSearchBar({suggestions: [], text: value});
        setIsValidSearch(true);
    }

    const renderSuggestions = () => {
        const {suggestions} = searchBar;
        if (suggestions.length === 0) {
            return null;
        }
        return (<ListGroup>
            {suggestions.map(value => <ListGroup.Item action
                                                      onClick={() => onSelectSuggestionHandler(value)}>{value}</ListGroup.Item>)}
        </ListGroup>);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(!CITIES_LIST.includes(searchBar.text)){
            setIsValidSearch(false);
        }
    }

    return <React.Fragment>
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Where would you like to go?"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchBar.text} onChange={onChangeHandler}
            />
            <Button variant="outline-primary" id="button-addon2" onClick={onSubmitHandler}>
                Start Your Trip
            </Button>
        </InputGroup>
        {!isValidSearch &&
        <Form.Label htmlFor="basic-url" style={{color: 'red'}}>Could not find <b>{searchBar.text}</b> please enter a city,
            region, or country </Form.Label>}

        {renderSuggestions()}

    </React.Fragment>
}

export default AutocompleteTextBox;