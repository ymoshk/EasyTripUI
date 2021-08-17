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
                date: undefined,
                activities: []
            }],
        questionsData: {},
        currentDayIndex: 0
    },
    defaultDurations: {},
    daysMemory: {},
    error: false,
};

const initialFreeTime = {
    type: "FREE_TIME",
    startTime: "08:00",
    endTime: "08:00",
    uniqueKey: uuid()
}

const hourStringToDate = (hour) => {
    return new Date("01-01-2030 " + hour + ":00");
}

const validate = (state) => {
    const index = state.itinerary.currentDayIndex;
    const dayAttractions = state.itinerary.itineraryDays[index];

    const Limit = hourStringToDate("08:00")

    const notEmpty = dayAttractions.length !== 0;
    if (notEmpty) {
        const startAtMorning = hourStringToDate(dayAttractions.activities[0].startTime)
            .getTime() === Limit.getTime();
        const endInTime = hourStringToDate(dayAttractions.activities[dayAttractions.activities.length - 1].endTime)
            .getTime() >= Limit.getTime();

        let eachOneHasPadding = true;
        let continuity = true;

        for (let i = 0; i < dayAttractions.length; i += 2) {
            let padding = dayAttractions[i];
            let attraction = dayAttractions[i + 1];

            if (padding.type === "ATTRACTION" || attraction.type !== "ATTRACTION") {
                eachOneHasPadding = false;
                break;
            }
        }

        for (let i = 0; i < dayAttractions.length - 1; i++) {
            let first = dayAttractions[i];
            let second = dayAttractions[i + 1];

            if (hourStringToDate(first.endTime).getTime() === hourStringToDate(second.startTime).getTime()) {
                continuity = false;
            }
        }

        if (!notEmpty || !startAtMorning || !endInTime || !eachOneHasPadding || !continuity) {
            rollBack(state);
            state.error = true;
        } else {
            state.error = false;
        }
    } else {
        rollBack(state);
        state.error = true;
    }
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
            startTime: result[result.length - 1].endTime,
            endTime: result[result.length - 1].endTime,
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
            endTime: padding.endTime,
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

    const changedAttraction = {
        ...originAttraction,
        startTime: addMinutesToHour(originAttraction.startTime, minutesToAdd),
        endTime: addMinutesToHour(originAttraction.endTime, minutesToAdd),
        uniqueKey: uuid()
    }

    if (minutesToAdd >= 0) {
        firstSlice.push({
            type: "FREE_TIME",
            startTime: paddingBefore.startTime,
            endTime: addMinutesToHour(paddingBefore.endTime, minutesToAdd),
            uniqueKey: uuid()
        })

        firstSlice.push(changedAttraction);

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
        const paddingBeforeDuration = calcAttractionDuration(paddingBefore);

        if (paddingBeforeDuration >= -minutesToAdd) {
            firstSlice.push({
                ...paddingBefore,
                endTime: addMinutesToHour(paddingBefore.endTime, minutesToAdd),
                uniqueKey: uuid()
            })

            firstSlice.push(changedAttraction);

            firstSlice.push({
                ...paddingAfter,
                endTime: secondSlice.length === 0 ? addMinutesToHour(paddingAfter.startTime, minutesToAdd) :
                    paddingAfter.endTime,
                startTime: addMinutesToHour(paddingAfter.startTime, minutesToAdd),
                uniqueKey: uuid()
            })

            secondSlice.forEach(node => firstSlice.push({
                ...node,
                uniqueKey: uuid(),
                startTime: addMinutesToHour(node.startTime, minutes),
                endTime: addMinutesToHour(node.endTime, minutes)
            }))
        } else {
            return null;
        }
    }

    return firstSlice;
}

const updateMemory = (state, data) => {
    if (data === undefined) {
        const dayIndex = state.itinerary.currentDayIndex;
        state.daysMemory = cloneAttractionList(state.itinerary.itineraryDays[dayIndex].activities);
    } else {
        state.daysMemory = cloneAttractionList(data);
    }

    state.error = false;
}

const cloneAttractionList = (list) => {
    const result = [];
    list.forEach(attraction => {
        result.push({
            ...attraction,
            uniqueKey: uuid()
        })
    })

    return result;
}

const rollBack = (state) => {
    const index = state.itinerary.currentDayIndex;
    const list = []
    state.daysMemory.forEach(activity => list.push(
        {
            ...activity,
            uniqueKey: uuid()
        }
    ))

    state.itinerary.itineraryDays[index].activities = list;
}


const addAttractionHelper = (state, attraction, type, duration) => {
    const index = state.itinerary.currentDayIndex;
    const currentDay = state.itinerary.itineraryDays[index];
    const prevEndTime = currentDay.activities[currentDay.activities.length - 1].endTime

    const calculateEndTime = (prevEndTime, duration) => {
        const minutesToAdd = duration * 60;
        const endTime = new Date("01-01-2030 " + prevEndTime + ":00");
        return new Date(endTime.getTime() + minutesToAdd * 60 * 1000);
    }

    const newEndTime = formatDateToHours(calculateEndTime(prevEndTime, duration));

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
}

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState: initialState,
    reducers: {
        set(state, action) {
            updateMemory(state);
            state.itinerary = action.payload;
        },
        updateDay(state, action) {
            updateMemory(state);
            state.itinerary.currentDayIndex = action.payload;
        },
        addAttraction(state, action) {
            const attraction = action.payload.attraction.attraction;
            const type = action.payload.attraction.type;
            const duration = action.payload.duration;
            updateMemory(state);
            addAttractionHelper(state, attraction, type, duration);
            validate(state);
        },
        removeAttraction(state, action) {
            updateMemory(state);
            const arrayIndex = action.payload;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            currentDay.activities = removeAttractionByIndex(currentDay.activities, arrayIndex);
        },
        cleanDay(state, action) {
            updateMemory(state);
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            currentDay.activities = [initialFreeTime]
            state.error = false;
        },
        startOver(state, action) {
            updateMemory(state, {});
            const id = state.itinerary.itineraryId;
            state.itinerary.itineraryDays.forEach(day => {
                day.activities = [initialFreeTime]
            })
            state.error = false;
            cleanItinerary(id);
        },
        changeEndTime(state, action) {
            updateMemory(state);
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            currentDay.activities = changeComponentEndTime(state,
                action.payload.index, action.payload.minutesCount);
            validate(state);
        },
        setDurations(state, action) {
            state.defaultDurations = action.payload;
        },
        moveAttraction(state, action) {
            updateMemory(state);
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            const res = moveAttractionHelper(state,
                action.payload.index, action.payload.minutesCount);


            if (res !== null) {
                currentDay.activities = res;
                validate(state);
            } else {
                state.error = true;
                rollBack(state);
            }

        },
        resetError(state, action) {
            state.error = false;
        }
    }
})

export const itineraryActions = itinerarySlice.actions;
export default itinerarySlice;
