import {createEntityAdapter, createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';

export const notificationAdapter = createEntityAdapter({});

const initialState = notificationAdapter.getInitialState();

export default createReducer(initialState, builder => {
    builder
        .addCase(Actions.Notifications.upsertOne, notificationAdapter.upsertOne)
        .addCase(Actions.Notifications.removeOne, notificationAdapter.removeOne)
});
