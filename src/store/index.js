import {configureStore} from "@reduxjs/toolkit";
import itinerarySlice from "./itinerary-slice";

const store = configureStore({
    reducer: {itineraryData: itinerarySlice.reducer},
});

export default store;
