import React from 'react';
import StepsCard from "../components/questions/StepsCard";
import HoursBar from "../components/dnd/hoursBar/HoursBar";
import SingleHour from "../components/dnd/hoursBar/SingleHour";
import pic from "../images/EiffelTour.jpg"
import {Col, Row} from "react-bootstrap";

const YotamTest = () => {
    return (<StepsCard/>);
    // return (
        // <>
        //     <HoursBar height={100} startHour={8} count={17}/>
        //     <Row>
        //         <Col md={4}/>
        //         <Col md={8}>
        //             <img style={{zIndex: 2, position: "relative"}} width={200} src={pic}/>
        //         </Col>
        //     </Row>
        //     <Row>
        //         <Col md={4}/>
        //         <Col md={8}>
        //             <img style={{zIndex: 2, position: "relative"}} width={200} src={pic}/>
        //         </Col>
        //     </Row>
        // </>
    // )
}

export default YotamTest;
