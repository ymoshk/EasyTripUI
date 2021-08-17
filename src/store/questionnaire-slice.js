import {createSlice} from "@reduxjs/toolkit";
import React from "react";
import {questionnaireStages} from "../components/questions/Stages";

const initialState = {
    questionnaire: {
        stage: 0,
        stages: questionnaireStages,
        blockSize: (100 / questionnaireStages.length),
        error: false,
        errorMsg: undefined,
    }
};

const isValidatable = (state) => {
    const current = state.questionnaire.stage;
    return state.questionnaire.stages[current].validatable;
};

const setError = (state, value) => {
    if (value) {
        state.questionnaire.error = true;
    } else {
        state.questionnaire.error = false;
        state.questionnaire.errorMsg = undefined;
    }
}

const questionnaireSlice = createSlice({
    name: 'itinerary',
    initialState: initialState,
    reducers: {
        set(state, action) {
            state.questionnaire = action.payload;
        },
        setIsValid(state, action) {
            const current = state.questionnaire.stage;

            if (isValidatable(state)) {
                if (action.payload) {
                    setError(state, false);
                } else {
                    setError(state, true);
                }

                state.questionnaire.stages[current].isValid = action.payload;
            }
        },
        setErrorMsg(state, action) {
            state.questionnaire.errorMsg = action.payload;
        },
        nextStage(state, action) {
            state.questionnaire.error = false;
            const current = state.questionnaire.stage;
            const stages = state.questionnaire.stages;

            if (!stages[current].validatable || stages[current].isValid) {
                setError(state, false);
                state.questionnaire.stage = Math.min(state.questionnaire.stage + 1,
                    state.questionnaire.stages.length - 1);
            } else {
                setError(state, true);
            }
        },
        previousStage(state, action) {
            state.questionnaire.error = false;
            state.questionnaire.stage = Math.max(state.questionnaire.stage - 1, 0);
        },
        setCurrentData(state, action) {
            state.questionnaire.error = false;
            const current = state.questionnaire.stage;
            state.questionnaire.stages[current].data = action.payload;
        },
        contTagsStatus(state, action) {
            const stagesList = state.questionnaire.stages;
            const currentStage = state.questionnaire.stage;
            const index = action.payload;
            const newStatus = !stagesList[currentStage].data[index].status;

            const toChange = stagesList[currentStage].data[index]

            stagesList[currentStage].data[index] = {
                ...toChange,
                status: newStatus
            }
        },
    }
})

export const questionnaireActions = questionnaireSlice.actions;
export default questionnaireSlice;
