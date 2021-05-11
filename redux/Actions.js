import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import API from "../helpers/API";
import Colors from "../constants/Colors";

const categoryPreparer = data => ({
    payload: typeof data === 'string' ? data : data.slug,
});

export default {
    API: {
        Fetch: createAsyncThunk('API/fetch', async () => (await API.get('/get/all/data')).data),
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
        Toggle: createAction('categories/toggle', categoryPreparer),
        Select: createAction('categories/select', categoryPreparer),
    },
    Notifications: {
        Danger: createAction('toasts/danger', message => ({payload: {color: Colors.Yellow, message}})),
        Warning: createAction('toasts/warning', message => ({payload: {color: Colors.Yellow, message}})),
    },
    ChangeMapSearch: createAction('changeMapSearch'),
};
