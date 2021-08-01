import {configureStore} from "@reduxjs/toolkit";
import attractionSlice from "./attraction-slice";

const store = configureStore({
    reducer: {attraction: attractionSlice.reducer},
});

export default store;