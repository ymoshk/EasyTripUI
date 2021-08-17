import React, {useState} from 'react';
import {Alert, Button, Col, FormControl, InputGroup, ListGroup, Row} from 'react-bootstrap';
import "./AutocompleteTextBox.css";


const AutocompleteTextBox = (props) => {
    const [searchBar, setSearchBar] = useState({suggestions: [], text: ""});
    const [isValidSearch, setIsValidSearch] = useState(true);

    const onChangeHandler = (event) => {
        const value = event.target.value;
        let suggestions = [];

        setIsValidSearch(true);

        try {
            if (value.length > 0) {
                const regex = new RegExp(`^${value}`, 'i');
                suggestions = props.suggestionsList.sort().filter(value => regex.test(value));
            }
            setSearchBar({suggestions: suggestions, text: value});
            if (props.onChangeHandler !== undefined) {
                props.onChangeHandler();
            }
        } catch (e) {
        }
    }

    const onSelectSuggestionHandler = (value) => {
        setSearchBar({suggestions: [], text: value});
        setIsValidSearch(true);

        if (!props.showButton) {
            props.onSubmitHandler(value);
        }
    }

    const renderSuggestions = () => {
        const {suggestions} = searchBar;
        if (suggestions.length === 0) {
            return null;
        }
        return (<div className="selection-area"><ListGroup>
            {suggestions.map((value, index) => <ListGroup.Item
                action
                key={index}
                onClick={() => onSelectSuggestionHandler(value)}>{value}</ListGroup.Item>)}
        </ListGroup></div>);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (!props.suggestionsList.includes(searchBar.text)) {
            setIsValidSearch(false);
            setTimeout(() => setIsValidSearch(true), 2000);
        } else {
            if (props.cleanOnSubmit) {
                setSearchBar({suggestions: [], text: ""});
            }
            props.onSubmitHandler(searchBar.text);
        }
    }

    const getButton = () => {
        if (props.showButton) {
            return <Col md={3} xs={12}>
                <Button className={"btn-block"} variant="primary" id="button-addon2" size={props.size}
                        onClick={onSubmitHandler}>
                    {props.buttonLabel}
                </Button>
            </Col>
        }
    }

    return <React.Fragment>
        <Row>
            <Col md={props.showButton ? 9 : 12} xs={12}>
                {!isValidSearch ? <Alert variant={"danger"}>{props.errorMessage} </Alert> : ""}
            </Col>
            <Col md={props.showButton ? 9 : 12} xs={12}>
                <InputGroup className="mb-3" size={props.size}>
                    <FormControl
                        placeholder={props.placeHolder}
                        aria-label={props.ariaLabel}
                        aria-describedby="basic-addon2"
                        value={searchBar.text}
                        onChange={onChangeHandler}
                    />
                </InputGroup>
            </Col>
            {getButton()}
        </Row>
        <Row>
            <Col md={props.showButton ? 9 : 12} xs={12}>
                {renderSuggestions()}
            </Col>
        </Row>
    </React.Fragment>
}

export default AutocompleteTextBox;
