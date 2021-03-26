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
		Update: createAction('user/update')
	}
};
