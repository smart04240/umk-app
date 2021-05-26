import Actions from "../redux/Actions";
import API from "./API";
import Translations from "../constants/Translations";
import {getTranslated} from "./functions";

export const Interceptors = {
    Scheduler: null,
    Logout: null,
    Alert: null,
    Token: null,
};

export default function ReduxAwareInterceptors(store) {
    // automatically schedule failed POST requests
    Interceptors.Scheduler = API.interceptors.response.use(null, error => {
        if (error.config?.method === 'post' && !error.status) {
            // network error, schedule request for later
            API.Scheduler.schedule(error.config);
        }

        return Promise.reject(error);
    });

    // logout if server returns 401
    Interceptors.Logout = API.interceptors.response.use(null, error => {
        if (error.request?.status === 401) {
            store.dispatch(Actions.User.Logout());
        }

        return Promise.reject(error);
    });

    Interceptors.Alerts = API.interceptors.response.use(null, error => {
        const locale = store.getState().locale;

        switch (error.request?.status) {
            case 401: store.dispatch(Actions.Toasts.Warning(getTranslated(Translations.SessionExpired, locale))); break;
            case 500: store.dispatch(Actions.Toasts.Danger(getTranslated(Translations.InternalServerError, locale))); break;
            default:
        }

        return Promise.reject(error);
    });

    // add token to requests
    Interceptors.Token = API.interceptors.request.use(config => {
        const token = store.getState()?.user?.token;

        if (!token)
            return config;

        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + store.getState().user.token;
        return config;
    });
};
