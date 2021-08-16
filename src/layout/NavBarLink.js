import React from 'react';
import {Nav} from "react-bootstrap";

const NavBarLink = (props) => {
    return (
        <Nav.Link href={props.href}>{props.icon}<span style={{marginLeft: 5}}>{props.text}</span></Nav.Link>
    );
};

export default NavBarLink;
