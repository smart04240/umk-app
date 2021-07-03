import { createReducer } from "@reduxjs/toolkit";
import Actions from "../Actions";

const InitialState = {
    all: [],
    earned: [],
    selected: {},
    promoted: [],
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.Badges.Earned, (state, { payload }) => ({ ...state, earned: payload }))
        .addCase(Actions.Badges.Selected, (state, { payload }) => ({ ...state, selected: payload }))
        .addCase(Actions.Badges.Promoted, (state, { payload }) => ({ ...state, promoted: payload }))
});
