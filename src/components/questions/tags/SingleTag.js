import React, {useEffect, useState, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SingleTag.module.css'
import Button from "react-bootstrap/Button";
import {OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {questionnaireActions} from "../../../store/questionnaire-slice";

const SingleTag = (props) => {
    const dispatch = useDispatch();
    const myself = useSelector(state => state.questionnaireData
        .questionnaire.stages[props.stageIndex].data[props.id])

    const [isChecked, setIsChecked] = useState(myself.status);
    const [color, setColor] = useState("white");

    useEffect(() => {
        if (isChecked) {
            setColor("#6c757d");
        } else {
            setColor("white");
        }
    }, [isChecked])

    const onClickEventHandler = () => {
        dispatch(questionnaireActions.contTagsStatus(props.id));
        setIsChecked(!isChecked);
    }

    const getContent = () => {
        let result = "";
        if (myself.src !== undefined && myself.src !== "") {
            result = <Fragment>
                <Row>
                    <span><b>{myself.name}</b></span>
                </Row>
                <Row>
                    <img className={styles.img} src={myself.src} alt={"None"}/>
                </Row>
            </Fragment>
        } else if (myself.name !== undefined) {
            result = <span>{myself.name}</span>
        }

        return result;
    }

    const getToolTip = () => {
        return <Tooltip id={'tooltip_' + props.id}>
            {myself.name}
        </Tooltip>
    }

    return (
            <div className="d-grid gap-2">
                <Button
                    size="lg"
                    type="checkbox"
                    style={{backgroundColor: color, borderColor: "black", color: isChecked ? "white" : "black"}}
                    onClick={onClickEventHandler}>
                    {getContent()}
                </Button>
            </div>
    );
};

export default SingleTag;
