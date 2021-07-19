import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const InitialState = {
    all: [],
    earned: [],
    selected: {},
    percentage: ''
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.DataLoaded, (state, { payload }) => ({ ...state, all: payload.badges.original.data.badges, percentage: payload.badges.original.data.percentage}))
        .addCase(Actions.Badges.All, (state, { payload }) => ({ ...state, all: payload.badges, percentage: payload.percentage }))
        .addCase(Actions.Badges.Earned, (state, { payload }) => ({ ...state, earned: payload }))
        .addCase(Actions.Badges.Selected, (state, { payload }) => ({ ...state, selected: payload }))
});
