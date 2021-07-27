import React, {useEffect, useState} from 'react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SingleTag from "./SingleTag";
import styles from "./TagsList.module.css"
import useHttp from "../../../hooks/UseHttp";


const TagsList = (props) => {

    const fetchTags = () => {
        let result;
        getTags({url: process.env.REACT_APP_SERVER_URL + '/getTripTags'}, (data) => {
            result = data
        });
        return result;
    }

    const {tagsLoading, tagsError, sendRequest: getTags} = useHttp()
    const [tags, setTags] = useState(fetchTags())
    const tagsListStatus = [];

    if (props.textTag) {
        setTags(tags.textTags);
    } else {
        setTags(tags.imgTags);
    }

    tags.forEach(tagData => tagsListStatus.push({
        id: tagData.id,
        src: tagData.imgSource,
        name: tagData.tagName,
        status: false
    }));

    let i = 0;

    function SingleTagChecked(id) {
        tagsListStatus[id].status = !tagsListStatus[id].status;
        props.updateList(tagsListStatus);
    }

    const createList = () => {
        let result = "";
        if (props.textTag) {
            result = tags.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={tag.id} text={tag.name}/>
                </div>)
        } else {
            result = tags.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={tag.id} src={tag.src}/>
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
