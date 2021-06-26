import React from 'react';
import * as Notifications from 'expo-notifications';
import {cancelAllScheduledNotificationsAsync, cancelScheduledNotificationAsync} from 'expo-notifications';
import moment from "moment";

Notifications.setNotificationHandler({
   handleNotification: async () => ({
     shouldShowAlert: true,
     shouldPlaySound: true,
     shouldSetBadge: true
   }),
});

export const schedulePushNotification = async (title, description, reminderOffset, eventID, eventStartDate) => {
    const notificationDate = moment(eventStartDate).subtract(reminderOffset, 'seconds').diff(moment(), 'seconds');

    if (!!notificationDate) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `${title}`,
                body: `${description}`,
                sound: 'default',
                data: {
                    eventID: eventID,
                }
            },
            trigger: {
                seconds: notificationDate
            },
        })
    }
};

export const cancelPushNotification = async (eventID, notifications) => {
    if (notifications?.length) {
        const getReminderId = !!eventID && notifications?.find(notification => notification?.content?.data?.eventID === eventID)?.identifier;

        if (!getReminderId)
            return false;

        await cancelScheduledNotificationAsync(getReminderId).then(() => true);
    }

    return false;
}

export const replacePushNotifications = async data => {
    await cancelAllScheduledNotificationsAsync();

    if (!!data?.length) {
        data.forEach(notification => {
            schedulePushNotification(notification.title.pl, notification.description.pl, notification.reminder_offset, notification.id, notification.start_date)
        });
    }
}

