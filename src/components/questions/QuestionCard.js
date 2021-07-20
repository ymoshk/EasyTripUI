import React from 'react';
import {Button, Card} from "tabler-react";
import CountrySelection from "./CountrySelection"

function QuestionCard(props) {

    let content = [{
        name: "Country Selection",
        content: CountrySelection,
        isValid: () => true
    }
    ]

    let current = content[0];

    return (
        <Card>
            <Card.Header>
                <Card.Title>{current.name}</Card.Title>
            </Card.Header>
            <Card.Body>
                {current.content}
            </Card.Body>
            <Card.Footer>This is standard card footer</Card.Footer>
        </Card>
    );
}

export default QuestionCard;

