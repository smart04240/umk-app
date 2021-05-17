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
		.addCase(Actions.User.Update, (state, action) => action.payload);
});
