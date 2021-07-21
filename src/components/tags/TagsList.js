import React from 'react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SingleTag from "./SingleTag";

const TagsList = (props) => {
    const tagsList = props.tagsList;

    const tagsListStatus = [];
    tagsList.forEach(tag => tagsListStatus.push({tag: tag, status: false}));

    let i = 0;

    function SingleTagChecked(id) {
        tagsListStatus[id].status = !tagsListStatus[id].status;
        console.log(tagsListStatus);
    }

    return (
        <ButtonGroup>
            {tagsList.map((tag) =>
                <div style={{marginRight: 10}}>
                    <SingleTag onChecked={SingleTagChecked} id={i++} title={tag}/>
                </div>)}
        </ButtonGroup>
    );
};

export default TagsList;