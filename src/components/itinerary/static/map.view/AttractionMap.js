import React from 'react';
import CheckoutAttraction from "../checkout/CheckoutAttraction";
import {Card, Col, Row} from "react-bootstrap";
import {BiMap, FaMapMarker} from "react-icons/all";
import Button from "react-bootstrap/Button";
import {MapPin} from "tabler-icons-react";

const AttractionMap = (props) => {
    const attractionNode = props.attractionNode;
    const iconClickCallback = props.onIconClick;
    console.log(attractionNode);

    const getActivityStartTime = (activity) => {

        let res = "";

        if(activity.transportation !== undefined) {
            let startTimeAsDate = Date.parse('December 17, 1995 ' + activity.startTime + ":00");
            let activityRealTime = new Date(startTimeAsDate + activity.transportation.data[activity.transportation.type] * 60 * 1000);

            res += (activityRealTime.getHours() + 1) < 10 ? "0" + activityRealTime.getHours() : activityRealTime.getHours();
            res += ":";
            res += (activityRealTime.getMinutes() + 1) < 10 ? "0" + activityRealTime.getMinutes() : activityRealTime.getMinutes();
        }
        else {
            res = activity.startTime;
        }


        return res;
    }

    return (
        <Card style={{height: "20vh", padding: 0, margin: 0}}>
            <Card.Body className={"text-center"}>
                <Row>
                    <Col md={3}>
                        <Row>
                            <h6>{getActivityStartTime(attractionNode)}</h6>
                        </Row>
                        <Row>
                            <h6>{attractionNode.endTime}</h6>
                        </Row>
                    </Col>
                    <Col>
                        <h4 style={{textAlign: "center"}}>
                            {attractionNode.attraction.name}
                        </h4>
                    </Col>
                    <Col>
                        <span style={{cursor: "pointer", color: "#ea4335"}}
                              onClick={() => iconClickCallback(attractionNode.attraction.lat, attractionNode.attraction.lng)}>
                            <FaMapMarker/>
                        </span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default AttractionMap;