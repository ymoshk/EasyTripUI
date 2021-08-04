import React from 'react';
import ReactStars from "react-stars/dist/react-stars";

//https://www.npmjs.com/package/react-stars

const StarRating = (props) => {

    return <ReactStars count={5} value={props.value} size={24} color2={'#ffd700'} edit={false}/>;
}

export default StarRating;
