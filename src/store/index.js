import {configureStore} from "@reduxjs/toolkit";
import attractionSlice from "./attraction";

const store = configureStore({
    reducer: {attraction: attractionSlice.reducer},
});

export default store;