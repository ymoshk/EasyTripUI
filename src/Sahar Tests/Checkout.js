import React, {useRef} from 'react';
import {Card, Col, Row, Button} from "react-bootstrap";
import DailyDnd from "../components/itinerary/DailyDnd";
import DailyCheckout from "./DailyCheckout";
import {Car} from "tabler-icons-react";
import DayPicker from "../components/itinerary/dayPicker/DayPicker";
import {itineraryActions} from "../store/itinerary-slice";
import {useDispatch, useSelector} from "react-redux";
import DaysPicker from "./DaysPicker";
import {useReactToPrint} from "react-to-print";

const Checkout = (props) => {

    const itineraryId = props.itineraryId;
    const itinerary = [];
    //TODO - get the itinerary from server

    const MAX_DAYS = 5;
    const myRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => myRef.current,
    });

    const dayChangedHandler = (index) => {
        // dispatch(itineraryActions.updateDay(index));
        alert("day changed");
    }

    function getContent() {
        let res = [];
        for (let i = 0; i < MAX_DAYS; i++) {
            res.push(
                <Col>
                    <div>
                        <div style={{textAlign: "center"}}>
                            <h4>
                                Day {i+1}
                            </h4>
                        </div>
                        <DailyCheckout dailyItinirary={itinerary[i]}/>
                    </div>
                </Col>
            )
        }

        return res;
    }


    return (
        <Card>
            <Card.Header as={"h3"}>
                Checkout
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <DaysPicker onDayChange={dayChangedHandler}/>
                    </Col>
                </Row>
                <Row ref={myRef}>
                    {getContent()}
                </Row>
            </Card.Body>
            <Card.Footer>
                <Button onClick={handlePrint} variant={"primary"}>Export to PDF</Button>
            </Card.Footer>

        </Card>
    );
};

export default Checkout;