import AuthLayout from "./AuthLayout";
import * as React from "react";
import {RegisterPage as TablerRegisterPage} from "tabler-react";
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../store/auth-actions"


const Registration = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.authData.error);

    return <AuthLayout>
        <Formik
            initialValues={{
                email: "",
                password: "",
                name: "",
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

                if (values.password.length < 6) {
                    errors.password = "Password must contain at least 6 characters."
                }

                if (!values.name) {
                    errors.name = "Required";
                }

                return errors;
            }}
            onSubmit={(
                values,
                {setSubmitting, setErrors /* setValues and other goodies */}
            ) => {
                dispatch(register(values.email, values.password, values.name))
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
                <TablerRegisterPage
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                    errors={errors}
                    touched={touched}
                />
            )}
        />

    </AuthLayout>;
}

export default Registration;
