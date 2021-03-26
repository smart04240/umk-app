import {createAction} from "@reduxjs/toolkit";

export default {
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
