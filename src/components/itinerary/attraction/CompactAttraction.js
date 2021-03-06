import React, {useContext, useEffect, useState} from 'react';
import {itineraryActions} from "../../../store/itinerary-slice";
import {Button, Card, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {Clock, InfoSquare, Trash} from "tabler-icons-react";
import RecommendedIcon from "./RecommendedIcon";
import StarRating from "./StarRating";
import AttractionModal from "./modal/AttractionModal";
import ONE_HOUR_HEIGHT from "../Constants";
import useHttp from "../../../hooks/UseHttp";
import ChangeHourContext from "../ChangeHourContext";
import ChangeDurationModal from "./modal/ChangeDurationModal";
import styles from "./CompactAttraction.module.css"
import Mobility from "./special/Mobility";
import uuid from "uuid-random";
import formatDateToHours from "../../utils/helpers/DateFormatter";

const CompactAttraction = (props) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showDurationModal, setShowDurationModal] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [imageBase64, setImageBase64] = useState(null);
    const {isLoading, error, sendRequest: getImagePost} = useHttp();
    const [mobilityDuration, setMobilityDuration] = useState(0);
    const context = useContext(ChangeHourContext);


    // TODO - fix image load
    // useEffect(() => {
    //     getImage();
    // }, []);

    useEffect(() => {
        if (showDurationModal) {
            props.resetDraggedId(props.index);
            context.isDurationModalOn = true;
        }
    }, [showDurationModal])

    const getImage = () => {
        const data = {
            id: props.attraction.id
        };

        const handlePhoto = (data) => {
            setImageBase64(data.base64);
        }

        getImagePost({
            url: process.env.REACT_APP_SERVER_URL + "/getAttractionImage",
            method: "POST",
            credentials: 'include',
            body: data
        }, handlePhoto).then();
    }


    let priceLevel;
    const type = props.attraction.type;
    if (type === "Restaurant" || type === "Bar" || type === "Cafe") {
        priceLevel = '$'.repeat(props.attraction.priceLevel);
    } else {
        priceLevel = '$'.repeat(props.attraction.priceLevel + 1);
    }

    useEffect(() => {
        if (!isLoading && extractHeight(props.height) >= ONE_HOUR_HEIGHT * 1.5) {
            setShowImage(true);
        } else {
            setShowImage(false);
        }

    }, [props.height, isLoading])


    const onRemoveHandler = () => {
        dispatch(itineraryActions.removeAttraction(props.index));
    }

    const addMinutesToHour = (hour, minutesCount) => {
        const newTime = new Date("01-01-2030 " + hour + ":00");
        newTime.setTime(newTime.getTime() + minutesCount * 1000 * 60);

        return formatDateToHours(newTime);
    }

    const getName = () => {
        if (props.attraction.website !== undefined && props.attraction.website !== "") {
            return <a onMouseOver={() => {
                context.isOnButton = true
            }} onMouseLeave={() => {
                context.isOnButton = false
            }} style={{width: "auto", color: "black"}} target={"_blank"} href={props.attraction.website}>
                <h3>{props.attraction.isRecommended && <RecommendedIcon/>} {props.attraction.name}</h3>
            </a>
        } else {
            return <h3>{props.attraction.isRecommended && <RecommendedIcon/>} {props.attraction.name}</h3>
        }

    }

    const extractHeight = () => {
        return Number.parseInt(props.height.replace('vm', ''));
    }

    const onChangeDurationHandler = (change) => {
        props.updateDuration(change);
        context.isDurationModalOn = false;
    }

    return (
        <>
            <AttractionModal onClose={() => setShowModal(false)} show={showModal} imageBase64={imageBase64}
                             attraction={props.attraction}/>
            <ChangeDurationModal
                onClose={() => setShowDurationModal(false)}
                maxHours={17} show={showDurationModal}
                currentHours={Math.floor(props.duration)}
                currentMinutes={(props.duration - Math.floor(props.duration)) * 60}
                duration={props.duration}
                onChangeHandler={onChangeDurationHandler}
            />
            <Card className={props.redBackground ? styles.myCardError : styles.myCard} style={{height: props.height}}>
                <Card.Body as={"div"}
                           onMouseDown={() => {
                               context.state = "DRAG"
                           }}
                           onMouseUp={() => {
                               context.state = "NONE"
                           }}
                >
                    <Row>
                        {props.transportation && <Mobility
                            uniqueKey={uuid()}
                            changeDuration={setMobilityDuration}
                            initType={props.transportation.type}
                            transDuration={props.transportation.data}
                            sourceData={props.transportation.sourceData}
                            index={props.index}/>}
                    </Row>
                    <Row>
                        <Col md={11} xs={10}>
                            <Row>
                                <Col md={2}>
                                    <Row>
                                        <h6>{addMinutesToHour(props.calculatedStartTime, mobilityDuration)}</h6>
                                    </Row>
                                    <Row>
                                        <h6>{props.calculatedEndTime}</h6>
                                    </Row>
                                </Col>

                                <Col md={7}>
                                    <Row>
                                        {getName()}
                                    </Row>
                                    <Row>
                                        <Col md={{span: 5, offset: 0}}>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <h4>{props.attraction.type}</h4>
                                            </Card.Subtitle>
                                        </Col>
                                        <Col style={{padding: 0}} md={5}>
                                            <Row>
                                                <Card.Subtitle>
                                                    <StarRating value={props.attraction.rating}/>
                                                </Card.Subtitle>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3}>
                                    <Row>
                                        <h4>Raters No. <span
                                            style={{fontSize: 15, color: 'grey'}}>{props.attraction.userTotalRating}
                                    </span></h4>
                                    </Row>
                                    {priceLevel && <Row>
                                        <h4>Price Range <span style={{color: 'green'}}>{priceLevel}</span></h4>
                                    </Row>}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}
                             onMouseEnter={() => {
                                 context.isOnButton = true;
                             }}
                             onMouseLeave={() => {
                                 context.isOnButton = false;
                             }}
                        >
                            <Row>
                                <OverlayTrigger
                                    key={'infoToolTip'}
                                    placement={'top'}
                                    overlay={
                                        <Tooltip id={'tooltip-info'}>
                                            More Info
                                        </Tooltip>
                                    }>
                                    <Button
                                        xs={1} md={1} onClick={() => setShowModal(true)}
                                        style={{backgroundColor: "transparent", border: "none"}} size={"sm"}>
                                        <InfoSquare color={"black"}
                                                    strokeWidth={2}/>
                                    </Button>
                                </OverlayTrigger>
                            </Row>
                            <Row>
                                <OverlayTrigger
                                    key={'infoToolTip'}
                                    placement={'top'}
                                    overlay={
                                        <Tooltip id={'tooltip-info'}>
                                            Remove From Your Itinerary
                                        </Tooltip>
                                    }>
                                    <Button
                                        onClick={onRemoveHandler}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                        size={"sm"}>
                                        <Trash color={"black"} strokeWidth={2}/>
                                    </Button>
                                </OverlayTrigger>
                            </Row>
                            <Row>
                                <OverlayTrigger
                                    key={'infoToolTip'}
                                    placement={'top'}
                                    overlay={
                                        <Tooltip id={'tooltip-info'}>
                                            Change Duration
                                        </Tooltip>
                                    }>
                                    <Button
                                        onClick={() => setShowDurationModal(true)}
                                        style={{backgroundColor: "transparent", border: "none"}}
                                        size={"sm"}>
                                        <Clock color={"black"} strokeWidth={2}/>
                                    </Button>
                                </OverlayTrigger>
                            </Row>
                        </Col>
                        <Row>
                            <Col md={12}>
                                <Card.Subtitle>
                                    <h6>
                                        {props.attraction.address}
                                        {props.attraction.internationalNumber !== undefined && "|"}
                                        {props.attraction.internationalNumber}
                                    </h6>
                                </Card.Subtitle>
                            </Col>
                        </Row>
                        <Row>
                            {/*<Col style={{textAlign: "center"}}>*/}
                            {/*    {showImage && <Image style={{*/}
                            {/*        width: "auto", height: (ONE_HOUR_HEIGHT).toString() + "vh",*/}
                            {/*        maxHeight: "50vh"*/}
                            {/*    }}*/}
                            {/*                         src={`data:image/jpeg;base64,${imageBase64}`}/>}*/}
                            {/*</Col>*/}
                        </Row>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default CompactAttraction;
