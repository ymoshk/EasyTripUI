import React from 'react';
import {Card} from "react-bootstrap";

const RecommendedDestination = (props) => {
    return (
        <div>
            <Card style={{width: '20rem', marginRight: "0", marginBottom:"0"}}>
                <Card.Img variant="top" src={props.src}/>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecommendedDestination;