import {notificationAdapter} from "../reducers/notificationsReducer";
import {createSelector} from "@reduxjs/toolkit";

const {selectAll, selectById} = notificationAdapter.getSelectors(state => state.notifications);

export const NotificationsSelector = {
    All: selectAll,
    byId: selectById,
};

export const getUnreadNotifications = createSelector(
    [
        state => state.notifications.entities,
    ],
    (notifications) => {
        let filteredNotifications = [];

        Object.values(notifications).forEach(notification => {
            if (!notification.read)
                filteredNotifications.push(notification)
        });

        return filteredNotifications;
    }
)
