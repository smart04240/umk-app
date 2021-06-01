import React from 'react';
import * as Notifications from 'expo-notifications';
import {cancelScheduledNotificationAsync} from 'expo-notifications';
import moment from "moment";

Notifications.setNotificationHandler({
   handleNotification: async () => ({
     shouldShowAlert: true,
     shouldPlaySound: true,
     shouldSetBadge: true
   }),
});

export const schedulePushNotification = async (title, description, date, eventID) => {
    const now = moment();
    const reminderDate = moment(date);
    const countedDate = moment.duration(reminderDate?.diff(now)).as('seconds');

    return await Notifications.scheduleNotificationAsync({
        content: {
            title: `${title}`,
            body: `${description}`,
            sound: 'default',
            data: {
                eventID: eventID,
            }
        },
        trigger: {
            seconds: countedDate
        },
    });
}

export const cancelPushNotification = async (eventID, notifications) => {
    if (notifications?.length) {
        const getReminderId = !!eventID && notifications?.find(notification => notification?.content?.data?.eventID === eventID)?.identifier;

        if (!!getReminderId)
            await cancelScheduledNotificationAsync(getReminderId);
    }
}

