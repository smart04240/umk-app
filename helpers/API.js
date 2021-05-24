import axios from "axios";
import Storage from "./Storage";

const API = axios.create({
    baseURL: `https://api.umk.nfinity.pl`,
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
 * Events
 */

API.events = {
    all: API.getAllEvents = () => API.get(`/calendar/all`),
    create: API.createEvent = data => API.post('/calendar/create', data),
    edit: API.editEvent = data => API.put('/calendar/update', data),
    delete: API.deleteEvent = id => API.delete(`/calendar/?id=${id}`),

    getWithParams: API.getEventByOption = params => API.post(`/calendar/getListByOption`),
    deleteFile: API.deleteFile = ({fileId, calendarId}) => API.delete(`/calendar/file?file_id=${fileId}&calendar_id=${calendarId}`),
    getInfo: API.getInfo = () => API.get('/calendar/info'),
    getStudentGroupInfo: API.getStudentGroupInfo = () => API.get('/mobile/calendar/student_group?student_group_type=2')
};

/**
 * Map
 */

API.map = {
    all: API.getAll = () => API.get(`/mobile/map/all`),
    create: API.create = data => API.post('/mobile/map', data),
    edit: API.edit = data => API.put('/mobile/map/update', data),
    delete: API.delete = id => API.delete(`/mobile/map?id=${id}`),
};

/**
 * Scheduler
 */

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

export default API;
