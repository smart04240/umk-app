import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const user_init = {
	nick_name: '',
	avatar: '',
	token: null,
	role: ''
}

export default createReducer(user_init, builder => {
	builder
		.addCase(Actions.User.Registered, ((state, action) => {
			state.nick_name = action.payload;
			state.isUnregistered = false;
		}))
		.addCase(Actions.User.Logout, () => null)
		.addCase(Actions.User.USOSOAuth, (state, {payload}) => {
			// console.log('USOSOAuth', {...state, ...payload});

			return {...state, ...payload};
		})
		.addCase(Actions.User.USOSAccessToken.fulfilled, (state, {payload}) => {
			// console.log('USOSAccessToken', {...state, ...payload});

			return {...state, ...payload};
		})
		.addCase(Actions.API.DataLoaded, (state, {payload: {profile}}) => ({
			...state,
			avatar_url: profile.avatar_url
		}))
});
