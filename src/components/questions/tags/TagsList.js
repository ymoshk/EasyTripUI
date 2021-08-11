import React, {useState} from 'react';
import SingleTag from "./SingleTag";
import styles from "./TagsList.module.css"
import {Col, Row} from "react-bootstrap";
import uuid from "uuid-random";

const TagsList = (props) => {
    const mapTag = (tag) => {
        return {
            name: tag.name,
            id: tag.id,
            src: tag.src,
            status: false
        }
    }

    const [tagsListStatus, setTagListStatus] = useState(props.tagsList.map(tag => mapTag(tag)));

    const SingleTagChecked = (id) => {
        tagsListStatus[id].status = !tagsListStatus[id].status;
        props.updateList(tagsListStatus);
    }

    const renderRow = (tags, offset) => {
        const mapTagsToComponents = (tags) => {
            return tags.map((tag, index) =>
                <Col style={{marginBottom: 20}} key={uuid()} md={3} xs={props.imageTag ? 12 : 6}>
                    <SingleTag onChecked={SingleTagChecked} key={index + offset} id={index + offset} src={tag.src}
                               text={tag.name}/>
                </Col>
            )
        }

        return (
            <Row key={uuid()}>
                {mapTagsToComponents(tags)}
            </Row>
        )
    }

    const renderRows = () => {
        const result = []
        let tags = tagsListStatus;
        let offset = 0;

        if (tags.length > 4) {
            while (tags.length >= 4) {
                let four = tags.slice(0, 4);
                tags = tags.slice(4);
                result.push(renderRow(four, offset));
                offset += 4;
            }
        } else {
            result.push(renderRow(tags, 0));
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
