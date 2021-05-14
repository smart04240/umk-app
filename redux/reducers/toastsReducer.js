import {createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';


export default createReducer(null, builder => {
    builder
        .addCase(Actions.Toasts.Danger, (state, action) => {
            return action.payload;
        })
        .addCase(Actions.Toasts.Warning, (state, action) => {
            return action.payload;
        })
});
