import React from 'react';
import {Button, Modal} from "react-bootstrap";
import StepsCard from "./StepsCard";

const StepCardModal = () => {

    return (
        <Modal
            fullscreen={true}
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <StepsCard/>
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button onClick={() => alert("hi")}>Close</Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    );
};

export default StepCardModal;