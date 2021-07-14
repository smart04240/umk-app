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
        Registered: createAction('user/registered'),
        Logout: createAction('user/logout'),
        USOSOAuth: createAction('user/usos-oauth'),
        USOSAccessToken: createAsyncThunk('user/usos-access-token', async (payload, thunkAPI) => {
            const state = {...thunkAPI.getState().user, ...payload};
            const result = await API.oauth.getAccessToken(state.oauth_token, state.oauth_verifier, state.secret);
            return {
                oauth_token: null,
                oauth_verifier: null,
                secret: null,
                access_token:   result?.data?.access_token,
                access_secret:  result?.data?.access_secret,
                isUnregistered: result?.data?.is_unregistered,
            };
        }),
        Update: createAction('user/update')
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
        removeOne: createAction('notifications/removeOne'),
        setAll: createAction('notifications/setAll'),
        markAsRead: createAction('notification/markAsRead'),
        markAsReadAll: createAction('notification/markAsReadAll')
    },
    ChangeMapSearch: createAction('changeMapSearch'),
    ChangeMapSearchDebounced: createAction('changeMapSearchDebounced'),
    Zdarzenia: {
        All: createAction('zdarzenia/all')
    },
    Badges: {
        All: createAction('badges/all'),
        Earned: createAction('badges/earned'),
        Selected: createAction('badges/selected'),
        Promoted: createAction('badges/promoted'),
    }
};
