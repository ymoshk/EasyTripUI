import {Button, Collapse} from "react-bootstrap";
import React, {useState} from "react";


const CollapsibleDiv = (props) => {
    const [open, setOpen] = useState(false);

    const onClickHandler = () => {
        setOpen((prevState => !prevState));
    }

    return <React.Fragment>
        <Button
            onClick={onClickHandler}
            aria-controls="example-collapse-text"
            aria-expanded={open}
        >
            {props.buttonName}
        </Button>
        <Collapse in={open}>
            <div id="example-collapse-text">
                {props.children}
            </div>
        </Collapse>
    </React.Fragment>
}

export default CollapsibleDiv;