import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SingleTag.module.css'
import Button from "react-bootstrap/Button";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const SingleTag = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [color, setColor] = useState("white");
    const id = props.id;

    useEffect(() => {
        if (isChecked) {
            setColor("#6c757d");
        } else {
            setColor("white");
        }
    }, [isChecked])

    const onClickEventHandler = () => {
        props.onChecked(id);
        setIsChecked(!isChecked);
    }

    const getContent = () => {
        let result = "";
        if (props.src !== undefined && props.src !== "") {
            result = <img className={styles.img} src={props.src} alt={"None"}/>
        } else if (props.text !== undefined) {
            result = <span>{props.text}</span>
        } else if (props.innerComponent !== undefined) {
            result = props.innerComponent;
        }

        return result;
    }

    const getToolTip = () => {
        return <Tooltip id={'tooltip_' + id}>
            {props.text}
        </Tooltip>
    }

    return (
        <OverlayTrigger placement="top" overlay={getToolTip()}>
            <div className="d-grid gap-2">
                <Button
                    size="lg"
                    type="checkbox"
                    style={{backgroundColor: color, borderColor: "black", color: isChecked ? "white" : "black"}}
                    onClick={onClickEventHandler}>
                    {getContent()}
                </Button>
            </div>
        </OverlayTrigger>
    );
};

export default SingleTag;
