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

    return (
            <Button
                size="sm"
                type="checkbox"
                variant={isChecked ? "primary" : "outline-primary"}
                onClick={onClickEventHandler}
            >
                {title === undefined ? "None" : props.title}
            </Button>
    );
};

export default SingleTag;