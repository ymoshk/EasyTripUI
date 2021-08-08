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
                        attraction={props.attraction}
                        showRemove={false}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onClose} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}


export default AttractionModal;
