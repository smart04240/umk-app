import Actions from "../redux/Actions";
import API from "./API";
import {v4 as uuidv4} from "uuid";
import Colors from "../constants/Colors";

export const Interceptors = {
    Scheduler: null,
    Logout: null,
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

    // handling errors and put them to store
    Interceptors.Error = API.interceptors.response.use(
        (res) => {
            let dataObj = {
                color: '',
                code: res?.data?.code,
                message: res?.data?.message
            };

            if (res?.data?.code >= 301) {
                dataObj.color = Colors.Yellow;
            }

            if (res?.data?.code >= 400) {
                dataObj.color = Colors.Red;
            }

            store.dispatch(Actions.Notifications.upsertOne(dataObj))

            return Promise.resolve(res);
        },
        (error) => {
            // ToDo handling other errors
            return Promise.reject(error);
        }
    );

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
