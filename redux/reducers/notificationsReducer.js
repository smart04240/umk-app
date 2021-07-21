import {createEntityAdapter, createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';

export const notificationAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        if (a.reminderDate < b.reminderDate)
            return 1;

        if (a.reminderDate > b.reminderDate)
            return -1;

        return 0;
    },
});

export default createReducer(notificationAdapter.getInitialState(), builder => {
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
        .addCase(Actions.User.Logout, () => notificationAdapter.getInitialState());
});
