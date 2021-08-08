import {createSlice} from "@reduxjs/toolkit";
import {updateItineraryDay} from "./itinerary-actions";
import formatDateToHours from "../components/utils/helpers/DateFormatter";


const initialState = {
    itinerary: {
        itineraryId: "",
        attraction: {},
        itineraryDays: [
            {
                date: new Date(),
                activities: []
            }],
        questionsData: {},
        currentDayIndex: 0
    },
    defaultDurations: {
        // TODO fill the rest
        Restaurant: 1.5,
        NightLife: 3,
    }
};

const removeAttractionByIndex = (dailyArray, index) => {
    if (dailyArray.length - 2 === index) {
        return dailyArray.slice(0, dailyArray.length - 2);
    } else {
        const partOne = dailyArray.slice(0, index);
        const partTwo = dailyArray.slice(index + 2);

        partOne[partOne.length - 1].endTime = dailyArray[index + 1].endTime;

        return partOne.concat(partTwo);
    }
}

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState: initialState,
    reducers: {
        set(state, action) {
            state.itinerary = action.payload;
        },
        updateDay(state, action) {
            state.itinerary.currentDayIndex = action.payload;
        },
        addAttraction(state, action) {
            const index = state.itinerary.currentDayIndex;
            const id = state.itinerary.itineraryId;
            const currentDay = state.itinerary.itineraryDays[index];
            const prevEndTime = currentDay.activities[currentDay.activities.length - 1].endTime

            const calculateEndTime = (prevEndTime, duration) => {
                const minutesToAdd = duration * 60;
                const endTime = new Date("01-01-2030 " + prevEndTime + ":00");
                return new Date(endTime.getTime() + minutesToAdd * 60 * 1000);
            }

            // TODO limit the maximum possible additions.
            const newEndTime = formatDateToHours(calculateEndTime(prevEndTime, action.payload.duration));
            const attraction = action.payload.attraction.attraction;
            const type = action.payload.attraction.type;

            currentDay.activities.push({
                attraction: attraction,
                type: type,
                startTime: prevEndTime,
                endTime: newEndTime
            })

            currentDay.activities.push({
                attraction: null,
                type: "FREE_TIME",
                startTime: newEndTime,
                endTime: newEndTime
            })

            updateItineraryDay(id, currentDay, index);
        },
        removeAttraction(state, action) {
            const arrayIndex = action.payload;
            const id = state.itinerary.itineraryId;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            currentDay.activities = removeAttractionByIndex(currentDay.activities, arrayIndex);
            updateItineraryDay(id, currentDay, dayIndex);
        }
    }
})

export const itineraryActions = itinerarySlice.actions;
export default itinerarySlice;
