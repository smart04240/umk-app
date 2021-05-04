import axios from "axios";
import Storage from "./Storage";

const API = axios.create({
    baseURL: '', // todo add API URL
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

API.updateProfile = data => API.post('/profile', data, {type: Types.UpdateProfile});

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
    set: function (type, data) {
        return Storage.set(this.storageKey(type), data);
    },
    get: async function (type) {
        return (await Storage.get(this.storageKey(type))) || [];
    },

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
    schedule: async function (config) {
        await this.set(config.type, [
            ...(await this.get(config.type)),
            config,
        ]);
    },

    hasTasks: async function () {
        for (const type of Object.values(Types)) {
            if ((await this.get(type))?.length)
                return true;
        }

        return false;
    },

    runType: async function (type) {
        // get scheduled tasks from storage
        const scheduledTasks = await this.get(type);
        // clear storage to prevent task duplication
        await Storage.remove(this.storageKey(type));

        // run tasks one by one, failed gets scheduled again automatically
        for (const task of scheduledTasks) {
            await TypeMethods[task.type](task.data);
        }
    },

    runAll: function () {
        return Promise.all(Object.values(Types).map(this.runType));
    },
};

export default API;
