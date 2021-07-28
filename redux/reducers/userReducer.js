import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";
import moment from "moment";

export default createReducer(null, builder => {
    builder
        .addCase(Actions.User.Registered, ((state, action) => {
            state.nick_name = action.payload;
            state.isUnregistered = false;
        }))
        .addCase(Actions.User.Logout, () => null)
        .addCase(Actions.User.USOSOAuth, (state, {payload}) => ({...state, ...payload}))
        .addCase(Actions.User.USOSAccessToken.fulfilled, (state, {payload}) => ({
            ...state,
            ...payload,
            loggedInAt: moment().toISOString(),
        }))
        .addCase(Actions.API.DataLoaded, (state, {payload: { user, profile }}) => ({
            ...state,
            ...user,
            first_name: profile.first_name,
            last_name: profile.last_name,
            avatar_url: profile.avatar_url,
            studies: profile.studies,
            graduation_dates: profile.graduation_dates,
            ects: profile.ects,
        }))
        .addCase(Actions.User.Update, (state, {payload}) => ({
            ...state,
            nick_name: payload.user_name,
            avatar_url: payload.avatar,
        }))
});
