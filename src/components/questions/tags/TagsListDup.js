import React from 'react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SingleTag from "./SingleTag";
import styles from "./TagsList.module.css"

const TagsList = (props) => {
    const tagsListStatus = [];
    let tagsList;

    if (props.tagsList !== undefined) {
        tagsList = props.tagsList;
    } else {
        tagsList = props.srcList;
    }

    tagsList.forEach(tag => tagsListStatus.push({tag: tag, status: false}));

    let i = 0;

    function SingleTagChecked(id) {
        tagsListStatus[id].status = !tagsListStatus[id].status;
        props.updateList(tagsListStatus);
    }

    const createList = () => {
        let result = "";
        if (props.tagsList !== undefined) {
            result = tagsList.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={i++} text={tag}/>
                </div>)
        } else if (props.srcList !== undefined) {
            result = tagsList.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={i++} src={tag}/>
                </div>)
        }
        return result;
    }

    return (
        <div className={styles.center}>
            <ButtonGroup>
                {createList()}
            </ButtonGroup>
        </div>
    );
};

export default TagsList;
