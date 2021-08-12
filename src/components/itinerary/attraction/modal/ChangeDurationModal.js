import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import DurationPicker from "react-duration-picker";

const ChangeDurationModal = (props) => {
    const [duration, setDuration] = useState(props.duration);

    const onChangeDurationHandler = (obj) => {
        let newDuration = Math.max((obj.hours * 60) + obj.minutes, 45)
        setDuration(newDuration);
    }

    const onCloseHandler = () => {
        props.onChangeHandler(duration - props.currentHours * 60 - props.currentMinutes);
        props.onClose();
    }

    return (
        <Modal id={"attractionModal"} show={props.show}
               onHide={onCloseHandler}>
            <Modal.Dialog>
                <Modal.Header closeButton><h5>Choose a new duration for the activity</h5></Modal.Header>
                <Modal.Body>
                    <DurationPicker
                        onChange={onChangeDurationHandler}
                        initialDuration={{hours: props.currentHours, minutes: props.currentMinutes, seconds: 0}}
                        maxHours={props.maxHours}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCloseHandler} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
};

export default ChangeDurationModal;
