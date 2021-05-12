import {createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';


export default createReducer(null, builder => {
    builder
        .addCase(Actions.Notifications.Danger, (state, action) => {
            return action.payload;
        })
        .addCase(Actions.Notifications.Warning, (state, action) => {
            return action.payload;
        })
});
