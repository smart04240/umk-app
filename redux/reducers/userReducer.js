import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const user_init = {
	nick_name: 'nick_studenta123',
	avatar: '',
	token: null
}

export default createReducer(null, builder => {
	builder
		.addCase(Actions.User.Login, (state, action) => action.payload)
		.addCase(Actions.User.Logout, () => null)
		.addCase(Actions.User.Update, (state, action) => {
			state.user.nick_name = action.payload.nick_name;
		});
});
