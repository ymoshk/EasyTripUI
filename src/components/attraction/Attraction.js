import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {Card, Image, Col, Row, Button} from 'react-bootstrap';
import CollapsibleDiv from "../utils/CollapsibleDiv";
import OpenHours from "./OpenHours";
import StarRating from "../utils/StarRating";
import RecommendedIcon from "./RecommendedIcon";

import {attractionActions} from "../../store/attraction";
import ONE_HOUR_HEIGHT from "../constants";

const Attraction = (props) => {

    const extractTime = () => {
        let startTime = new Date("01-01-2030 " + props.startTime + ":00");
        let endTime = new Date("01-01-2030 " + props.endTime + ":00");

        return (endTime - startTime) / (1000 * 60 * 60);
    }

    const getHeight = () => {
        if (props.calcHeight) {
            return (ONE_HOUR_HEIGHT * extractTime()).toString() + "vh"
        } else {
            return "auto"
        }
    }

    const dispatch = useDispatch();

    let priceLevel = '$'.repeat(props.priceRange + 1);

    let imageComponent;
    if (props.image.height > props.image.width) {
        imageComponent = <Image src={props.image.url} rounded width={100}/>;
    } else {
        imageComponent = <Image src={props.image.url} rounded height={100}/>;
    }

    const attractionId = props.id;
    const onRemoveHandler = () => {
        dispatch(attractionActions.remove(attractionId));
    }

    const [change, setChange] = useState(0);


    return <Card onMouseDown={() => props.onRender(setChange)} style={{marginBottom: 0, height: getHeight()}}>
        <Card.Body>
            <Row>
                <Col md={{span: 1, offset: 0}} xs={{span: 3, offset: 0}}>
                    <Row>
                        {/*<h5>{props.startTime}</h5>*/}
                        <h5>{change}</h5>
                    </Row>
                    <Row>
                        <h5>{props.endTime}</h5>
                    </Row>
                </Col>
                <Col md={{span: 11, offset: 0}} xs={{span: 9, offset: 0}}>
                    <Card.Title>
                        <Row>
                            <Col md={{span: 6, offset: 0}} xs={{span: 12, offset: 0}}>
                                <h1>{props.isRecommended && <RecommendedIcon/>}{props.name}</h1>
                            </Col>
                            <Col md={{span: 6, offset: 0}} xs={{span: 12, offset: 0}}>
                                <Button variant="secondary" onClick={onRemoveHandler}>Remove</Button>{' '}
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><h4>{props.type}</h4></Card.Subtitle>
                    <Card.Text>
                        <div>
                            <Row>
                                <Col md={{span: 6, offset: 0}} xs={{span: 6, offset: 0}}>
                                    <Row><StarRating value={props.rating}/></Row>
                                    <Row><h4>Raters No. </h4></Row>
                                    <Row><span style={{color: 'grey'}}><h5>{props.userTotalRating}</h5></span></Row>
                                    <Row><h4>Price Range </h4></Row>
                                    <Row><h5 style={{color: 'green'}}>{priceLevel}</h5></Row>
                                    <Row><h4>Address</h4></Row>
                                    <Row><h6>{props.address}</h6></Row>
                                    <Row><h4>Phone No.</h4></Row>
                                    <Row><h6>{props.phoneNumber}</h6></Row>
                                    {props.website && <Fragment><Row><h4>Webiste</h4></Row>
                                        <Row><a href={props.website}>{props.website}</a></Row></Fragment>}
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
                {props.closedTemporarily && <b style={{color: 'red'}}>Temporarily closed</b>}
                {!props.closedTemporarily && <b style={{color: 'green'}}>Operational</b>}
            </small>

            {!props.closedTemporarily && <span style={{paddingLeft: 10}}>
                <CollapsibleDiv buttonName='Opening Hours'>
                    <OpenHours hours={props.hours}/>
                </CollapsibleDiv>
            </span>}
        </Card.Footer>
    </Card>
}

export default Attraction;
