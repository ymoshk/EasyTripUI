import React, {useEffect, useState} from 'react';
import {Card, Image, Nav, Navbar} from "react-bootstrap";
import logo from "../images/logo/logo-outline-horizontal.png"
import {Link} from "react-router-dom";


import NavBarLink from "./NavBarLink";
import UserData from "./UserData";
import {BiPlanet, GiCommercialAirplane, GiMagnifyingGlass, RiPagesLine} from "react-icons/all";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AlertContext from "../components/utils/AlertContext";
import {Button} from "tabler-react";
import useHttp from "../hooks/UseHttp";

const NewWrapper = (props) => {
    const readyItinerary = (value) => toast.success(value);
    const [itineraryToCheck, setItineraryToCheck] = useState(undefined);
    const [intervalId, setIntervalId] = useState(undefined);
    const {isLoadingStatus, statusError, sendRequest: getItineraryStatus} = useHttp();

    const getItineraryStatusForAlert = (itineraryId) => {
        getItineraryStatus({
            url: process.env.REACT_APP_SERVER_URL + "/getItineraryStatus",
            method: 'POST',
            body: {
                id: itineraryId,
            }
        }, checkStatus);
    }

    const checkStatus = (status) => {
        if (status === "COMPLETED") {
            readyItinerary("Your itinerary is ready!")
            clearInterval(intervalId);
            setItineraryToCheck(undefined);
        }
    }

    useEffect(() => {
        if (itineraryToCheck !== undefined) {
            setIntervalId(setInterval(() => {
                getItineraryStatusForAlert();
            }, 10000));
        }
    }, [itineraryToCheck])

    return (
        <AlertContext.Provider
            value={
                {
                    fetch: (id) => {
                        if (intervalId === undefined) {
                            setItineraryToCheck(id);
                        }
                    }
                }
            }>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
            />
            <div>
                <Navbar style={{paddingBottom: 0, paddingTop: 0}} bg="light" expand="lg">
                    <Navbar.Brand><Link to={'/'}><Image src={logo}/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <NavBarLink icon={<RiPagesLine size={15}/>} text={"My itineraries"} href="/myItineraries"/>
                            <NavBarLink icon={<GiCommercialAirplane size={15}/>} text={"Quick Start"} href="/questionnaire"/>
                            {window.location.pathname === "/" && <NavBarLink icon={<BiPlanet size={15}/>}
                                                                             text={"Popular destinations"}
                                                                             href="#popularDestinationsSection"/>}
                            {window.location.pathname === "/" &&
                            <NavBarLink icon={<GiMagnifyingGlass size={15}/>} text={"How it works"}
                                        href="#howItWorksSection"/>}
                        </Nav>
                        <UserData user={props.user}/>
                    </Navbar.Collapse>
                </Navbar>
                <div>
                    {props.children}
                </div>
                <Card.Footer>
                    <React.Fragment>
                        Copyright © 2021 EasyTrip All rights reserved.
                    </React.Fragment>
                </Card.Footer>
            </div>
        </AlertContext.Provider>
    );
};

export default NewWrapper;
