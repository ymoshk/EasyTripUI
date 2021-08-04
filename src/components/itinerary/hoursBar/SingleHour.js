import React from 'react';
import {Col, Row} from "react-bootstrap";
import styles from "./SingleHour.module.css"

const SingleHour = (props) => {
    return (
        <Row style={{marginLeft: 0, marginRight: 0}}>
            <Col xs={{span: 2}} md={{span: 1}}>
                <div style={{textAlign: "center", height: "100%"}}>
                    <label>{props.hour}</label>
                </div>
            </Col>
            <Col xs={8} md={11}>
                <hr className={styles.myHr}/>
            </Col>
            {/*<Col xs={2} md={1}>*/}
            {/*    <div style={{textAlign: "center", height: "100%"}}>*/}
            {/*        <label>{props.hour}</label>*/}
            {/*    </div>*/}
            {/*</Col>*/}
        </Row>
    );
};

export default SingleHour;
