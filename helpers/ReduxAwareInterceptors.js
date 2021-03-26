import Actions from "../redux/Actions";
import API from "./API";

export default function (store) {
    // automatically schedule failed POST requests
    API.interceptors.response.use(null, error => {
        if (error.config?.method === 'post' && !error.status) {
            // console.log(Object.keys(error))
            // console.log(error.config)
            // todo - a network error, schedule request for later
        }

        return Promise.reject(error);
    });

    // logout if server returns 401
    API.interceptors.response.use(null, error => {
        if (error.request?.status === 401) {
            store.dispatch(Actions.User.Logout());
        }

        return Promise.reject(error);
    });

    // add current locale to request
    API.interceptors.request.use(config => {
        config.params = config.params || {};
        config.params.locale = store.getState().locale;
        return config;
    });
};
