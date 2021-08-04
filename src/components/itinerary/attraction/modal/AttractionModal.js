import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Attraction from "../../../attraction/Attraction";
import AttractionContainer from "../AttractionContainer";
import "./AttractionModal.css"

const AttractionModal = (props) => {

    return (
        <Modal id={"attractionModal"} size={"lg"} style={{margin: 0}} show={props.show} onHide={props.onClose}>
            <Modal.Dialog size={"lg"} fullscreen={true}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <Attraction
                        showRemove={false}
                        name={props.attraction.name}
                        type={props.attraction.type}
                        image={props.attraction.image}
                        rating={props.attraction.rating}
                        userTotalRating={props.attraction.userTotalRating}
                        closedTemporarily={props.attraction.closedTemporarily}
                        priceRange={props.attraction.priceRange}
                        startTime={props.attraction.startTime}
                        endTime={props.attraction.endTime}
                        hours={props.attraction.hours}
                        address={props.attraction.address}
                        isRecommended={props.attraction.isRecommended}
                        phoneNumber={props.attraction.phoneNumber}
                        website={props.attraction.website}
                        id={props.attraction.id}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onClose} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}


export default AttractionModal;
