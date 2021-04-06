import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import API from "../helpers/API";

export default {
    API: {
        Fetch: createAsyncThunk('API/fetch', async () => (await API.get('/get/all/data')).data),
    },
    InternetChange: createAction('internetChange'),
    Theme: {
        Toggle: createAction('theme/toggle'),
    },
    Locale: {
        Toggle: createAction('locale/toggle'),
    },
    User: {
        Login: createAction('user/login'),
        Logout: createAction('user/logout'),
        Update: createAction('user/update'),
    },
    ToggleCategory: createAction('categories/set', data => ({
        payload: typeof data === 'string' ? data : data.slug,
    })),
    ChangeMapSearch: createAction('changeMapSearch'),
};
