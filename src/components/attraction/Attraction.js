import React from 'react';

import {Card, Image, Col, Row} from 'react-bootstrap';

const Attraction = (props) => {
    let priceLevel = '$'.repeat(props.priceRange + 1);

    return <Card>
        <Card.Body>
            <Row>
                <Col md={{span: 1, offset: 0}} xs={{span: 1, offset: 0}}>
                    <Row>
                        <b>{props.startTime}</b>
                    </Row>
                    <Row>
                        <b>{props.endTime}</b>
                    </Row>
                </Col>
                <Col md={{span: 11, offset: 0}} xs={{span: 10, offset: 1}}>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.type}</Card.Subtitle>
                    <Card.Text>
                        <div style={{paddingLeft: 10}}>
                            <Row>
                                <Col md={{span: 4, offset: 0}} xs={{span: 6, offset: 0}}>
                                    <Row><p><b>Rating</b> {props.rating}/5</p></Row>
                                    <Row><p><b>User total rating </b>{props.userTotalRating}</p></Row>
                                    <Row><p><b>Price Range </b><span style={{color: 'green'}}>{priceLevel}</span></p>
                                    </Row>
                                </Col>
                                <Col md={{span: 8, offset: 0}} xs={{span: 6, offset: 0}}>
                                    <Image src={props.image} rounded width={100}/>
                                </Col>
                            </Row>
                        </div>
                    </Card.Text>
                    {props.closedTemporarily && <p><b style={{color: 'red'}}>Temporarily closed</b></p>}
                    {!props.closedTemporarily && <p><b style={{color: 'green'}}>Operational</b></p>}
                </Col>
            </Row>
        </Card.Body>
    </Card>
}

export default Attraction;