import React from 'react';
import {Button, Col, ProgressBar, Row} from "react-bootstrap";

const Footer = (props) => {
    return (
        <Row>
            <Col xs={12} md={8}>
                <ProgressBar now={50}/>
            </Col>
            <Col xs={12} md={2}>
                <Button variant="warning">Back</Button>{' '}
            </Col>
        </Row>
    );
};

export default Footer;
