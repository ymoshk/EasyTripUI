import React from 'react';
import {Col, NavDropdown, Row} from "react-bootstrap";
import styles from "./UserData.module.css"
import {logout} from "../store/auth-actions";
import {useDispatch} from "react-redux";

const UserData = (props) => {
    // const loggedInUserData = useSelector(state => state.authData.auth);
    const dispatch = useDispatch();

    const getUserName = () => {
        if (props.user !== undefined && props.user.user !== undefined) {
            return "Hello " + props.user.user.name;
        }
    }

    const redirect = (path) => {
        window.location = path;
    }

    const getNameAndAvatar = () => {
        return (
            <Row style={{paddingTop: 20, paddingBottom: -20, paddingRight: 20, textAlign: "center"}}>
                <Col>
                    <Row>
                        <Col>
                            <p>{getUserName()}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    const getMenu = () => {
        if (props.user !== undefined && props.user.type === "GUEST") {
            return (
                <>
                    <span onClick={() => redirect('/login')}><NavDropdown.Item href="#">Login</NavDropdown.Item></span>
                    <NavDropdown.Divider/>
                    <span
                        onClick={() => redirect('/registration')}><NavDropdown.Item
                        href="#">Registration</NavDropdown.Item></span>
                </>
            )
        } else {
            return (
                <>
                    <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <span onClick={() => dispatch(logout())}><NavDropdown.Item>Log out</NavDropdown.Item></span>
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
