import React from 'react';
import {Card, Image, Nav, Navbar} from "react-bootstrap";
import logo from "../images/logo/logo-outline-horizontal.png"
import {Link} from "react-router-dom";
import {House} from 'react-bootstrap-icons';

import NavBarLink from "./NavBarLink";
import {useSelector} from "react-redux";
import UserData from "./UserData";

const NewWrapper = (props) => {

    return (
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
                        <NavBarLink icon={<House size={15}/>} text={"Home"} href="/"/>
                        <NavBarLink icon={<House size={15}/>} text={"Home"} href="/"/>
                    </Nav>
                    <UserData/>
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
    );
};

export default NewWrapper;
