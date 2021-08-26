import * as React from "react";
import {Formik} from "formik";
import {LoginPage as TablerLoginPage} from "tabler-react";
import AuthLayout from "./AuthLayout";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/auth-actions";


const LoginPage = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.authData.error);

    return (
        <AuthLayout>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validate={values => {
                    let errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = "Invalid email address";
                    }

                    if (!values.password) {
                        errors.password = "Required";
                    }

                    return errors;
                }}
                onSubmit={(
                    values,
                    {setSubmitting, setErrors /* setValues and other goodies */}
                ) => {
                    dispatch(login(values.email, values.password))
                }}
                render={({
                             values,
                             errors,
                             touched,
                             handleChange,
                             handleBlur,
                             handleSubmit,
                             isSubmitting,
                         }) => (
                    <TablerLoginPage
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                    />
                )}
            />
        </AuthLayout>
    );
}

export default LoginPage;
