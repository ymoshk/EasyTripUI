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

    function createLine(lineOfTags) {
        let line = "";
        if (!props.imageTag) {
            line = lineOfTags.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={i++} text={tag.name}/>
                </div>)
        } else {
            line = lineOfTags.map((tag) =>
                    <div style={{marginRight: 10}}>
                        <SingleTag onChecked={SingleTagChecked} id={i++} src={tag.src}/>
                    </div>)
        }

        return line;
    }

    const createList = () => {
        let result = "";
        let lineOfTags = [];
        const numberOfTags = tagsListStatus.length;
        if(tagsListStatus.length % 4 === 0){
            for(let i = 0; i++ ; i < numberOfTags/4){
                lineOfTags = tagsListStatus.slice(i*4, i*4+3);
                result += <ButtonGroup>;
                result += createLine(lineOfTags);
                result+= </ButtonGroup>;
            }
        }

        return result;
    }

    return (
        <div className={styles.center}>
            {createList()}
        </div>
    );
};

export default TagsList;
