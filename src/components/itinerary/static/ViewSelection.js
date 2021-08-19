import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./StaticItinerary.module.css";

const ViewSelection = (props) => {
    const [selected, setSelected] = useState(0);

    useEffect(() => props.onChangeViewHandlder(selected),
        [selected]);

    const getStyle = (index) => {
        return index === selected ? "primary" : "outline-primary"
    }

    return (
        <Row style={{paddingBottom: 20, paddingTop: 20}} className={styles.grayBackground}>
            <Col md={{offset: 2, span: 8}}>
                <Row>
                    <Col md={4}>
                        <div className="d-grid gap-2">
                            <Button onClick={() => setSelected(0)}
                                    variant={getStyle(0)}
                                    size="lg">Timeline View</Button>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="d-grid gap-2">
                            <Button onClick={() => setSelected(1)}
                                    variant={getStyle(1)}
                                    size="lg">Weekly View</Button>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="d-grid gap-2">
                            <Button onClick={() => setSelected(2)}
                                    variant={getStyle(2)}
                                    size="lg">Map view</Button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ViewSelection;
