import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const user_init = {
	nick_name: 'nick_studenta123',
	avatar: '',
	token: null
}

export default createReducer( null , builder => {
    builder.addCase(Actions.User.Update, state => {
        // return state === 'pl' ? 'en' : 'pl';
    });
});
