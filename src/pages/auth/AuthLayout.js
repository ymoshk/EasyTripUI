import React from 'react';
import styles from "./styles.module.css"
import {Card, Image} from "react-bootstrap";
import Logo from "../../images/logo/logo-outline.png";
import SweetAlert from "react-bootstrap-sweetalert";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth-slice";


const AuthLayout = (props) => {
    const showErrorAlert = useSelector(state => state.authData.error);
    const serverErrorMessage = useSelector(state => state.authData.errorMessage);
    const dispatch = useDispatch();

    return (
        <>
            {showErrorAlert && <SweetAlert
                danger
                onConfirm={() => {
                    dispatch(authActions.setError(false));
                }}
                onCancel={() => {
                    dispatch(authActions.setError(false));
                }}
                timeout={3000}
                title={"Error!"}>
                {serverErrorMessage}
            </SweetAlert>}
            <Card>
                <Card.Body>>
                    <div style={{textAlign: "center"}}>
                        <Image className={styles.image} src={Logo}/>
                    </div>
                    <div className={styles.background} style={{height: "100%", backgroundColor: "00000"}}>
                        <div className={styles.removeImage}>
                            {props.children}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default AuthLayout;
