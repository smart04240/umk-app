import {createAction} from "@reduxjs/toolkit";
import Colors from "../constants/Colors";

export default {
    API: {
        DataLoaded: createAction('API/fetch'),
    },
    InternetChange: createAction('internetChange'),
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
        upsertOne: createAction('calendar/upsertOne'),
        removeOne: createAction('calendar/removeOne')
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
        Message: createAction('toasts/message', message => ({payload: {message}})),
    },
    Notifications: {
        upsertOne: createAction('notification/upsertOne'),
        removeOne: createAction('notifications/removeOne')
    },
    EventCategories: {
        collect: createAction('eventCategories/collect')
    },
    ChangeMapSearch: createAction('changeMapSearch'),
};
