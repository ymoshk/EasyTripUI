import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import styles from './SingleTag.module.css'
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const SingleTag = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const title = props.title;
    const onChecked = props.onChecked;
    const id = props.id;
    const isCheckedColor = props.isCheckedColor === undefined ? "primary" : props.isCheckedColor;
    const isNotCheckedColor = props.isNotCheckedColor === undefined ? "outline-primary" : props.isNotCheckedColor;

    function onClickEventHandler() {
        onChecked(id);
        setIsChecked(!isChecked);
    }

    const getContent = () => {
        let result = "";
        if (props.src !== undefined) {
            result = <img className={styles.img} src={props.src} width={100} height={100} alt={"None"}/>
        } else if (props.text !== undefined) {
            result = <span>{props.text}</span>
        }else if(props.innerComponent !== undefined){
            result = props.innerComponent;
        }

        return result;
    }

    const renderTooltip = (
        <Tooltip>{props.name}</Tooltip>
    );

    return (
            // <Button
            //     size="lg"
            //     type="checkbox"
            //     variant={isChecked ? isCheckedColor : isNotCheckedColor}
            //     onClick={onClickEventHandler}>
            //     {getContent()}
            // </Button>

    <OverlayTrigger placement="top" overlay={renderTooltip}>
        <Button
            size="lg"
            type="checkbox"
            variant={isChecked ? isCheckedColor : isNotCheckedColor}
            onClick={onClickEventHandler}>{getContent()}
        </Button>
    </OverlayTrigger>
    );
};

export default SingleTag;
