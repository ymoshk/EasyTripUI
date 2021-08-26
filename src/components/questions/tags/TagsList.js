import React from 'react';
import SingleTag from "./SingleTag";
import styles from "./TagsList.module.css"
import {Col, Row} from "react-bootstrap";
import uuid from "uuid-random";

const NUMBER_PER_ROW = 4;

const TagsList = (props) => {
    const renderRow = (offset) => {
        const buildCols = () => {
            const result = []

            for (let i = 0; i < NUMBER_PER_ROW && (i + offset) < props.count; i++) {
                result.push(<Col style={{marginBottom: 20}} key={uuid()} md={3} xs={props.imageTag ? 12 : 6}>
                    <SingleTag stageIndex={props.stageIndex} key={i + offset} id={i + offset}/>
                </Col>)
            }

            return result;
        }

        return (
            <Row key={uuid()}>
                {buildCols()}
            </Row>
        )
    }

    const renderRows = () => {
        const result = []

        for (let i = 0; i < props.count; i += NUMBER_PER_ROW) {
            result.push(renderRow(i));
        }
        return result;
    }

    return (
        <div className={styles.center}>
            {renderRows()}
        </div>
    );
};

export default TagsList;
