import React from 'react';
import {Card, Image, Nav, Navbar} from "react-bootstrap";
import logo from "../images/logo/logo-outline-horizontal.png"
import {Link} from "react-router-dom";
import {House} from 'react-bootstrap-icons';

import NavBarLink from "./NavBarLink";

const SiteWrapperReact = (props) => {

    return (
        <div>
            <Navbar bg="light" expand="lg">
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

export default SiteWrapperReact;

//TODO delete if no needed

{/*<NavDropdown title="Link" id="navbarScrollingDropdown">*/
}
{/*    <NavDropdown.Item><Link to={'/itinerary'}>Action</Link></NavDropdown.Item>*/
}
{/*    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>*/
}
{/*    <NavDropdown.Divider/>*/
}
{/*    <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>*/
}
{/*</NavDropdown>*/
}
