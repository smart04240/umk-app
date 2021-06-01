import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const user_init = {
	nick_name: '',
	avatar: '',
	isFirstLogin: true,
	token: null,
	role: ''
}

export default createReducer(user_init, builder => {
	builder
		.addCase(Actions.User.Login, (state, action) => action.payload)
		.addCase(Actions.User.Logout, () => null)
		.addCase(Actions.User.Update, (state, action) => action.payload)
		.addCase(Actions.User.USOSOAuth, (state, {payload}) => {
			// console.log('USOSOAuth', {...state, ...payload});

			return {...state, ...payload};
		})
		.addCase(Actions.User.USOSAccessToken.fulfilled, (state, {payload}) => {
			// console.log('USOSAccessToken', {...state, ...payload});

			return {...state, ...payload};
		});
});
