import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SingleTag.module.css'
import Button from "react-bootstrap/Button";

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

    return (
        <Button
            size="lg"
            type="checkbox"
            variant={isChecked ? isCheckedColor : isNotCheckedColor}
            onClick={onClickEventHandler}>
            {getContent()}
        </Button>
    );
};

export default SingleTag;
