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

const fixDuplicateFreeTime = (state) => {
    const index = state.itinerary.currentDayIndex;
    let dayAttractions = state.itinerary.itineraryDays[index].activities;

    for (let i = 0; i < dayAttractions.length - 1; i++) {
        if (dayAttractions[i].type === "FREE_TIME" && dayAttractions[i + 1].type === "FREE_TIME") {
            const newFreeTime = {
                ...dayAttractions[i],
                startTime: dayAttractions[i].startTime,
                endTime: dayAttractions[i + 1].endTime
            }

            const slice = dayAttractions.slice(0, i);
            const sliceTwo = dayAttractions.slice(i + 2);
            slice.push(newFreeTime);
            slice.push(sliceTwo);

            dayAttractions = slice;
            i--;
        }
    }

    state.itinerary.itineraryDays[index].activities = dayAttractions;
}

const validate = (state) => {
    fixDuplicateFreeTime(state);
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

        if (secondSlice[0] !== undefined && calcAttractionDuration(paddingAfter) >= minutesToAdd) {
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

const fixDailyTransportation = (state, day) => {
    const clone = [];

    for (let i = 0; i < day.length; i++) {
        if (i === 0) {
            clone.push({
                ...day[i],
                transportation: false,
                myIndex: 0,
                uniqueKey: uuid()
            })
        } else if (i === day.length - 1) {
            clone.push({
                ...day[i],
                transportation: false,
                myIndex: i,
                uniqueKey: uuid()
            })
        } else if (i > 0 && i < day.length - 1) {
            if (day[i].type === "FREE_TIME") {
                if (day[i - 1].type === "ATTRACTION" &&
                    day[i + 1].type === "ATTRACTION") {
                    clone.push({
                        ...day[i],
                        transportation: true,
                        myIndex: i,
                        srcLocation: getAttractionLocation(day[i - 1]),
                        destLocation: getAttractionLocation(day[i + 1]),
                        uniqueKey: uuid()
                    });
                } else {
                    clone.push({
                        ...day[i],
                        transportation: false,
                        myIndex: i,
                        uniqueKey: uuid()
                    });
                }
            } else {
                clone.push({
                    ...day[i]
                })
            }
        }
    }

    return clone;
}

const getAttractionLocation = (data) => {
    return {
        lng: data.attraction.lng,
        lat: data.attraction.lat,
    }
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

    state.itinerary.itineraryDays[index].activities = fixDailyTransportation(state, currentDay.activities);
}

const addTransportationUtil = (state, index, data, method) => {
    const currentDay = state.itinerary.currentDayIndex;
    const activities = state.itinerary.itineraryDays[currentDay].activities;
    const thisFreeTime = activities[index];
    let thisFreeTimeDuration = calcAttractionDuration(thisFreeTime);
    const driving = parseInt(data.CAR);
    const walking = parseInt(data.WALK);
    const transit = parseInt(data.TRANSIT);
    let realDuration;

    if (method === undefined) {
        method = "CAR"
    }

    if (method === "CAR") {
        realDuration = driving;
    } else if (method === "TRANSIT") {
        realDuration = transit;
    } else {
        realDuration = walking;
    }

    let fixedActivities = activities;

    if (realDuration > thisFreeTimeDuration) {
        const extraTime = realDuration - thisFreeTimeDuration;

        fixedActivities = fixDailyTransportation(state,
            changeComponentEndTime(state, index, extraTime));

        thisFreeTimeDuration += extraTime;
    }

    const attBefore = fixedActivities[index - 1];
    const attAfter = fixedActivities[index + 1];
    const firstSlice = fixedActivities.slice(0, index);
    const secondSlice = fixedActivities.slice(index + 1);

    firstSlice.push({
        attraction: null,
        type: "FREE_TIME",
        startTime: attBefore.endTime,
        endTime: attBefore.endTime,
        uniqueKey: uuid(),
    })

    const transEndTime = addMinutesToHour(attBefore.endTime, realDuration);
    const transportationNode = {
        attraction: null,
        type: method,
        startTime: attBefore.endTime,
        endTime: transEndTime,
        uniqueKey: uuid(),
        transDuration: {
            CAR: driving,
            WALK: walking,
            TRANSIT: transit,
        }
    }

    firstSlice.push(transportationNode);
    const diff = thisFreeTimeDuration - calcAttractionDuration(transportationNode);

    const afterFreeStartTime = addMinutesToHour(attAfter.startTime, -diff);

    firstSlice.push({
        attraction: null,
        type: "FREE_TIME",
        startTime: afterFreeStartTime,
        endTime: attAfter.startTime,
        uniqueKey: uuid(),
    })

    state.itinerary.itineraryDays[currentDay].activities = firstSlice.concat(secondSlice);
}

const fixTransportationInLoadedItinerary = (state, itinerary) => {
    for (let i = 0; i < itinerary.itineraryDays.length; i++) {
        const day = itinerary.itineraryDays[i];
        day.activities = fixDailyTransportation(state, day.activities);
    }

    return itinerary;
}

const changeTransportationMethodUtil = (index, data, method) => {

}

const removeTransportationUtil = (state, index, currentDay) => {
    let slice = currentDay.slice(0, index - 1);
    const freeTimeBefore = currentDay[index - 1];
    const freeTimeAfter = currentDay[index + 1];

    slice.push({
        ...freeTimeBefore,
        endTime: freeTimeAfter.endTime,
        uniqueKey: uuid()
    })

    return slice.concat(currentDay.slice(index + 2));
}

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState: initialState,
    reducers: {
        set(state, action) {
            updateMemory(state);
            state.itinerary = fixTransportationInLoadedItinerary(state, action.payload);
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
            currentDay.activities = fixDailyTransportation(state, removeAttractionByIndex(currentDay.activities, arrayIndex));

        },
        cleanDay(state, action) {
            updateMemory(state);
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            currentDay.activities = fixDailyTransportation(state, [initialFreeTime]);
            state.error = false;
        },
        startOver(state, action) {
            updateMemory(state, {});
            const id = state.itinerary.itineraryId;
            state.itinerary.itineraryDays.forEach(day => {
                day.activities = fixDailyTransportation(state, [initialFreeTime])
            })
            state.error = false;
            cleanItinerary(id);
        },
        changeEndTime(state, action) {
            updateMemory(state);
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            currentDay.activities = fixDailyTransportation(state, changeComponentEndTime(state,
                action.payload.index, action.payload.minutesCount));
            validate(state);
        },
        setDurations(state, action) {
            state.defaultDurations = action.payload;
        },
        moveAttraction(state, action) {
            updateMemory(state);

            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            if (currentDay.activities[action.payload.index].type === "ATTRACTION") {

                const res = fixDailyTransportation(state, moveAttractionHelper(state,
                    action.payload.index, action.payload.minutesCount));

                if (res !== null) {
                    currentDay.activities = res;
                    validate(state);
                } else {
                    state.error = true;
                    rollBack(state);
                }
            }
        },
        resetError(state, action) {
            state.error = false;
        },
        addTransportation(state, action) {
            updateMemory(state);
            const index = action.payload.index;
            const data = action.payload.locationData;
            addTransportationUtil(state, index, data);
            validate(state);
        },
        changeTransportationMethod(state, action) {
            updateMemory(state);
            const index = action.payload.index;
            const method = action.payload.newMethod;
            const data = action.payload.data;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];

            currentDay.activities = removeTransportationUtil(state, index, currentDay.activities);
            addTransportationUtil(state, index, data, method);
            validate(state);
        },
        removeTransportation(state, action) {
            updateMemory(state);
            const index = action.payload.index;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex];
            currentDay.activities = removeTransportationUtil(state, index, currentDay.activities);
            validate(state);
        }
    }
})

export const itineraryActions = itinerarySlice.actions;
export default itinerarySlice;
