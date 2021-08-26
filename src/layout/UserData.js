import React from 'react';
import {Col, NavDropdown, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import styles from "./UserData.module.css"
import {logout} from "../store/auth-actions";

const UserData = () => {
    const loggedInUserData = useSelector(state => state.authData.auth);

    const getUserName = () => {
        if (loggedInUserData !== undefined && loggedInUserData.user !== undefined ) {
            return loggedInUserData.user.name;
        }
    }

    const getNameAndAvatar = () => {
        return (
            <Row style={{paddingTop: 20, paddingBottom: -20, paddingRight: 20, textAlign: "center"}}>
                <Col>
                    <Row>
                        <Col>
                            <p>Hello {getUserName()}!</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    const getMenu = () => {
        if (loggedInUserData !== undefined && loggedInUserData.type === "GUEST") {
            return (
                <>
                    <NavDropdown.Item href="login">Login</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="registration">Registration</NavDropdown.Item>
                </>
            )
        } else {
            return (
                <>
                    <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item><span onClick={() => logout()}>Log out</span></NavDropdown.Item>
                </>
            )
        }
    }

    return (
        <div style={{color: "black", paddingRight: 40}}>
            <NavDropdown
                id="nav-dropdown-dark-example"
                title={getNameAndAvatar()}
                menuVariant="secondary"
                variant="secondary"
                className={styles.userMenuStyle}
            >
                {getMenu()}
            </NavDropdown>
        </div>
    )
};

export default UserData;
