import React from 'react';

import {Card, Image, Col, Row} from 'react-bootstrap';
import StarRating from "../utils/StarRating";

const AttractionSmall = (props) => {
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
                <Col>
                    <Card.Title><h3>{props.name}</h3></Card.Title>
                    <Card.Text>
                        <div>
                            <Row>
                                <Col md={{span: 2, offset: 0}} xs={{span: 6, offset: 0}}>
                                    <Row><StarRating value={props.rating}/></Row>
                                    {/*<Row><h5>Rating - <span style={{color: 'grey'}}>{props.rating}/5</span></h5></Row>*/}
                                    <Row><h5>Raters No. - <span style={{color: 'grey'}}>{props.userTotalRating}</span>
                                    </h5></Row>
                                    <Row><h5>Price Range - <span style={{color: 'green'}}>{priceLevel}</span></h5></Row>
                                    <Row>{props.closedTemporarily && <b style={{color: 'red'}}>Temporarily closed</b>}
                                        {!props.closedTemporarily && <b style={{color: 'green'}}>Operational</b>}</Row>
                                </Col>
                                {props.showImage && <Col md={{span: 10, offset: 0}} xs={{span: 6, offset: 0}}>
                                    {imageComponent}
                                </Col>}
                            </Row>
                        </div>
                    </Card.Text>
                </Col>
            </Row>
        </Card.Body>
    </Card>
}

export default AttractionSmall;