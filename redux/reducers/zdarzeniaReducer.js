import { createReducer, createSelector } from "@reduxjs/toolkit";
import Actions from "../Actions";

const InitialState = {
    affectList: [],
    notAffectList: [],
    others: [],
    graduation: [],
    usosEvents: [],
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.Zdarzenia.All, (state, action) => {
            return action.payload
        });
});

export const zdarzenias = createSelector(
    [
        state => state.zdarzenia.affectList,
        state => state.zdarzenia.notAffectList,
        state => state.zdarzenia.others,
        state => state.zdarzenia.graduation,
        state => state.zdarzenia.usosEvents,
    ]
);
