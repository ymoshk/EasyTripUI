import React, {Fragment} from 'react';
import {Button, Card, Col, Image, Row} from 'react-bootstrap';
import OpenHours from "./OpenHours";
import RecommendedIcon from "../RecommendedIcon";
import StarRating from "../StarRating";
import styles from "./Attraction.module.css"


const Attraction = (props) => {
    let priceLevel = '$'.repeat(props.attraction.priceLevel + 1);

    return (
        <Row style={{width: "100%"}}>
            <Card className={styles.bd}>
                <Card.Body>
                    <Row>
                        <Col md={{span: 6, offset: 0}} xs={{span: 9, offset: 0}}>
                            <Card.Title>
                                <Row>
                                    <Col md={{span: 12, offset: 0}} xs={{span: 12, offset: 0}}>
                                        <h1>{props.attraction.isRecommended &&
                                        <RecommendedIcon/>}{props.attraction.name}</h1>
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><h4>{props.attraction.type}</h4></Card.Subtitle>
                            <Card.Text>
                                <Row>
                                    <Col md={{span: 12, offset: 0}} xs={{span: 12, offset: 0}}>
                                        <Row><StarRating value={props.attraction.rating}/></Row>
                                        <Row><h4>Raters No. </h4></Row>
                                        <Row><span
                                            style={{color: 'grey'}}><h5>{props.attraction.userTotalRating}</h5></span></Row>
                                        <Row><h4>Price Range </h4></Row>
                                        <Row><h5 style={{color: 'green'}}>{priceLevel}</h5></Row>
                                        <Row>
                                            <Col style={{marginTop: 10, textAlign: "center"}}>
                                                {props.imageBase64 && <Image
                                                    style={{width: "auto", height: "auto"}}
                                                    src={`data:image/jpeg;base64,${props.imageBase64}`}
                                                />}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Text>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col md={{span: 12, offset: 0}} xs={{span: 12, offset: 0}}>
                                    <Row><h4>Address</h4></Row>
                                    <Row><h6>{props.attraction.address}</h6></Row>
                                    <Row><h4>Phone No.</h4></Row>
                                    <Row><h6>{props.attraction.internationalNumber}</h6></Row>
                                    <small className="text-muted">
                                        {props.attraction.closedTemporarily &&
                                        <b style={{color: 'red'}}>Temporarily closed</b>}
                                        {!props.attraction.closedTemporarily &&
                                        <b style={{color: 'green'}}>Operational</b>}
                                    </small>
                                    {props.attraction.website &&
                                    <Fragment>
                                        <Row>
                                            <Button
                                                style={{marginTop: 20}}
                                                href={props.attraction.website}
                                                target={"_blank"}
                                                variant={"outline-primary"}>
                                                Visit Website
                                            </Button>{' '}
                                        </Row>
                                    </Fragment>}
                                    <Row>
                                        {!props.attraction.closedTemporarily &&
                                        <span style={{paddingLeft: 10}}><OpenHours
                                            hours={props.attraction.openingHoursText}/></span>}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Row>
    )
}

export default Attraction;
