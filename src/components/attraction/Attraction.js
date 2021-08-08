import React, {Fragment, useState} from 'react';
import {itineraryActions} from "../../store/itinerary-slice";
import {Card, Image, Col, Row, Button} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import CollapsibleDiv from "../utils/CollapsibleDiv";
import OpenHours from "./OpenHours";
import RecommendedIcon from "./RecommendedIcon";
import StarRating from "../utils/StarRating";
import {InfoSquare, Trash} from "tabler-icons-react";
import AttractionModal from "../itinerary/attraction/modal/AttractionModal";


const Attraction = (props) => {
    const dispatch = useDispatch();
    const attractionId = props.attraction.id;

    let priceLevel = '$'.repeat(props.attraction.priceRange + 1);
    let imageComponent;

    if (props.attraction.image.height > props.attraction.image.width) {
        imageComponent = <Image src={props.attraction.image.url} rounded width={100}/>;
    } else {
        imageComponent = <Image src={props.attraction.image.url} rounded height={100}/>;
    }

    const onRemoveHandler = () => {
        dispatch(itineraryActions.remove(attractionId));
    }

    return (
        <>
            <Card style={{marginBottom: 0, height: props.attraction.height}}>
                <Card.Body>
                    <Row>
                        <Col md={{span: 1, offset: 0}} xs={{span: 3, offset: 0}}>
                            <Row>
                                <h5>{props.attraction.calculatedStartTime}</h5>
                            </Row>
                            <Row>
                                <h5>{props.attraction.calculatedEndTime}</h5>
                            </Row>
                        </Col>
                        <Col md={{span: 11, offset: 0}} xs={{span: 9, offset: 0}}>
                            <Card.Title>
                                <Row>
                                    <Col md={{span: 6, offset: 0}} xs={{span: 12, offset: 0}}>
                                        <h1>{props.attraction.isRecommended && <RecommendedIcon/>}{props.attraction.name}</h1>
                                    </Col>
                                    {props.attraction.showRemove !== false &&
                                    <Col md={{span: 6, offset: 0}} xs={{span: 12, offset: 0}}>
                                        <Button variant="secondary" onClick={onRemoveHandler}>Remove</Button>{' '}
                                    </Col>}
                                </Row>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><h4>{props.attraction.type}</h4></Card.Subtitle>
                            <Card.Text>
                                <div>
                                    <Row>
                                        <Col md={{span: 6, offset: 0}} xs={{span: 6, offset: 0}}>
                                            <Row><StarRating value={props.attraction.rating}/></Row>
                                            <Row><h4>Raters No. </h4></Row>
                                            <Row><span
                                                style={{color: 'grey'}}><h5>{props.attraction.userTotalRating}</h5></span></Row>
                                            <Row><h4>Price Range </h4></Row>
                                            <Row><h5 style={{color: 'green'}}>{priceLevel}</h5></Row>
                                            <Row><h4>Address</h4></Row>
                                            <Row><h6>{props.attraction.address}</h6></Row>
                                            <Row><h4>Phone No.</h4></Row>
                                            <Row><h6>{props.attraction.phoneNumber}</h6></Row>
                                            {props.attraction.website && <Fragment><Row><h4>Website</h4></Row>
                                                <Row><a href={props.attraction.website}>{props.attraction.website}</a></Row></Fragment>}
                                        </Col>
                                        <Col md={{span: 6, offset: 0}} xs={{span: 6, offset: 0}}>
                                            {imageComponent}
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        {props.attraction.closedTemporarily && <b style={{color: 'red'}}>Temporarily closed</b>}
                        {!props.attraction.closedTemporarily && <b style={{color: 'green'}}>Operational</b>}
                    </small>

                    {!props.attraction.closedTemporarily && <span style={{paddingLeft: 10}}>
                <CollapsibleDiv buttonName='Opening Hours'>
                    <OpenHours hours={props.attraction.openingHoursText}/>
                </CollapsibleDiv>
            </span>}
                </Card.Footer>
            </Card>
        </>
    )
}

export default Attraction;
