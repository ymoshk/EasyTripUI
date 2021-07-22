import React, {useState} from 'react';
import {Form, Button, InputGroup, FormControl, ListGroup} from 'react-bootstrap';


const AutocompleteTextBox = (props) => {
    const [searchBar, setSearchBar] = useState({suggestions: [], text: ""});
    const [isValidSearch, setIsValidSearch] = useState(true);

    const onChangeHandler = (event) => {
        const value = event.target.value;
        let suggestions = [];

        setIsValidSearch(true);

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = props.suggestionsList.sort().filter(value => regex.test(value));
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
        console.log(searchBar.text);

        if (!props.suggestionsList.includes(searchBar.text)) {
            setIsValidSearch(false);
            return;
        }

        setSearchBar({suggestions: [], text: ""});
    }

    return <React.Fragment>
        <InputGroup className="mb-3">
            <FormControl
                placeholder={props.placeHolder}
                aria-label={props.ariaLabel}
                aria-describedby="basic-addon2"
                value={searchBar.text} onChange={onChangeHandler}
            />
            <Button variant="outline-primary" id="button-addon2" onClick={onSubmitHandler}>
                {props.buttonLabel}
            </Button>
        </InputGroup>
        {!isValidSearch &&
        <Form.Label htmlFor="basic-url" style={{color: 'red'}}>{props.errorMessage} </Form.Label>}

        {renderSuggestions()}
    </React.Fragment>
}

export default AutocompleteTextBox;
