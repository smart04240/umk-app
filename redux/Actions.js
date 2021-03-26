import {createAction} from "@reduxjs/toolkit";
import API from "../helpers/API";

export default {
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
        Update: createAction('user/update', payload => {
            API.post('someurl', payload);
            return payload;
        }),
    },
};
