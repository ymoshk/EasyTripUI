import React from "react";
import {Row, Col} from "react-bootstrap";

import AttractionList from "./itinerary/attraction/menu/AttractionList";
import MapWrapper from "./utils/MapWrapper";

const Timeline = () => {
    return <Row>
        <Col md={6} xs={12}>
            <AttractionList />
        </Col>
        <Col md={6} xs={12}>
            <MapWrapper />
        </Col>
    </Row>
}

export default Timeline;
