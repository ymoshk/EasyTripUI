import React, {useRef, useState} from 'react';
import {Card, Col, Row, Button, Form} from "react-bootstrap";
import DailyDnd from "../components/itinerary/DailyDnd";
import DailyCheckout from "./DailyCheckout";
import {Car} from "tabler-icons-react";
import DayPicker from "../components/itinerary/dayPicker/DayPicker";
import {itineraryActions} from "../store/itinerary-slice";
import {useDispatch, useSelector} from "react-redux";
import DaysPicker from "./DaysPicker";
import {useReactToPrint} from "react-to-print";

const Checkout = (props) => {

    const MAX_DAYS = 5;
    const itinerary = props.itinerary;
    const itineraryDays = props.itinerary.itineraryDays;

    function splitItineraryDays() {
        let res = [];
        const sectionsNumber = itineraryDays.length % MAX_DAYS === 0 ?
            parseInt(daysCount / MAX_DAYS, 10) : parseInt(daysCount / MAX_DAYS, 10) + 1;

        let i;

        for (i = 0; i < sectionsNumber - 1; i++) {
            res.push(itineraryDays.slice(i * MAX_DAYS, (i + 1) * MAX_DAYS))
        }

        res.push(itineraryDays.slice(i * MAX_DAYS, itineraryDays.length));

        console.log(res)
        return res;
    }

    const splittedItineraryDays = splitItineraryDays(itinerary);
    const daysCount = itineraryDays.length;

    const [currentSection, setCurrentSection] = useState(splittedItineraryDays[0]);

    const formatDate = (dateObj) => {
        return new Date(dateObj.year, dateObj.month - 1, dateObj.day);

    }

    const datesList = itineraryDays.map(day => formatDate(day.date));

    let dayChangedHandler = (index) => {
        setCurrentSection(splittedItineraryDays[index]);
    };

    const myRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => myRef.current,
    });

    function getDateAsString(date){
        return date.day + "." + date.month + "." + date.year;
    }

    function getContent() {
        let res = [];

        for (let i = 0; i < currentSection.length; i++) {
            res.push(
                <Col>
                    <div>
                        <div style={{textAlign: "center"}}>
                            <h4>
                                {getDateAsString(currentSection[i].date)}
                            </h4>
                        </div>
                        <DailyCheckout dailyItinirary={currentSection[i]}/>
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
                    <Col/>
                    <Col md={10}>
                        <Form.Select aria-label="Default select example">
                            <option disabled>Select Section</option>
                            <option value="0">One</option>
                            <option value="1">Two</option>
                            <option value="2">Three</option>
                        </Form.Select>
                    </Col>
                    <Col/>
                </Row>
                <Row ref={myRef} style={{marginTop: "20px"}}>
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