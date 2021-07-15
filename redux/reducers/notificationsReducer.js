import {createEntityAdapter, createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';

export const notificationAdapter = createEntityAdapter({});

const initialState = notificationAdapter.getInitialState();

export default createReducer(initialState, builder => {
    builder
        .addCase(Actions.Notifications.upsertOne, notificationAdapter.upsertOne)
        .addCase(Actions.Notifications.removeOne, notificationAdapter.removeOne)
        .addCase(Actions.Notifications.setAll, notificationAdapter.setAll)
        .addCase(Actions.Notifications.markAsRead, notificationAdapter.updateOne)
        .addCase(Actions.Notifications.upsertMany, notificationAdapter.upsertMany)
        .addCase(Actions.Notifications.markAsReadAll, state => {
            for (const id of state.ids)
                state.entities[id].read = true;
        })
});
