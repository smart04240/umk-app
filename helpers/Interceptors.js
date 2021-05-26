import Actions from "../redux/Actions";
import API from "./API";
import Translations from "../constants/Translations";
import {getTranslated} from "./functions";
import {store} from "../redux/store";

const Interceptors = {
    register: () => Object.keys(Interceptors).forEach(method => method.use?.()),

    References: {
        Scheduler: null,
        Logout: null,
        Alert: null,
        Token: null,
    },

    // automatically schedule failed POST requests
    Scheduler: {
        use: () => {
            Interceptors.References.Scheduler = API.interceptors.response.use(null, error => {
                if (error.config?.method === 'post' && !error.status) {
                    // network error, schedule request for later
                    API.Scheduler.schedule(error.config);
                }

                return Promise.reject(error);
            });
        },
        eject: () => API.interceptors.response.eject(Interceptors.References.Scheduler),
    },
    // logout if server returns 401
    Logout: {
        use: () => {
            Interceptors.References.Logout = API.interceptors.response.use(null, error => {
                if (error.request?.status === 401) {
                    store.dispatch(Actions.User.Logout());
                }

                return Promise.reject(error);
            });
        },
        eject: () => API.interceptors.response.eject(Interceptors.References.Logout),
    },
    // throw toasts on errors
    Alert: {
        use: () => {
            Interceptors.References.Alert = API.interceptors.response.use(null, error => {
                const locale = store.getState().app.locale;

                switch (error.request?.status) {
                    case 401:
                        store.dispatch(Actions.Toasts.Warning(getTranslated(Translations.SessionExpired, locale)));
                        break;
                    case 500:
                        store.dispatch(Actions.Toasts.Danger(getTranslated(Translations.InternalServerError, locale)));
                        break;
                    default:
                }

                return Promise.reject(error);
            });
        },
        eject: () => API.interceptors.response.eject(Interceptors.References.Alert),
    },
    // add token to requests
    Token: {
        use: () => {
            Interceptors.References.Token = API.interceptors.request.use(config => {
                const token = store.getState()?.user?.token;

                if (!token)
                    return config;

                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + store.getState().user.token;
                return config;
            })
        },
        eject: () => API.interceptors.request.eject(Interceptors.References.Token),
    },
};

export default Interceptors;
