import { createReducer } from "@reduxjs/toolkit";
import Actions from "../Actions";

const InitialState = {
    all: [],
    earned: [],
    selected: {},
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.Badges.All, (state, { payload }) => ({ ...state, all: payload }))
        .addCase(Actions.Badges.Earned, (state, { payload }) => ({ ...state, earned: payload }))
        .addCase(Actions.Badges.Selected, (state, { payload }) => ({ ...state, selected: payload }))
});
