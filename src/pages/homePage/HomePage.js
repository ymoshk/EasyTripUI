import React from 'react';
import backGround from "../../images/siteBackground/maldivs.jpg";
import planner from "../../images/siteBackground/Planner.jpg";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Button} from "tabler-react";
import RecommendedDestination from "./RecommendedDestination";
import rome from "../../images/recomendedDestinations/Coloseum.jpg"
import paris from "../../images/recomendedDestinations/Paris.jpg"
import telAviv from "../../images/recomendedDestinations/Tel Aviv.jpg"
import london from "../../images/recomendedDestinations/London.jpg"
import {QUESTIONNAIRE_STORAGE} from "../../components/itinerary/Constants";

const HomePage = () => {

    let onClickEventHandler = () => {
        localStorage.removeItem(QUESTIONNAIRE_STORAGE);
        window.location = '/questionnaire'
    }

    return (
        <>
            <Container fluid style={{
                backgroundImage: 'url("' + backGround + '")',
                height: "100vh",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
                <Row style={{width: "100%"}}>
                    <Col md={{span: 8, offset: 2}} xs={{span: 12, offset: 0}}>
                        <Card style={{marginTop: "200px", backgroundColor: "rgb(255,255,255,.7)"}}>
                            <Card.Body>
                                <Row>
                                    <Col/>
                                    <Col md={8} xs={12}>
                                        <div style={{textAlign: "center"}}>
                                            <h2>Planning A Trip Has Never Been Easier</h2>
                                            <Button onClick={onClickEventHandler} size={"lg"} color={"primary"}>Get
                                                Started</Button>
                                        </div>
                                    </Col>
                                    <Col/>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
            </Container>
            <Container fluid style={{width: "100%", padding: "0"}}>
                <Card style={{marginBottom: "0", width: "100%"}}>
                    <Card.Body>
                        <Row>
                            <h3 id={"popularDestinationsSection"}>Author Recommendations</h3>
                        </Row>
                        <Row style={{marginTop: "20px"}}>
                            <Col/>
                            <Col>
                                <RecommendedDestination
                                    src={rome}
                                    title={"Rome"}
                                    text={"A heady mix of haunting ruins, awe-inspiring art and vibrant street life, Italy???s hot-blooded capital is one of the world???s most romantic and charismatic cities."}
                                />
                            </Col>
                            <Col>
                                <RecommendedDestination
                                    src={paris}
                                    title={"Paris"}
                                    text={"Paris' monument-lined boulevards, museums, classical bistros and boutiques are enhanced by a new wave of multimedia galleries, creative wine bars, design shops and tech start-ups."}/>
                            </Col>
                            <Col/>
                        </Row>
                        <Row style={{marginTop: "20px"}}>
                            <Col/>
                            <Col>
                                <RecommendedDestination
                                    src={london}
                                    title={"London"}
                                    text={"One of the world's most visited cities, London has something for everyone: from history and culture to fine food and good times."}/>
                            </Col>
                            <Col>
                                <RecommendedDestination
                                    src={telAviv}
                                    title={"Tel Aviv"}
                                    text={"Tel Aviv (meaning 'Hill of Spring' in Hebrew) has an air of perpetual renewal: flowers bloom, new restaurants open and there's always a party somewhere."}/>
                            </Col>
                            <Col/>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
            <Container id={"howItWorksSection"} fluid style={{
                backgroundImage: 'url("' + planner + '")',
                height: "100vh",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
            </Container>
        </>
    );
};

export default HomePage;
