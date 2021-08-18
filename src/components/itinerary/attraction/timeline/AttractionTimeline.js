import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import StarRating from "../StarRating";
import RecommendedIcon from "../RecommendedIcon";


const AttractionTimeline = (props) => {
    let priceLevel = '$'.repeat(props.attraction.priceLevel + 1);

    const getName = () => {
        if (props.attraction.website !== undefined && props.attraction.website !== "") {
            return <a style={{width: "auto", color: "black"}} target={"_blank"} href={props.attraction.website}>
                <h3>{props.attraction.isRecommended && <RecommendedIcon/>} {props.attraction.name}</h3>
            </a>
        } else {
            return <h3>{props.attraction.isRecommended && <RecommendedIcon/>} {props.attraction.name}</h3>
        }
    }

    return (
        <Row>
            <Row>
                <Col md={7}>
                    <Row>
                        {getName()}
                    </Row>
                    <Row>
                        <Card.Subtitle className="mb-2 text-muted">
                            <h4>{props.attraction.type}</h4>
                        </Card.Subtitle>
                    </Row>
                </Col>
                <Col md={5}>
                        <Row style={{marginTop:15}}>
                            <Card.Subtitle>
                                <StarRating value={props.attraction.rating}/>
                            </Card.Subtitle>
                        </Row>
                        {/*<Row>*/}
                        {/*    <h4>Raters No. <span*/}
                        {/*        style={{fontSize: 15, color: 'grey'}}> ({props.attraction.userTotalRating})*/}
                        {/*            </span></h4>*/}
                        {/*</Row>*/}
                </Col>
            </Row>
            <Row>
                <Col md={{span: 12, offset: 0}}>
                    <Card.Subtitle>
                        <h6>
                            {props.attraction.address}
                        </h6>
                        <h6>
                            {props.attraction.internationalNumber}
                        </h6>
                    </Card.Subtitle>
                </Col>
            </Row>
        </Row>
    )
}

export default AttractionTimeline;