import Actions from "../redux/Actions";
import API from "./API";
import Translations from "../constants/Translations";
import {getTranslated} from "./functions";
import {store} from "../redux/store";

const Interceptors = {
    register: () => Object.values(Interceptors).forEach(method => method.use?.()),

    References: {
        Scheduler: null,
        Logout: null,
        Toasts: null,
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
    Toasts: {
        use: () => {
            Interceptors.References.Toasts = API.interceptors.response.use(null, error => {
                const locale = store.getState().app.locale;

                switch (error.request?.status) {
                    case 401:
                        store.dispatch(Actions.Toasts.Warning(getTranslated(Translations.SessionExpired, locale)));
                        break;
                    case 422:
                        store.dispatch(Actions.Toasts.Warning(getTranslated(Translations.UnprocessableEntity, locale)));
                        break;
                    case 500:
                        store.dispatch(Actions.Toasts.Danger(getTranslated(Translations.InternalServerError, locale)));
                        break;
                    default:
                }

                return Promise.reject(error);
            });
        },
        eject: () => API.interceptors.response.eject(Interceptors.References.Toasts),
    },
    // add token to requests
    Token: {
        use: () => {
            Interceptors.References.Token = API.interceptors.request.use(config => {
                const token = store.getState()?.user?.token;
                const access_token  = store.getState()?.user?.access_token;
                const access_secret = store.getState()?.user?.access_secret;

                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + token;
                }
                if (access_token && access_secret) {
                    config.params = config.params || {};
                    config.params.access_token  = access_token;
                    config.params.access_secret = access_secret;
                }
                return config;
            })
        },
        eject: () => API.interceptors.request.eject(Interceptors.References.Token),
    },
};

export default Interceptors;
