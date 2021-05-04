import Actions from "../redux/Actions";
import API from "./API";

export const Interceptors = {
    Scheduler: null,
    Logout: null,
    Locale: null,
};

export default function (store) {
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

    // add current locale to request
    Interceptors.Locale = API.interceptors.request.use(config => {
        config.params = config.params || {};
        config.params.locale = store.getState().locale;
        return config;
    });
};
