import React from 'react';
import {useDispatch} from "react-redux";
import AuthLayout from "./AuthLayout";
import {logout} from "../../store/auth-actions";

const Logout = () => {
    const dispatch = useDispatch();

    return (
        <>
            <AuthLayout>
                //TODO
                {dispatch(logout())}
            </AuthLayout>
        </>
    );
};

export default Logout;
