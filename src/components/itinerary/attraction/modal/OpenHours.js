import React from 'react';
import {Row} from "react-bootstrap";

const OpenHours = (props) => {
    const hours = JSON.parse(props.hours);
    console.log(hours);

    return <div style={{paddingLeft: 15, paddingTop: 10}}>
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
    </div>
}

export default OpenHours;
