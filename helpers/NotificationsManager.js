import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/core";
import React from "react";
import API from "./API";
import * as Notifications from 'expo-notifications';
import {replacePushNotifications} from "./Notification";

export const NotificationsManager = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);

    useFocusEffect(React.useCallback(() => {
        API.events.notifications().then(async res => {
            await replacePushNotifications(res?.data);
        });
    }, [isOnline]));

    React.useEffect(() => {
        // ToDo get notifications from notifications manager and put them to store
        Notifications.getPresentedNotificationsAsync().then(res => console.log(res))
        const subscription = Notifications.addNotificationReceivedListener(notification => {

        });
        return () => subscription.remove();
    }, []);

    return null;
}

export default NotificationsManager;
