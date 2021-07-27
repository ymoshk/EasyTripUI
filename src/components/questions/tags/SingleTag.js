import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

const SingleTag = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const title = props.title;
    const onChecked = props.onChecked;
    const id = props.id;

    function onClickEventHandler() {
        onChecked(id);
        setIsChecked(!isChecked);
    }

    const getContent = () => {
        let result = "";
        if (props.src !== undefined) {
            result = <img src={props.src} width={100} height={100} alt={"None"}/>
        } else if (props.text !== undefined) {
            result = <span>{props.text}</span>
        }
        return result;
    }

    return (
        <Button
            size="md"
            type="checkbox"
            variant={isChecked ? "primary" : "outline-primary"}
            onClick={onClickEventHandler}>
            {getContent()}
        </Button>
    );
};

export default SingleTag;
