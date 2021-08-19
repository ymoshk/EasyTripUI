import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const ErrorSweetAlert = () => {
    return (
        <SweetAlert
            danger
            onConfirm={() => {
                window.location = '/'
            }}
            onCancel={() => {
                window.location = '/'
            }}
            timeout={3000}
            title={"Error!"}>
            Action failed due to unknown error.
        </SweetAlert>
    );
};

export default ErrorSweetAlert;
