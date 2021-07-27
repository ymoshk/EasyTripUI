import React from 'react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SingleTag from "./SingleTag";
import styles from "./TagsList.module.css"

const TagsList = (props) => {
    const tagsListStatus = [];

    props.tagsList.forEach(tag => tagsListStatus.push({name: tag.name, id: tag.id, src: tag.src, status: false}));

    let i = 0;

    function SingleTagChecked(id) {
        tagsListStatus[id].status = !tagsListStatus[id].status;
        props.updateList(tagsListStatus);
    }

    const createList = () => {
        let result = "";
        if (!props.imageTag) {
            result = tagsListStatus.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={i++} text={tag.name}/>
                </div>)
        } else {
            result = tagsListStatus.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={i++} src={tag.src}/>
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
