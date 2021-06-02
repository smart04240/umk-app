import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import Colors from "../constants/Colors";
import API from "../helpers/API";

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
        USOSOAuth: createAction('user/usos-oauth'),
        USOSAccessToken: createAsyncThunk('user/usos-access-token', async (payload, thunkAPI) => {
            const state = { ...thunkAPI.getState().user, ...payload };
            // console.log('state', state);
            const result = await API.post('/usos/get_access_token', {
                oauth_token:    state.oauth_token,
                oauth_verifier: state.oauth_verifier,
                secret:         state.secret
            });
            return {
                oauth_token:    null,
                oauth_verifier: null,
                secret:         null,
                access_token:   result?.data?.access_token,
                access_secret:  result?.data?.access_secret,
            };
        }),
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
    ChangeMapSearchDebounced: createAction('changeMapSearchDebounced'),
};
