import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

export default createReducer(false, builder => {
    builder.addCase(Actions.InternetChange, (state, action) => action.payload);
});
