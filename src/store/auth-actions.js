import {authActions} from "./auth-slice";

const urlGetUser = new URL(process.env.REACT_APP_SERVER_URL.concat('/getUser'));
const urlLogin = new URL(process.env.REACT_APP_URL.concat('/login'));
const urlLogout = new URL(process.env.REACT_APP_URL.concat('/logout'));
const urlRegistration = new URL(process.env.REACT_APP_URL.concat('/registration'));

export const fetchLoggedInUser = () => {
    return async (dispatch) => {
        const fetchUser = async () => {
            const response = await fetch(urlGetUser,
                {
                    credentials: 'include',
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Could not fetch itinerary data!');
            }

            return await response.json();
        }
        try {
            const userData = await fetchUser();
            dispatch(authActions.set(userData));
        } catch (error) {
            console.log(error);
        }
    }
}

export const login = (userName, password) => {
    const updateDispatch = (dispatch) => {
        dispatch(authActions.setError(true))
        dispatch(authActions.setErrorMessage("Login failed because the user couldn't be found."));
    }

    return async (dispatch) => {
        const sendData = async () => {
            const response = await fetch(urlLogin,
                {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({
                        userName: userName,
                        password: password,
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Login failed!');
            }

            return await response.json();
        }
        try {
            const userData = await sendData();
            dispatch(authActions.set(userData));

            if (userData === undefined) {
                updateDispatch(dispatch);
            } else {
                window.location = '/';
            }
        } catch (error) {
            updateDispatch(dispatch);
        }
    }
}

export const register = (userName, password, name) => {
    const updateDispatch = (dispatch) => {
        dispatch(authActions.setError(true))
        dispatch(authActions.setErrorMessage("Registration failed! You might be using an email address " +
            "that's already in use."));
    }

    return async (dispatch) => {
        const sendData = async () => {
            const response = await fetch(urlRegistration,
                {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify({
                        userName: userName,
                        password: password,
                        name: name
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Registration failed!');
            }

            return await response.json();
        }
        try {
            const userData = await sendData();
            dispatch(authActions.set(userData));

            if (userData === undefined) {
                updateDispatch(dispatch);
            } else {
                window.location = '/';
            }
        } catch (error) {
            updateDispatch(dispatch);
        }
    }
}

export const logout = () => {
    const updateDispatch = (dispatch) => {
        dispatch(authActions.setError(true))
        dispatch(authActions.setErrorMessage("Logout failed due to an unknown error."));
    }

    return async (dispatch) => {
        const sendData = async () => {
            const response = await fetch(urlLogout,
                {
                    credentials: 'include',
                    method: 'POST',
                }
            );

            if (!response.ok) {
                throw new Error('Logout failed!');
            }

            return await response.json();
        }
        try {
            const userData = await sendData();
            dispatch(authActions.set(userData));

            if (userData === undefined) {
                updateDispatch(dispatch);
            }
        } catch (error) {
            updateDispatch(dispatch);
        }
    }
}
