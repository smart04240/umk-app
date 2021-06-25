import axios from "axios";
import Storage from "./Storage";

const API = axios.create({
    baseURL: `https://api.gra.umk.pl/`,
});

const Types = {
    UpdateProfile: 'updateProfile',
    CreateTask: 'createTask',
    UpdateTask: 'updateTask',
    CreateEvent: 'createEvent',
    UpdateEvent: 'updateEvent',
};

/**
 * API methods
 * POST requests' configs must have "type" set to one of Types for the Scheduler to work
 */

/**
 * Fetches all data for the application
 * @returns {Promise<AxiosResponse<any>>}
 */
API.fetch = () => API.get('fetch');

API.updateProfile = data => API.post('/profile', data, {type: Types.UpdateProfile});

/**
 * User
 */

API.user = {
    login: () => API.post('/auth/login'),
    logOut: () => {},
    update: (data) => API.post('/update', data),
};

/**
 * Events
 */

API.events = {
    byRange: (startDate, endDate) => API.get(`/calendar_events_by_range?from=${startDate}&till=${endDate}`),
    create: data => API.post(`/calendar_events/user`, data),
    edit: data => {
        data.append('_method', 'PUT');
        return API.post(`/calendar_events/user/` + data.get('id'), data);
    },
    delete: id => API.delete(`/calendar_events/${id}`),
    categories: () => API.get(`calendar_events/categories`),
    notifications: () => API.get('/calendar_events/reminders')
};

/**
 * Markers
 */

API.markers = {
    all: API.getAll = () => API.get(`/markers/`),
    categories: API.categories = () => API.get(`/markers/categories`),
};

/**
 * Scheduler
 */

/**
 * USOS OAuth
 */

API.oauth = {
    getURI: (callbackUri) => API.post('/usos/get_auth_uri', { callback: callbackUri }),
    getAccessToken: (oauth_token, oauth_verifier, secret) => API.post('/usos/get_access_token', {
        oauth_token:    oauth_token,
        oauth_verifier: oauth_verifier,
        secret:         secret
    }),
};

/**
 * Map Types to API methods
 */
const TypeMethods = {
    [Types.UpdateProfile]: API.updateProfile,
};

API.Scheduler = {
    storageKey: type => 'scheduled:' + type,
    set: (type, data) => Storage.set(API.Scheduler.storageKey(type), data),
    get: async type => (await Storage.get(API.Scheduler.storageKey(type))) || [],

    /**
     * Schedule payload for delivering
     * @param config API request config, example:
     * {
     *     "url": "/profile",
     *     "method": "post",
     *     "data": "{\"some\":\"data\"}",
     *     "headers": {
     *       "Accept": "application/json, text/plain",
     *       "Content-Type": "application/json;charset=utf-8"
     *     },
     *     "baseURL": "https://somewebsite.testt",
     *     "transformRequest": [
     *       null
     *     ],
     *     "transformResponse": [
     *       null
     *     ],
     *     "timeout": 0,
     *     "xsrfCookieName": "XSRF-TOKEN",
     *     "xsrfHeaderName": "X-XSRF-TOKEN",
     *     "maxContentLength": -1,
     *     "maxBodyLength": -1,
     *     "type": "profile",
     *     "params": {
     *       "locale": "pl"
     *     }
     *   }
     * @returns {Promise<void>}
     */
    schedule: async function(config) {
        await API.Scheduler.set(config.type, [
            ...(await API.Scheduler.get(config.type)),
            config,
        ]);
    },

    /**
     * Check if there are any scheduled tasks
     * @returns {Promise<boolean>}
     */
    hasTasks: async function() {
        for (const type of Object.values(Types)) {
            if ((await API.Scheduler.get(type))?.length)
                return true;
        }

        return false;
    },

    /**
     * Run scheduled tasks of a certain entity type, one at a time
     * @param type
     * @returns {Promise<void>}
     */
    runType: async function(type) {
        // get scheduled tasks from storage
        const scheduledTasks = await API.Scheduler.get(type);
        // clear storage to prevent task duplication
        await Storage.remove(API.Scheduler.storageKey(type));

        // run tasks one by one, failed gets scheduled again automatically
        for (const task of scheduledTasks) {
            try {
                await TypeMethods[task.type](task.data);
            } catch (e) {
                // do nothing, continue to next task, this one will be scheduled automatically
            }
        }
    },

    /**
     * Run all scheduled tasks, each entity type in separate thread
     * @returns {Promise<void[]>}
     */
    runAll: function() {
        return Promise.all(Object.values(Types).map(API.Scheduler.runType));
    },
};

/**
 * Zdarzenia
 */

 API.zdarzenia = {
    getAll: () => API.get('/zdarzenia/all'),
};

export default API;
