import {createEntityAdapter, createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

export const eventAdapter = createEntityAdapter();

const InitialState = {
    selectedDate: null,
    ...eventAdapter.getInitialState(),
};


export default createReducer(InitialState, builder => {
   builder
       .addCase(Actions.Calendar.SetDate, (state, action) => {
           state.selectedDate = action.payload;
       })
       .addCase(Actions.Calendar.upsertOne, eventAdapter.upsertOne)
       .addCase(Actions.Calendar.removeOne, eventAdapter.removeOne)
       .addCase(Actions.Calendar.setAll, eventAdapter.setAll)
});
