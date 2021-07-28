import React from 'react';
import {useDispatch} from "react-redux";

import {Card, Image, Col, Row, Button} from 'react-bootstrap';
import StarRating from "../utils/StarRating";
import RecommendedIcon from "./RecommendedIcon";

import {attractionActions} from "../../store/attraction";

const AttractionSmall = (props) => {
    const dispatch = useDispatch();

    let priceLevel = '$'.repeat(props.priceRange + 1);

    let imageComponent;
    if (props.image.height > props.image.width) {
        imageComponent = <Image src={props.image.url} rounded width={100}/>;
    } else {
        imageComponent = <Image src={props.image.url} rounded height={100}/>;
    }

    const attractionId = props.id;
    const onAddHandler = () => {
        dispatch(attractionActions.add(attractionId));
    }

    return <Card>
        <Card.Body>
            <Row>
                <Col>
                    <Card.Title>
                        <Row>
                            <Col md={{span: 2, offset: 0}} xs={{span: 6, offset: 0}}>
                                <h3>
                                    {props.isRecommended && <RecommendedIcon />}
                                    {props.name}</h3>
                            </Col>
                            <Col md={{span: 2, offset: 0}} xs={{span: 12, offset: 0}}>
                                <Button onClick={onAddHandler} variant="success">Add</Button>{' '}
                                <Button variant="info">Info</Button>{' '}
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Text>
                        <div>
                            <Row>
                                <Col md={{span: 2, offset: 0}} xs={{span: 6, offset: 0}}>
                                    <Row><StarRating value={props.rating}/></Row>
                                    <Row><h5>Raters No. - <span style={{color: 'grey'}}>{props.userTotalRating}</span>
                                    </h5></Row>
                                    <Row><h5>Price Range - <span style={{color: 'green'}}>{priceLevel}</span></h5></Row>
                                    <Row>{props.closedTemporarily && <b style={{color: 'red'}}>Temporarily closed</b>}
                                        {!props.closedTemporarily && <b style={{color: 'green'}}>Operational</b>}</Row>
                                </Col>
                                {props.showImage && <Col md={{span: 10, offset: 0}} xs={{span: 6, offset: 0}}>
                                    {imageComponent}
                                </Col>}
                            </Row>
                        </div>
                    </Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>
}

export default AttractionSmall;