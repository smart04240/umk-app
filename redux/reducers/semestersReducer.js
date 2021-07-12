import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

export default createReducer([], builder => {
   builder.addCase(Actions.API.DataLoaded, (state, action) => action.payload.semesters || []);
});
