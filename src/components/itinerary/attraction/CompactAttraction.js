import React, {useEffect, useState} from 'react';
import {attractionActions} from "../../../store/attraction-slice";
import {Card, Image, Col, Row, Button, Modal} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {InfoSquare, Trash} from "tabler-icons-react";
import RecommendedIcon from "../../attraction/RecommendedIcon";
import StarRating from "../../utils/StarRating";
import AttractionModal from "./modal/AttractionModal";
import ONE_HOUR_HEIGHT from "../Constants";


const CompactAttraction = (props) => {
    const dispatch = useDispatch();
    const attractionId = props.id;
    const [showModal, setShowModal] = useState(false);
    const [showImage, setShowImage] = useState(false);

    let priceLevel = '$'.repeat(props.priceRange + 1);

    useEffect(() => {
        if (extractHeight(props.height) >= ONE_HOUR_HEIGHT * 1.5) {
            setShowImage(true);
        } else {
            setShowImage(false);
        }

    }, [props.height])


    const onRemoveHandler = () => {
        dispatch(attractionActions.remove(attractionId));
    }

    const getName = () => {
        if (props.website !== undefined && props.website !== "") {
            return <a style={{width: "auto", color: "black"}} target={"_blank"} href={props.website}>
                <h3>{props.isRecommended && <RecommendedIcon/>} {props.name}</h3>
            </a>
        } else {
            return <h3>{props.isRecommended && <RecommendedIcon/>} {props.name}</h3>
        }

    }

    const extractHeight = () => {
        return Number.parseInt(props.height.replace('vm', ''));
    }

    return (
        <>
            <AttractionModal onClose={() => setShowModal(false)} show={showModal} attraction={props.attraction}/>
            <Card style={{border: "solid 2px", marginBottom: 0, height: props.height}}>
                <Card.Body>
                    <Row>
                        <Col md={11} xs={12}>
                            <Row>
                                <Col md={2}>
                                    <Row>
                                        <h6>{props.calculatedStartTime}</h6>
                                    </Row>
                                    <Row>
                                        <h6>{props.calculatedEndTime}</h6>
                                    </Row>
                                </Col>
                                <Col md={6}>
                                    <Row>
                                        {getName()}
                                    </Row>
                                    <Row>
                                        <Col md={{span: 4, offset: 1}}>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <h4>{props.type}</h4>
                                            </Card.Subtitle>
                                        </Col>
                                        <Col style={{padding: 0}} md={5}>
                                            <Row>
                                                <Card.Subtitle>
                                                    <StarRating value={props.rating}/>
                                                </Card.Subtitle>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>

                                    <Row>
                                        <h4>Raters No. <span
                                            style={{fontSize: 15, color: 'grey'}}>{props.userTotalRating}
                                    </span></h4>
                                    </Row>
                                    <Row>
                                        <h4>Price Range <span style={{color: 'green'}}>{priceLevel}</span></h4>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1} md={1}>
                            <Row>
                                <Button onClick={() => setShowModal(true)}
                                        style={{backgroundColor: "transparent", border: "none"}} size={"sm"}>
                                    <InfoSquare color={"black"}
                                                strokeWidth={2}/>
                                </Button>
                            </Row>
                            <Row style={{marginTop: 10}}>
                                <Button onClick={onRemoveHandler}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                        size={"sm"}>
                                    <Trash color={"black"} strokeWidth={2}/>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card.Subtitle>
                                <h6>{props.address} | {props.phoneNumber}</h6>
                            </Card.Subtitle>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: "center"}}>
                            {showImage && <Image style={{
                                width: "auto", height: (ONE_HOUR_HEIGHT).toString() + "vh",
                                maxHeight: "50vh"
                            }}
                                                 src={props.image.url}/>}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default CompactAttraction;
