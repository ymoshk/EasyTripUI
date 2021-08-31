import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    auth: undefined,
    error: false,
    errorMessage: "",
    loader: false,
    logoutCompleted: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        set(state, action) {
            state.auth = action.payload;
        },
        setType(state, action) {
            state.auth.type = action.payload;
        },
        setUser(state, action) {
            state.auth.user = action.payload;
        },
        setError(state, action) {
            if (!action.payload) {
                state.errorMessage = "";
            }
            state.error = action.payload;
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
        },
        setLoader(state, action) {
            state.loader = action.payload;
        },
        setLogoutCompleted(state, action) {
            state.logoutCompleted = action.payload;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;
