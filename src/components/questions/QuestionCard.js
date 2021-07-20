import React from 'react';
import {Card} from "tabler-react";
import CountrySelection from "./CountrySelection"
import Footer from "./Footer";

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
            <Card.Footer>
                <Footer/>
            </Card.Footer>
        </Card>
    );
}

export default QuestionCard;

