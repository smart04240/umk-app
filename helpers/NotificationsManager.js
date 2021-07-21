import {useDispatch, useSelector} from "react-redux";
import React from "react";
import moment from "moment";
import Actions from "../redux/Actions";
import {v4 as uuidv4} from "uuid";
import {NotificationsSelector} from "../redux/selectors/notificationsSelectors";
import {eventsSelectors} from "../redux/selectors/eventsSelector";

export default function NotificationsManager() {
    const dispatch = useDispatch();
    const events = useSelector(state => eventsSelectors.All(state));
    const loginDate = useSelector(state => state.user.loggedInAt);
    const localNotifications = useSelector(state => NotificationsSelector.All(state));

    React.useEffect(() => {
        getPushNotifications();

        let timeout = null;

        const update = () => {
            timeout = setTimeout(() => {
                getPushNotifications();
                update();
            }, 60000);
        };
        update();

        return () => clearTimeout(timeout);
    }, [events, loginDate, localNotifications]);

    const getPushNotifications = () => {
        if (!loginDate)
            return;

        const receivedNotifications = [];
        const now = moment().toISOString();

        events.forEach(event => {
            if (!event.reminder_offset)
                return;

            const reminderDate = moment(event.start_date).subtract(event.reminder_offset, 'seconds').toISOString();

            // only add notifications after login date
            if (reminderDate < loginDate)
                return;

            // only add notifications that have past
            if (reminderDate > now)
                return;

            const oldNotification = localNotifications.find(notification => String(notification.eventID) === String(event.id));

            // dont add new notification if there was already one with same date
            if (oldNotification && oldNotification.reminderDate === reminderDate)
                return;

            receivedNotifications.push({
                id: uuidv4(),
                eventID: event.id,
                title: event.title,
                description: event.description,
                reminderDate: reminderDate,
                read: false,
            });
        });

        dispatch(Actions.Notifications.upsertMany(receivedNotifications));
    };

    return null;
};
