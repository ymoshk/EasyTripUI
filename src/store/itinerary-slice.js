import {createSlice} from "@reduxjs/toolkit";
import {cleanItinerary} from "./itinerary-actions";
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

const calcAttractionDuration = (attraction) => {
    const startTime = new Date("01-01-2030 " + attraction.startTime + ":00");
    const endTime = new Date("01-01-2030 " + attraction.endTime + ":00");

    return (endTime.getTime() - startTime.getTime()) / (1000 * 60);
}

const addMinutesToHour = (hour, minutesCount) => {
    const newTime = new Date("01-01-2030 " + hour + ":00");
    newTime.setTime(newTime.getTime() + minutesCount * 1000 * 60);

    return formatDateToHours(newTime);
}

const changeComponentEndTime = (state, index, minutesToAdd) => {
    const dayIndex = state.itinerary.currentDayIndex;
    const originAttraction = state.itinerary.itineraryDays[dayIndex].activities[index];
    const padding = state.itinerary.itineraryDays[dayIndex].activities[index + 1];
    const firstSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(0, index);
    const secondSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(index + 2);
    const paddingDuration = calcAttractionDuration(padding);
    let minutes = minutesToAdd;

    firstSlice.push({
        ...originAttraction,
        uniqueKey: uuid(),
        endTime: addMinutesToHour(originAttraction.endTime, minutesToAdd)
    })

    if (paddingDuration >= minutesToAdd) {
        minutes = 0;
        firstSlice.push({
            type: "FREE_TIME",
            startTime: firstSlice[firstSlice.length - 1].endTime,
            endTime: secondSlice[0].startTime,
            uniqueKey: uuid()
        })
    } else {
        firstSlice.push({
            type: "FREE_TIME",
            startTime: firstSlice[firstSlice.length - 1].endTime,
            endTime: firstSlice[firstSlice.length - 1].endTime,
            uniqueKey: uuid()
        })
        minutes = minutesToAdd - paddingDuration;
    }

    secondSlice.forEach(node => firstSlice.push({
        ...node,
        uniqueKey: uuid(),
        startTime: addMinutesToHour(node.startTime, minutes),
        endTime: addMinutesToHour(node.endTime, minutes)
    }))

    return firstSlice;
}

const moveAttractionHelper = (state, index, minutesToAdd) => {
    const dayIndex = state.itinerary.currentDayIndex;
    const originAttraction = state.itinerary.itineraryDays[dayIndex].activities[index];
    const paddingBefore = state.itinerary.itineraryDays[dayIndex].activities[index - 1];
    const paddingAfter = state.itinerary.itineraryDays[dayIndex].activities[index + 1];
    const firstSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(0, index - 1);
    const secondSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(index + 2);
    let minutes = minutesToAdd;

    if (minutesToAdd >= 0) {
        firstSlice.push({
            type: "FREE_TIME",
            startTime: paddingBefore.startTime,
            endTime: addMinutesToHour(paddingBefore.endTime, minutesToAdd),
            uniqueKey: uuid()
        })

        firstSlice.push({
            ...originAttraction,
            startTime: addMinutesToHour(originAttraction.startTime, minutesToAdd),
            endTime: addMinutesToHour(originAttraction.endTime, minutesToAdd),
            uniqueKey: uuid()
        })

        if (calcAttractionDuration(paddingAfter) >= minutesToAdd) {
            minutes = 0;
            firstSlice.push({
                type: "FREE_TIME",
                startTime: firstSlice[firstSlice.length - 1].endTime,
                endTime: secondSlice[0].startTime,
                uniqueKey: uuid()
            })
        } else {
            firstSlice.push({
                type: "FREE_TIME",
                startTime: firstSlice[firstSlice.length - 1].endTime,
                endTime: firstSlice[firstSlice.length - 1].endTime,
                uniqueKey: uuid()
            })
            minutes = minutesToAdd - calcAttractionDuration(paddingAfter);
        }

        secondSlice.forEach(node => firstSlice.push({
            ...node,
            uniqueKey: uuid(),
            startTime: addMinutesToHour(node.startTime, minutes),
            endTime: addMinutesToHour(node.endTime, minutes)
        }))
    } else {

    }

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

            currentDay.activities = changeComponentEndTime(state,
                action.payload.index, action.payload.minutesCount);
        },
        setDurations(state, action) {
            state.defaultDurations = action.payload;
        },
        moveAttraction(state, action) {
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            currentDay.activities = moveAttractionHelper(state,
                action.payload.index, action.payload.minutesCount);
        }
    }
})

export const itineraryActions = itinerarySlice.actions;
export default itinerarySlice;
