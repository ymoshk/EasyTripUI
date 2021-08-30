import React, {useState} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Segment from "./Segment";
import Button from "react-bootstrap/Button";
import {AiOutlineArrowRight} from "react-icons/all";
import {useDispatch} from "react-redux";
import {questionnaireActions} from "../../store/questionnaire-slice";

const Flight = (props) => {
    const dispatch = useDispatch();
    const [flightIsSelected, setFlightIsSelected] = useState(props.selected);

    const onSelectFlightHandler = () => {
        dispatch(questionnaireActions.setCurrentData({
            flight: props.flight
        }))
        setFlightIsSelected(true);
        props.setFlight(props.flight);
    }

    const onCancelFlightHandler = () => {
        dispatch(questionnaireActions.setCurrentData({
            flight: ""
        }))
        setFlightIsSelected(false);
        props.removeFlight();
    }

    return <Row>
        <Card border="secondary">
            <Card.Body>
                <Card.Text>
                    <Row>
                        <Col md={{span: 10}}>
                            <Segment segment={props.flight.Outbound}/>
                            <br/>
                            <Segment segment={props.flight.Return}/>
                        </Col>
                        <Col md={{span: 2}} style={{marginTop: 70}}>
                            <h3>{props.flight.price}</h3>
                            {!flightIsSelected && <Button onClick={onSelectFlightHandler} style={{background: 'green'}}>
                                Select<AiOutlineArrowRight style={{marginLeft: '5'}}/>
                            </Button>}
                            {flightIsSelected && <Button onClick={onCancelFlightHandler} style={{background: 'red'}}>
                                Cancel
                            </Button>}
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    </Row>
}

export default Flight;