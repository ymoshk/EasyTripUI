import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SingleItinerary from "./SingleItinerary";

const MyItineraries = (props) => {
    // const itineraries = props.itineraries;
    // const itineraryAndStatusArr = props.itineraryAndStatus;

    return (
        <Container fluid style={{width: "100%", padding: "0"}}>
            <Card style={{marginBottom: "0", width: "100%"}}>
                <Card.Body>
                    <Row>
                        <h3>Author Recommendations</h3>
                    </Row>
                    <Row style={{marginTop: "20px"}}>
                        {itineraryAndStatusArr.map((itineraryAndStatus, index) =>
                            <Col id=itineraryId>
                                <SingleItinerary
                                    itiniraryId={itineraryAndStatus.itineraryId}
                                    index={index}
                                    questionsData={itineraryAndStatus.questionsData}
                                    status={itineraryAndStatus.status}
                                />
                            </Col>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MyItineraries;