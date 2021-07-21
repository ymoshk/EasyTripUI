import React from 'react';

const DummyContent = (props) => {

    const markAsValid = () => {
        console.log(props.index);
        props.setValidation(props.index, true);
    }

    const markInvalid = () => {
        props.setValidation(props.index, false);
    }

    return (
        <div>
            <h3> just a test {props.text}</h3>
            <button onClick={markAsValid}/>
        </div>
    );
}

export default DummyContent;
