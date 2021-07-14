import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/core";
import React from "react";
import API from "./API";
import {replacePushNotifications} from "./Notification";
import moment from "moment";
import Actions from "../redux/Actions";
import {v4 as uuidv4} from "uuid";

export const NotificationsManager = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const today = moment();

    useFocusEffect(React.useCallback(() => {
        API.events.notifications().then(async res => {
            await replacePushNotifications(res?.data);
            const receivedNotifications = [];

            res?.data?.forEach(notification => {
                const reminderDate = moment(notification.start_date).subtract(notification?.reminder_offset);

                if (today.isSameOrAfter(reminderDate))
                    return receivedNotifications.push({
                        id: uuidv4(),
                        title: notification.title,
                        description: notification.description,
                        reminderDate: reminderDate.toISOString(),
                        read: false,
                    });
            });

            dispatch(Actions.Notifications.setAll(receivedNotifications));
        });
    },[isOnline]));

    return null;
}

export default NotificationsManager;
