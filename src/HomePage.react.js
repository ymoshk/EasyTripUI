// @flow

import * as React from "react";

import SiteWrapper from "./SiteWrapper.react";
import {Row, Col, Container} from "react-bootstrap";
import SearchDestination from "./components/questions/destination/SearchDestination";

function Home() {
    return (
        <SiteWrapper>
            <Container fluid style={{
                backgroundImage: `url("https://eskipaper.com/images/beach-sunset-landscape-1.jpg")`,
                backgroundRepeat: "no-repeat", width: "100%", height: "100vh"
            }}>
                <Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md={8} xs={12}>
                        <SearchDestination/>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </SiteWrapper>
    );
}

export default Home;
