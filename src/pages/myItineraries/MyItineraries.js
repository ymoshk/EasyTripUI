import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import SingleItinerary from "./SingleItinerary";
import {useSelector} from "react-redux";
import useHttp from "../../hooks/UseHttp";
import LoaderContext from "../../components/utils/loader/LoaderContext";
import uuid from "uuid-random";
import SingleTag from "../../components/questions/tags/SingleTag";
import styles from "../../components/questions/tags/TagsList.module.css";

const MyItineraries = () => {
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
            setUserItineraries(itineraries);
        };

        getUserItineraries({
                url: process.env.REACT_APP_SERVER_URL.concat('/getUserItineraries'),
            },
            consumeItineraries);
    }, [getUserItineraries])

    const removeItinerary = (id) => {
        const newList = []

        userItineraries.forEach(itinerary => {
            console.log(itinerary);
            if (itinerary.itineraryId !== id) {
                newList.push(itinerary);
            }
        })

        setUserItineraries(newList);
    }

    const renderRow = (offset) => {
        const buildCols = () => {
            const result = []

            console.log(offset)

            for (let i = 0; i < 2 && (i + offset) < userItineraries.length; i++) {
                result.push(<Col style={{marginBottom: 20}} key={uuid()}>
                    <SingleItinerary
                        removeLocal={removeItinerary}
                        itiniraryId={userItineraries[i + offset].itineraryId}
                        index={i + offset}
                        questionsData={userItineraries[i + offset].questionsData}
                        status={userItineraries[i + offset].itineraryStatus}
                    />
                </Col>)
            }

            return result;
        }

        return (
            <Row key={uuid()}>
                {buildCols()}
            </Row>
        )
    }

    const renderRows = () => {
        const result = []

        for (let i = 0; i < userItineraries.length; i += 2) {
            result.push(renderRow(i));
        }
        return result;
    }

    return (
        <Container fluid style={{width: "100%", padding: "0"}}>
            <Card style={{marginBottom: "0", width: "100%"}}>
                <Card.Body>
                    <Row>
                        <h3>My Itineraries</h3>
                    </Row>
                    {userItineraries && userItineraries.length > 0 && renderRows()}
                    {/*{userItineraries && userItineraries.length > 0 &&*/}
                    {/*<Row style={{marginTop: "20px"}}>*/}
                    {/*    {userItineraries.map((itineraryAndStatus, index) =>*/}
                    {/*        <Col style={{marginTop: "20px"}}>*/}
                    {/*            <SingleItinerary*/}
                    {/*                removeLocal={removeItinerary}*/}
                    {/*                itiniraryId={itineraryAndStatus.itineraryId}*/}
                    {/*                index={index}*/}
                    {/*                questionsData={itineraryAndStatus.questionsData}*/}
                    {/*                status={itineraryAndStatus.itineraryStatus}*/}
                    {/*            />*/}
                    {/*        </Col>*/}
                    {/*    )}*/}
                    {/*</Row>}*/}
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
