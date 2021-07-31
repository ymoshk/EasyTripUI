import React from 'react';
import {Row, Col} from "react-bootstrap";

const OpenHours = (props) => {
    const hours = JSON.parse(props.hours);
    console.log(props.hours);
    console.log(props.hours.monday);

    return <React.Fragment>
        <Row>
            {hours.sunday}
        </Row>
        <Row>
            {hours.monday}
        </Row>
        <Row>
            {hours.tuesday}
        </Row>
        <Row>
            {hours.wednesday}
        </Row>
        <Row>
            {hours.thursday}
        </Row>
        <Row>
            {hours.friday}
        </Row>
        <Row>
            {hours.saturday}
        </Row>
    </React.Fragment>
}

export default OpenHours;