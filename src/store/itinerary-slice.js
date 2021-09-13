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
    showTransportationIcon: false,
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
            uniqueKey: uuid(),
            showTransportationIcon: false
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
            showTransportationIcon: false,
            uniqueKey: uuid()
        })
    } else {
        firstSlice.push({
            type: "FREE_TIME",
            startTime: firstSlice[firstSlice.length - 1].endTime,
            endTime: firstSlice[firstSlice.length - 1].endTime,
            showTransportationIcon: false,
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
    const activities = state.itinerary.itineraryDays[dayIndex].activities;
    const originAttraction = state.itinerary.itineraryDays[dayIndex].activities[index];
    const paddingBefore = state.itinerary.itineraryDays[dayIndex].activities[index - 1];
    const paddingAfter = state.itinerary.itineraryDays[dayIndex].activities[index + 1];
    const secondSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(index + 2);
    let firstSlice = state.itinerary.itineraryDays[dayIndex].activities.slice(0, index - 1);
    let minutes = minutesToAdd;

    const changedAttraction = {
        ...originAttraction,
        startTime: addMinutesToHour(originAttraction.startTime, minutesToAdd),
        endTime: addMinutesToHour(originAttraction.endTime, minutesToAdd),
    }

    if (minutesToAdd >= 0) {
        const indexOfInjectionPoint = findPaddingForInjection(state,
            changedAttraction.startTime, changedAttraction.endTime);

        const endHourOfLast = hourStringToDate(activities[activities.length - 1].endTime).getTime();

        if (endHourOfLast <= hourStringToDate(changedAttraction.startTime).getTime()) {
            firstSlice.push({
                ...paddingBefore,
                endTime: paddingAfter.endTime,
                uniqueKey: uuid()
            })

            firstSlice = firstSlice.concat(secondSlice);

            firstSlice[firstSlice.length - 1] = {
                ...firstSlice[firstSlice.length - 1],
                uniqueKey: uuid(),
                endTime: changedAttraction.startTime
            }

            firstSlice.push(changedAttraction);

            firstSlice.push({
                ...paddingBefore,
                startTime: changedAttraction.endTime,
                endTime: changedAttraction.endTime,
                uniqueKey: uuid()
            })
        } else if (indexOfInjectionPoint > -1) {
            firstSlice.push({
                ...paddingBefore,
                endTime: paddingAfter.endTime,
                uniqueKey: uuid()
            })

            const sliceOneOfSecondSlice = secondSlice.slice(0, indexOfInjectionPoint);
            const sliceTwoOfSecondSlice = secondSlice.slice(indexOfInjectionPoint + 1);
            const padding = firstSlice[indexOfInjectionPoint];

            firstSlice = firstSlice.concat(sliceOneOfSecondSlice);

            firstSlice.push({
                ...padding,
                endTime: changedAttraction.startTime,
                uniqueKey: uuid()
            })

            firstSlice.push(changedAttraction);

            firstSlice.push({
                ...padding,
                startTime: changedAttraction.endTime,
                uniqueKey: uuid()
            })

            firstSlice = firstSlice.concat(sliceTwoOfSecondSlice);
        } else {
            firstSlice.push({
                type: "FREE_TIME",
                startTime: paddingBefore.startTime,
                endTime: addMinutesToHour(paddingBefore.endTime, minutesToAdd),
                showTransportationIcon: false,
                uniqueKey: uuid()
            })

            firstSlice.push(changedAttraction);

            if (secondSlice.length === 0) {
                firstSlice.push({
                    type: "FREE_TIME",
                    startTime: changedAttraction.endTime,
                    endTime: changedAttraction.endTime,
                    showTransportationIcon: false,
                    uniqueKey: uuid()
                })
            } else if (calcAttractionDuration(paddingAfter) >= minutesToAdd) {
                minutes = 0;
                firstSlice.push({
                    type: "FREE_TIME",
                    startTime: changedAttraction.endTime,
                    endTime: secondSlice[0].startTime,
                    showTransportationIcon: false,
                    uniqueKey: uuid()
                })
            } else {
                firstSlice.push({
                    type: "FREE_TIME",
                    startTime: changedAttraction.endTime,
                    endTime: changedAttraction.endTime,
                    showTransportationIcon: false,
                    uniqueKey: uuid()
                })
                minutes = Math.abs(minutesToAdd - calcAttractionDuration(paddingAfter));
            }

            secondSlice.forEach(node => firstSlice.push({
                ...node,
                uniqueKey: uuid(),
                startTime: addMinutesToHour(node.startTime, minutes),
                endTime: addMinutesToHour(node.endTime, minutes)
            }))
        }
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
                endTime: paddingAfter.endTime,
                startTime: changedAttraction.endTime,
                showTransportationIcon: false,
                uniqueKey: uuid()
            })

            firstSlice = firstSlice.concat(secondSlice);
        } else {
            const paddingForInjectionIndex = findPaddingForInjection(state,
                changedAttraction.startTime, changedAttraction.endTime);

            if (paddingForInjectionIndex > -1 && paddingForInjectionIndex < firstSlice.length) {
                const sliceFromSliceOne = firstSlice.slice(0, paddingForInjectionIndex);
                const sliceTwoFromSliceOne = firstSlice.slice(paddingForInjectionIndex + 1);
                const padding = firstSlice[paddingForInjectionIndex];

                sliceFromSliceOne.push({
                    ...padding,
                    endTime: changedAttraction.startTime,
                    uniqueKey: uuid(),
                })

                sliceFromSliceOne.push(changedAttraction);

                sliceFromSliceOne.push({
                    ...padding,
                    startTime: changedAttraction.endTime,
                    uniqueKey: uuid(),
                })

                firstSlice = sliceFromSliceOne.concat(sliceTwoFromSliceOne);

                firstSlice.push()

                firstSlice.push({
                    ...paddingBefore,
                    endTime: paddingAfter.endTime,
                    uniqueKey: uuid()
                })

                firstSlice = firstSlice.concat(secondSlice);
            } else {
                return null;
            }
        }
    }

    firstSlice[firstSlice.length - 1] = {
        ...firstSlice[firstSlice.length - 1],
        endTime: firstSlice[firstSlice.length - 1].startTime,
        uniqueKey: uuid()
    }

    return firstSlice;
}

const findPaddingForInjection = (state, startHour, endHour) => {
    const dayIndex = state.itinerary.currentDayIndex;
    const attractions = state.itinerary.itineraryDays[dayIndex].activities;

    for (let i = 0; i < attractions.length; i++) {
        if (attractions[i].type === "FREE_TIME") {
            const start = hourStringToDate(attractions[i].startTime).getTime();
            const end = hourStringToDate(attractions[i].endTime).getTime();
            const attStart = hourStringToDate(startHour).getTime();
            const attEnd = hourStringToDate(endHour).getTime();

            if (start <= attStart && end >= attEnd) {
                return i;
            }
        }
    }

    return -1;
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
                showTransportationIcon: false,
                myIndex: 0,
                uniqueKey: uuid()
            })
        } else if (i === day.length - 1) {
            clone.push({
                ...day[i],
                showTransportationIcon: false,
                myIndex: i,
                uniqueKey: uuid()
            })
        } else if (i > 0 && i < day.length - 1) {
            if (day[i].type === "FREE_TIME") {
                const isAttractionAfterAlreadyContainTrans = day[i + 1].transportation !== undefined;

                if (day[i - 1].type === "ATTRACTION" &&
                    day[i + 1].type === "ATTRACTION" &&
                    day[i + 1].transportation === undefined) {
                    clone.push({
                        ...day[i],
                        showTransportationIcon: !isAttractionAfterAlreadyContainTrans,
                        myIndex: i,
                        srcLocation: getAttractionLocation(day[i - 1]),
                        destLocation: getAttractionLocation(day[i + 1]),
                        uniqueKey: uuid()
                    });
                } else {
                    clone.push({
                        ...day[i],
                        transportation: undefined,
                        myIndex: i,
                        uniqueKey: uuid()
                    });
                }
            } else {
                clone.push({
                    uniqueKey: uuid(),
                    ...day[i]
                })
            }
        }
    }

    return removeUnnecessaryTransportation(clone);
}

const removeUnnecessaryTransportation = (day) => {
    for (let i = 1; i < day.length - 1; i++) {
        if (day[i].type === "FREE_TIME" && day[i + 1].type === "ATTRACTION") {
            if (day[i + 1].transportation !== undefined) {
                const theLng = day[i + 1].transportation.sourceData.srcLng;
                const theLat = day[i + 1].transportation.sourceData.srcLat;

                if (day[i - 1].type !== "ATTRACTION") {
                    day[i] = {
                        ...day[i],
                        showTransportationIcon: false,
                        uniqueKey: uuid(),
                    }

                    day[i + 1] = {
                        ...day[i + 1],
                        transportation: undefined,
                        uniqueKey: uuid()
                    }
                } else if (day[i - 1].attraction.lat !== theLat ||
                    day[i - 1].attraction.lng !== theLng) {

                    day[i] = {
                        ...day[i],
                        showTransportationIcon: true,
                        uniqueKey: uuid(),
                        srcLocation: {
                            lng: day[i - 1].attraction.lng,
                            lat: day[i - 1].attraction.lat,
                        },
                        destLocation: {
                            lng: day[i + 1].attraction.lng,
                            lat: day[i + 1].attraction.lat,
                        }
                    }

                    day[i + 1] = {
                        ...day[i + 1],
                        transportation: undefined,
                        uniqueKey: uuid()
                    }
                }
            }
        }
    }
    return day;
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
        showTransportationIcon: false,
        transportation: undefined,
    })

    currentDay.activities.push({
        attraction: null,
        type: "FREE_TIME",
        startTime: newEndTime,
        endTime: newEndTime,
        uniqueKey: uuid(),
        showTransportationIcon: false,
        transportation: undefined,
    })

    state.itinerary.itineraryDays[index].activities = fixDailyTransportation(state, currentDay.activities);
}


const fixTransportationInLoadedItinerary = (state, itinerary) => {
    if (itinerary.itineraryDays !== undefined) {
        for (let i = 0; i < itinerary.itineraryDays.length; i++) {
            const day = itinerary.itineraryDays[i];
            day.activities = fixDailyTransportation(state, day.activities);
        }
    }

    return itinerary;
}


const removeTransportationUtil = (state, index, currentDay) => {
    currentDay[index] = {
        ...currentDay[index],
        uniqueKey: uuid(),
        transportation: undefined,
    }

    currentDay[index - 1] = {
        ...currentDay[index - 1],
        uniqueKey: uuid(),
        showTransportationIcon: true,
        srcLocation: getAttractionLocation(currentDay[index - 2]),
        destLocation: getAttractionLocation(currentDay[index])
    }
}

function changeTransportationUtil(state, currentDay, index, method, data) {
    const node = currentDay[index];
    const currentDuration = data[node.transportation.type];
    const newDuration = data[method];
    let newEndTime = addMinutesToHour(node.endTime, -currentDuration);
    newEndTime = addMinutesToHour(newEndTime, newDuration);

    currentDay[index] = {
        ...node,
        transportation: {
            ...node.transportation,
            type: method
        },
        uniqueKey: uuid(),
        endTime: newEndTime,
    }

    if (newDuration > currentDuration) {
        const paddingDuration = calcAttractionDuration(currentDay[index + 1])
        const toAdd = newDuration - currentDuration - paddingDuration

        for (let i = index + 1; i < currentDay.length; i++) {
            currentDay[i] = {
                ...currentDay[i],
                uniqueKey: uuid(),
                endTime: addMinutesToHour(currentDay[i].endTime, toAdd),
                startTime: addMinutesToHour(currentDay[i].startTime, toAdd),
            }
        }
    }

    currentDay[index + 1] = {
        ...currentDay[index + 1],
        uniqueKey: uuid(),
        endTime: currentDay.length === index + 2 ? currentDay[index].endTime : currentDay[index + 2].startTime,
        startTime: currentDay[index].endTime,
    }
}

const cleanDayUtil = (dayAttraction) => {
    const newDay = []

    if (dayAttraction.length > 1 && dayAttraction[1].type === "FLIGHT") {
        let padding = dayAttraction[0];
        let flight = dayAttraction[1];
        newDay.push(padding);
        newDay.push(flight);
    } else if (dayAttraction.length > 2 &&
        dayAttraction[dayAttraction.length - 2].type === "FLIGHT") {
        let padding = dayAttraction[dayAttraction.length - 1];
        let flight = dayAttraction[dayAttraction.length - 2];
        newDay.push(initialFreeTime);
        newDay.push(padding);
        newDay.push(flight);
    } else {
        newDay.push(initialFreeTime);
    }

    return newDay;
}

const flightFixesUtil = (state) => {
    if (state.itinerary.itineraryDays !== undefined) {
        state.itinerary.itineraryDays.forEach(day => {
            const activities = day.activities;

            if (activities.length > 1) {
                activities[0] = {
                    ...activities[0],
                    uniqueKey: uuid(),
                    endTime: activities[1].startTime
                }
            }

            if (activities[activities.length - 1].type === "FLIGHT") {
                activities.push({
                    ...initialFreeTime,
                    uniqueKey: uuid(),
                    startTime: activities[activities.length - 1].endTime,
                    endTime: activities[activities.length - 1].endTime
                })
            }
        })
    }
}

const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState: initialState,
    reducers: {
        set(state, action) {
            updateMemory(state);
            state.itinerary = fixTransportationInLoadedItinerary(state, action.payload);
            flightFixesUtil(state);
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
            currentDay.activities = fixDailyTransportation(state, cleanDayUtil(currentDay.activities));
            state.error = false;
        },
        startOver(state, action) {
            updateMemory(state, []);
            const id = state.itinerary.itineraryId;
            state.itinerary.itineraryDays.forEach(day => {
                day.activities = fixDailyTransportation(state, cleanDayUtil(day.activities))
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
            const type = currentDay.activities[action.payload.index].type

            if (type !== "FREE_TIME" && type !== "FLIGHT") {
                const res = moveAttractionHelper(state, action.payload.index, action.payload.minutesCount);

                if (res !== null) {
                    currentDay.activities = fixDailyTransportation(state, res);
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
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex].activities;
            const index = action.payload.index;
            const data = action.payload.locationData;
            const sourceData = action.payload.srcData;

            currentDay[index] = {
                ...currentDay[index],
                showTransportationIcon: false,
                uniqueKey: uuid()
            }

            currentDay[index + 1] = {
                ...currentDay[index + 1],
                transportation: {
                    data: data,
                    sourceData: sourceData,
                    type: "CAR"
                },
                uniqueKey: uuid()
            }

            state.itinerary.itineraryDays[dayIndex].activities =
                fixDailyTransportation(state,
                    changeComponentEndTime(state, index + 1, data.CAR));

            validate(state);
        },
        changeTransportationMethod(state, action) {
            updateMemory(state);

            const index = action.payload.index;
            const method = action.payload.newMethod;
            const data = action.payload.data;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex].activities;

            changeTransportationUtil(state, currentDay, index, method, data)
            validate(state);
        },
        removeTransportation(state, action) {
            updateMemory(state);
            const index = action.payload;
            const dayIndex = state.itinerary.currentDayIndex;
            const currentDay = state.itinerary.itineraryDays[dayIndex].activities;
            const currentNode = currentDay[index];
            const currentMethod = currentNode.transportation.type;
            removeTransportationUtil(state, index, currentDay);
            state.itinerary.itineraryDays[dayIndex].activities =
                fixDailyTransportation(state,
                    changeComponentEndTime(state, index, -currentNode.transportation.data[currentMethod]));
            validate(state);
        },
        updateMobilityDurations(state, action) {
            const index = action.payload.index;
            const dayIndex = state.itinerary.currentDayIndex;
            const data = action.payload.data;

            const currentDay = state.itinerary.itineraryDays[dayIndex].activities;
            const node = currentDay[index];
            const transportation = node.transportation;

            currentDay[index] = {
                ...node,
                uniqueKey: uuid(),
                transportation: {
                    ...transportation,
                    data: data
                }
            }

        }
    }
})

export const itineraryActions = itinerarySlice.actions;
export default itinerarySlice;
