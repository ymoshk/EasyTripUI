import {configureStore} from "@reduxjs/toolkit";
import itinerarySlice from "./itinerary-slice";
import questionnaireSlice from "./questionnaire-slice";

const store = configureStore({
    reducer: {
        itineraryData: itinerarySlice.reducer,
        questionnaireData: questionnaireSlice.reducer
    },
});

export default store;
