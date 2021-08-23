import React, {useEffect, useRef, useState} from 'react';
import {Card, Col, Row, Button, Form} from "react-bootstrap";
import DailyDnd from "../components/itinerary/DailyDnd";
import DailyCheckout from "./DailyCheckout";
import {ArrowNarrowLeft, ArrowNarrowRight, Car} from "tabler-icons-react";
import DayPicker from "../components/itinerary/dayPicker/DayPicker";
import {itineraryActions} from "../store/itinerary-slice";
import {useDispatch, useSelector} from "react-redux";
import DaysPicker from "./DaysPicker";
import {useReactToPrint} from "react-to-print";
import {GrLinkNext} from "react-icons/all";
import {offset} from "dom-helpers";

const Checkout = (props) => {

    const MAX_DAYS = 4;
    const itinerary = props.itinerary;
    const itineraryDays = props.itinerary.itineraryDays;
    const daysCount = itineraryDays.length;
    const sectionsNumber = itineraryDays.length % MAX_DAYS === 0 ?
        parseInt(daysCount / MAX_DAYS, 10) : parseInt(daysCount / MAX_DAYS, 10) + 1;

    function splitItineraryDays() {
        let res = [];
        let i;

        for (i = 0; i < sectionsNumber - 1; i++) {
            res.push(itineraryDays.slice(i * MAX_DAYS, (i + 1) * MAX_DAYS))
        }

        res.push(itineraryDays.slice(i * MAX_DAYS, itineraryDays.length));

        return res;
    }

    const splittedItineraryDays = splitItineraryDays(itinerary);


    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState(splittedItineraryDays[0]);

    useEffect(() => {
            setCurrentSectionIndex(splittedItineraryDays.findIndex(section => section[0].date === currentSection[0].date))
        }
        , [currentSection])

    const myRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => myRef.current,
    });

    function getDateAsString(date) {
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


    function nextBtnEventHandler() {
        setCurrentSection(splittedItineraryDays[currentSectionIndex + 1]);
    }

    function getNextBtn() {
        let res = [];

        if (currentSectionIndex !== (sectionsNumber - 1)) {
            res.push(
                <Button size={"lg"} onClick={nextBtnEventHandler}>
                    <ArrowNarrowRight
                        size={30}
                        strokeWidth={1.5}
                        color={'#FFFFFF'}
                    />
                </Button>);
        }

        return res;
    }

    function prevBtnEventHandler() {
        setCurrentSection(splittedItineraryDays[currentSectionIndex - 1]);
    }

    function getPrevBtn() {
        let res = [];

        if (currentSectionIndex !== 0) {
            res.push(
                <Button size={"lg"} onClick={prevBtnEventHandler}>
                    <ArrowNarrowLeft
                        size={30}
                        strokeWidth={1.5}
                        color={'#FFFFFF'}
                    />
                </Button>);
        }

        return res;
    }

    return (
        <div style={{padding:"10px"}}>
            <Row>
                <Col>
                    {getPrevBtn()}
                </Col>
                <Col md={10}/>
                <Col style={{textAlign:"right"}}>
                    {getNextBtn()}
                </Col>
            </Row>
            <Row ref={myRef} style={{marginTop: "20px"}}>
                {getContent()}
            </Row>
            <Row>
                <Col md={2}>
                    <Button onClick={handlePrint} variant={"primary"}>Export to PDF</Button>
                </Col>
                <Col/>
                <Col/>
            </Row>
        </div>
    );
};

export default Checkout;