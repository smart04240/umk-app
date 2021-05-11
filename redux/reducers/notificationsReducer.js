import {createEntityAdapter, createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';


const initialState = {
  color: '',
  code: '',
  message: '',
};

export default createReducer(initialState, builder => {
    builder
        .addCase(Actions.Notifications.upsertOne, (state, action) => {
            state.code = action.payload?.code;
            state.color = action.payload?.color;
            state.message = action.payload?.message;
        });
});

