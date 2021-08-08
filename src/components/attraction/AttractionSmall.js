import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Card, Image, Col, Row, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import StarRating from "../utils/StarRating";
import RecommendedIcon from "./RecommendedIcon";

import {itineraryActions} from "../../store/itinerary-slice";
import {CirclePlus, InfoSquare} from "tabler-icons-react";
import AttractionModal from "../itinerary/attraction/modal/AttractionModal";

const AttractionSmall = (props) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    let priceLevel = '$'.repeat(props.attraction.priceLevel + 1);

    let imageComponent;
    if (props.attraction.image.height > props.attraction.image.width) {
        imageComponent = <Image src={props.attraction.image.url} rounded width={100}/>;
    } else {
        imageComponent = <Image src={props.attraction.image.url} rounded height={100}/>;
    }

    const onAddHandler = () => {
        dispatch(itineraryActions.addAttraction({
            attraction: {
                attraction: props.attraction,
                type: "ATTRACTION"
            },
            duration: props.duration
        }));
    }

    return (
        <>
            <AttractionModal onClose={() => setShowModal(false)} show={showModal} attraction={props.attraction}/>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>
                                <Row>
                                    <Col md={{span: 8, offset: 0}} xs={{span: 8, offset: 0}}>
                                        <h3>
                                            {props.attraction.isRecommended && <RecommendedIcon/>}
                                            {props.attraction.name}</h3>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <OverlayTrigger
                                            key={'infoToolTip'}
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={'tooltip-info'}>
                                                    Add Attraction To Your Itinerary
                                                </Tooltip>
                                            }>
                                            <Button onClick={onAddHandler}
                                                    style={{backgroundColor: "transparent", border: "none"}}
                                                    size={"sm"}>
                                                <CirclePlus color={"black"} strokeWidth={2}/>
                                            </Button>
                                        </OverlayTrigger>
                                    </Col>
                                    <Col xs={2} md={2}>
                                        <OverlayTrigger
                                            key={'infoToolTip'}
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={'tooltip-info'}>
                                                    More Info
                                                </Tooltip>
                                            }>
                                            <Button onClick={() => setShowModal(true)}
                                                    style={{backgroundColor: "transparent", border: "none"}}
                                                    size={"sm"}>
                                                <InfoSquare color={"black"} strokeWidth={2}/>
                                            </Button>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </Card.Title>
                        </Col>
                    </Row>
                    <Card.Text>
                        <Row>
                            <Col md={{span: 6, offset: 0}} xs={{span: 6, offset: 0}}>
                                <Row><StarRating value={props.attraction.rating}/></Row>
                                <Row><h5>Raters No. - <span
                                    style={{color: 'grey'}}>{props.attraction.userTotalRating}</span>
                                </h5></Row>
                                <Row><h5>Price Range - <span style={{color: 'green'}}>{priceLevel}</span></h5>
                                </Row>
                                <Row>{props.attraction.closedTemporarily &&
                                <b style={{color: 'red'}}>Temporarily closed</b>}
                                    {!props.attraction.closedTemporarily &&
                                    <b style={{color: 'green'}}>Operational</b>}</Row>
                            </Col>
                            {props.attraction.showImage && <Col md={{span: 6, offset: 0}} xs={{span: 6, offset: 0}}>
                                {imageComponent}
                            </Col>}
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default AttractionSmall;
