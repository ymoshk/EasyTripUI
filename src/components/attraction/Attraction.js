import React from 'react';

import {Card, Image, Col, Row} from 'react-bootstrap';
import CollapsibleDiv from "../CollapsibleDiv";
import OpenHours from "./OpenHours";

const Attraction = (props) => {
    let priceLevel = '$'.repeat(props.priceRange + 1);

    let imageComponent;
    if (props.image.height > props.image.width) {
        imageComponent = <Image src={props.image.url} rounded width={100}/>;
    } else {
        imageComponent = <Image src={props.image.url} rounded height={100}/>;
    }

    return <Card>
        <Card.Body>
            <Row>
                <Col md={{span: 1, offset: 0}} xs={{span: 3, offset: 0}}>
                    <Row>
                        <b>{props.startTime}</b>
                    </Row>
                    <Row>
                        <b>{props.endTime}</b>
                    </Row>
                </Col>
                <Col md={{span: 11, offset: 0}} xs={{span: 9, offset: 0}}>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.type}</Card.Subtitle>
                    <Card.Text>
                        <div>
                            <Row>
                                <Col md={{span: 3, offset: 0}} xs={{span: 5, offset: 0}}>
                                    <Row><b>Rating</b> </Row>
                                    <Row><i>{props.rating}/5</i></Row>
                                    <Row><b>Raters No. </b></Row>
                                    <Row><i>{props.userTotalRating}</i></Row>
                                    <Row><b>Price Range </b></Row>
                                    <Row><i style={{color: 'green'}}>{priceLevel}</i></Row>

                                </Col>
                                <Col md={{span: 9, offset: 0}} xs={{span: 7, offset: 0}}>
                                    {imageComponent}
                                </Col>
                            </Row>
                        </div>
                    </Card.Text>
                </Col>
            </Row>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">
                {props.closedTemporarily && <b style={{color: 'red'}}>Temporarily closed</b>}
                {!props.closedTemporarily && <b style={{color: 'green'}}>Operational</b>}
            </small>

            {!props.closedTemporarily && <span style={{paddingLeft: 10}}>
                <CollapsibleDiv buttonName='Opening Hours'>
                    <OpenHours hours={props.hours}/>
                </CollapsibleDiv>
            </span>}
        </Card.Footer>
    </Card>
}

export default Attraction;