import {createSlice} from "@reduxjs/toolkit";
import {cleanItinerary, updateItineraryDay} from "./itinerary-actions";
import formatDateToHours from "../components/utils/helpers/DateFormatter";
import uuid from "uuid-random";


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
    defaultDurations: {}
};

const initialFreeTime = {
    type: "FREE_TIME",
    startTime: "08:00",
    endTime: "08:00",
    uniqueKey: uuid()
}

const removeAttractionByIndex = (dailyArray, index) => {
    let result;

    if (dailyArray.length === 2 && index === 1) {
        result = [initialFreeTime];
    } else if (index === 1) {
        const newPadding = {...dailyArray[index - 1], endTime: dailyArray[index + 1].endTime, uniqueKey: uuid()};
        const subList = dailyArray.slice(3);
        result = [newPadding].concat(subList)
    } else if (dailyArray.length - 2 === index) {
        result = dailyArray.slice(0, dailyArray.length - 2);
    } else {
        let newPadding = {...dailyArray[index - 1], endTime: dailyArray[index + 1].startTime, uniqueKey: uuid()};
        const partOne = dailyArray.slice(0, index - 1);
        partOne.push(newPadding);
        const partTwo = dailyArray.slice(index + 2);
        result = partOne.concat(partTwo);
    }


    if (result.length === 1) {
        result = [initialFreeTime];
    } else {
        result = result.slice(0, result.length - 1);

        const lastPadding = {
            ...dailyArray[dailyArray.length - 1],
            startTime: result[result.length - 2].endTime,
            endTime: result[result.length - 2].endTime,
            uniqueKey: uuid()
        };

        result.push(lastPadding);
    }

    return result;
}

const addMinutesToHour = (hour, minutesCount) => {
    const newTime = new Date("01-01-2030 " + hour + ":00");
    newTime.setTime(newTime.getTime() + minutesCount * 1000 * 60);

    return formatDateToHours(newTime);
}

const changeComponentEndTime = (state, index, minutesToAdd) => {
    const dayIndex = state.itinerary.currentDayIndex;
    const originAttraction = state.itinerary.itineraryDays[dayIndex].activities[index];
    const firstSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(0, index);
    const secondSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(index + 1);

    firstSlice.push({
        ...originAttraction,
        uniqueKey: uuid(),
        endTime: addMinutesToHour(originAttraction.endTime, minutesToAdd)
    })

    secondSlice.forEach(node => firstSlice.push({
        ...node,
        uniqueKey: uuid(),
        startTime: addMinutesToHour(node.startTime, minutesToAdd),
        endTime: addMinutesToHour(node.endTime, minutesToAdd)
    }))

    return firstSlice;
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
                endTime: newEndTime,
                uniqueKey: uuid(),
            })

            currentDay.activities.push({
                attraction: null,
                type: "FREE_TIME",
                startTime: newEndTime,
                endTime: newEndTime,
                uniqueKey: uuid(),
            })
        },
        removeAttraction(state, action) {
            const arrayIndex = action.payload;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            currentDay.activities = removeAttractionByIndex(currentDay.activities, arrayIndex);
        },
        cleanDay(state, action) {
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            currentDay.activities = [initialFreeTime]
        },
        startOver(state, action) {
            const id = state.itinerary.itineraryId;
            state.itinerary.itineraryDays.forEach(day => {
                day.activities = [initialFreeTime]
            })
            cleanItinerary(id);
        },
        changeEndTime(state, action) {
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            const id = state.itinerary.itineraryId;

            currentDay.activities = changeComponentEndTime(state,
                action.payload.index, action.payload.minutesCount);

            updateItineraryDay(id, currentDay, dayIndex);
        },
        setDurations(state, action){
            state.defaultDurations = action.payload;
        }
    }
})

export const itineraryActions = itinerarySlice.actions;
export default itinerarySlice;
