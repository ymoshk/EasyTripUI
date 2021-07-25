import React from "react";
import {Row, Col} from "react-bootstrap";

import AttractionList from "./attraction/AttractionList";
import MapWrapper from "./utils/MapWrapper";

const Timeline = () => {
    return <Row>
        <Col md={8} xs={12}>
            <AttractionList />
        </Col>
        <Col md={4} xs={12}>
            <MapWrapper />
        </Col>
    </Row>
}

export default Timeline;