import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SingleItinerary from "./SingleItinerary";
import {useSelector} from "react-redux";
import useHttp from "../../hooks/UseHttp";
import LoaderContext from "../../components/utils/loader/LoaderContext";

const MyItineraries = (props) => {
    const loggedInUserData = useSelector(state => state.authData.auth);

    const {isLoading, error, sendRequest: getUserItineraries} = useHttp();
    const [userItineraries, setUserItineraries] = useState();

    const loader = useContext(LoaderContext);

    useEffect(() => {
        if (isLoading) {
            loader.setShow(true)
        } else {
            loader.setShow(false);
        }
    }, [isLoading])

    useEffect(() => {
        const consumeItineraries = (itineraries) => {
            console.log(itineraries);
            setUserItineraries(itineraries);
        };

        getUserItineraries({
                url: process.env.REACT_APP_SERVER_URL.concat('/getUserItineraries'),
            },
            consumeItineraries);
    }, [getUserItineraries])


    return (
        <Container fluid style={{width: "100%", padding: "0"}}>
            <Card style={{marginBottom: "0", width: "100%"}}>
                <Card.Body>
                    <Row>
                        <h3>My Itineraries</h3>
                    </Row>
                    {userItineraries && userItineraries.length > 0 && <Row style={{marginTop: "20px"}}>
                        {userItineraries.map((itineraryAndStatus, index) =>
                            <Col style={{marginTop: "20px"}}>
                                <SingleItinerary
                                    itiniraryId={itineraryAndStatus.itineraryId}
                                    index={index}
                                    questionsData={itineraryAndStatus.questionsData}
                                    status={itineraryAndStatus.itineraryStatus}
                                />
                            </Col>
                        )}
                    </Row>}
                    {
                        userItineraries && userItineraries.length === 0 && <Row>
                            <Col>
                                <div style={{textAlign: "center"}}>
                                    <h3>Couldn't find any itineraries</h3>
                                </div>
                            </Col>
                        </Row>
                    }
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MyItineraries;