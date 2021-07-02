import { createReducer, createSelector } from "@reduxjs/toolkit";
import Actions from "../Actions";

const InitialState = {
    all: [],
    earned: [],
    selected: {},
    promoted: [],
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.Badges.Earned, (state, {payload}) => ({...state, earned: payload}))
        .addCase(Actions.Badges.Selected, (state, {payload}) => {
            return {...state, selected: payload}
        })
});

export const badges = createSelector(
    [
        state => state.badges.all,
        state => state.badges.earned,
        state => state.badges.selected,
        state => state.badges.promoted,
    ]
);
