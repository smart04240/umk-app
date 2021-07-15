import {useDispatch, useSelector} from "react-redux";
import React from "react";
import API from "./API";
import {replacePushNotifications} from "./Notification";
import moment from "moment";
import Actions from "../redux/Actions";
import {v4 as uuidv4} from "uuid";
import {NotificationsSelector} from "../redux/selectors/notificationsSelectors";
import * as Notifications from "expo-notifications";
import {eventsSelectors} from "../redux/selectors/eventsSelector";

export default function NotificationsManager() {
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const events = useSelector(state => eventsSelectors.All(state));
    const localNotifications = useSelector(state => NotificationsSelector.All(state));
    const [updating, setUpdating] = React.useState(false);

    React.useEffect(() => {
        getPushNotifications();
    }, [isOnline, events]);

    React.useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(() => {
            getPushNotifications();
        });
        return () => subscription.remove();
    }, []);

    const getPushNotifications = () => {
        if (!isOnline || updating)
            return;

        setUpdating(true);

        API.events.notifications().then(res => {
            replacePushNotifications(res?.data);
            const receivedNotifications = [];
            const today = moment().add(1, 'second'); // fix for when notification arrives a bit too early

            res?.data?.forEach(event => {
                const oldNotification = localNotifications.find(notification => String(notification.eventID) === String(event.id))
                const reminderDate = moment(event.start_date).subtract(event?.reminder_offset, 'seconds');

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
        }).finally(() => setUpdating(false));
    }

    return null;
}
