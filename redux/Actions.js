import {createAction} from "@reduxjs/toolkit";
import Colors from "../constants/Colors";

export default {
    API: {
        DataLoaded: createAction('API/fetch'),
    },
    InternetChange: createAction('internetChange'),
    Tutorial: {
        Passed: createAction('tutorial/passed'),
        Reset: createAction('tutorial/reset'),
    },
    Theme: {
        Toggle: createAction('theme/toggle'),
    },
    Reminders: {
        MarkAsRead: createAction('reminders/mark-as-read'),
        MarkAsReadAll: createAction('reminders/mark-as-read-all')
    },
    ToDos: {
        upsertOne: createAction('todos/create'),
    },
    Calendar: {
        SetDate: createAction('calendar/setDate'),
        setAll: createAction('calendar/upsertMany'),
        upsertOne: createAction('calendar/upsertOne'),
        removeOne: createAction('calendar/removeOne'),
        filterByDay: createAction('calendar/filterByDay', (start, end) => ({payload: {lol: 'lol'}})),
        filterByWeek: createAction('calendar/filterByWeek')
    },
    Locale: {
        Toggle: createAction('locale/toggle'),
    },
    User: {
        Login: createAction('user/login'),
        Logout: createAction('user/logout'),
        Update: createAction('user/update'),
    },
    Categories: {
        Toggle: createAction('categories/toggle'),
        Select: createAction('categories/select'),
    },
    Toasts: {
        Danger: createAction('toasts/danger', message => ({payload: {color: Colors.Red, message}})),
        Warning: createAction('toasts/warning', message => ({payload: {color: Colors.Yellow, message}})),
        Message: createAction('toasts/message', message => ({payload: {color: Colors.Blue, message}})),
        Cleanup: createAction('toasts/cleanup')
    },
    Notifications: {
        upsertOne: createAction('notification/upsertOne'),
        removeOne: createAction('notifications/removeOne')
    },
    ChangeMapSearch: createAction('changeMapSearch'),
};
