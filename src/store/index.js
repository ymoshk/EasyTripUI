import {configureStore} from "@reduxjs/toolkit";
import itinerarySlice from "./itinerary-slice";
import questionnaireSlice from "./questionnaire-slice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer: {
        itineraryData: itinerarySlice.reducer,
        questionnaireData: questionnaireSlice.reducer,
        authData: authSlice.reducer
    },
});

export default store;
