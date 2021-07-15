import {useDispatch, useSelector} from "react-redux";
import {useFocusEffect} from "@react-navigation/core";
import React from "react";
import API from "./API";
import {replacePushNotifications} from "./Notification";
import moment from "moment";
import Actions from "../redux/Actions";
import {v4 as uuidv4} from "uuid";
import {NotificationsSelector} from "../redux/selectors/notificationsSelectors";

export const NotificationsManager = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const localNotifications = useSelector(state => NotificationsSelector.All(state));

    useFocusEffect(React.useCallback(() => {
        API.events.notifications().then(res => {
            replacePushNotifications(res?.data);
            const receivedNotifications = [];
            const today = moment();

            res?.data?.forEach(event => {
                const oldNotification = localNotifications.find(notification => String(notification.eventID) === String(event.id))
                const reminderDate = moment(event.start_date).subtract(event?.reminder_offset);

                // only add notifications that have past
                if (!today.isSameOrAfter(reminderDate))
                    return;

                // dont add new notification if there was already one
                if (oldNotification && oldNotification.reminderDate === reminderDate.toISOString())
                    return;

                receivedNotifications.push({
                    id: uuidv4(),
                    eventID: event.id,
                    title: event.title,
                    description: event.description,
                    reminderDate: reminderDate.toISOString(),
                    read: false,
                });
            });

            dispatch(Actions.Notifications.upsertMany(receivedNotifications));
        });
    }, [isOnline]));

    return null;
}

export default NotificationsManager;
