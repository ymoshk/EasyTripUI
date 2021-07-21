import React from 'react';
import SingleTag from "../components/tags/SingleTag";
import TagsList from "../components/tags/TagsList";

const SaharTest = () => {
    const tags = ["First", "Second", "Third"];
    return (
        <div>
            <TagsList tagsList={tags}></TagsList>
        </div>
    );
};

export default SaharTest;