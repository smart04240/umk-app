import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

export default createReducer('pl', builder => {
    builder.addCase(Actions.Locale.Toggle, state => {
        return state === 'pl' ? 'en' : 'pl';
    });
});
