// @flow

import * as React from "react";

import SiteWrapper from "./SiteWrapper.react";
import {Card, Col, Container, Row} from "react-bootstrap";
import SearchDestination from "./components/questions/destination/SearchDestination";
import backGround from "./images/siteBackground/maldivs.jpg"
import StepCardModal from "./components/questions/StepCardModal";
import {Button} from "tabler-react";
import {useState} from "react";
import HomePageContainer from "./components/HomePage/HomePageContainer";

function Home() {
    const [showStepCard, setShowStepCard] = useState(false);

    return (
        <SiteWrapper>
            <HomePageContainer/>
        </SiteWrapper>
    );
}

export default Home;
