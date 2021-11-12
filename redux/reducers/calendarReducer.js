import {createEntityAdapter, createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

export const eventAdapter = createEntityAdapter({
    sortComparer: (a, b) => {
        if (a.start_date < b.start_date)
            return -1;

        if (a.start_date > b.start_date)
            return 1;

        return 0;
    },
});

/**
 * @typedef CalendarState
 * @type {object}
 * @property {?string} selectedDate - selected date in ISO format
 * @property {?boolean} permissionGranted - denotes if calendar permission has been granted, null if not determined yet
 * @property {Object.<string, string>} systemEventsMap - map of remote events IDs to system events IDs
 * @property {?string} projectCalendarId - ID of UMK system calendar
 * @property {?string[]} otherCalendarIds - IDs of other system calendars
 * @property {Object} events
 * @property {string} error - Fatal calendar error
 */

/**
 * Application state
 * @type {CalendarState}
 */
const InitialState = {
    selectedDate: null,
    permissionGranted: null,
    systemEventsMap: {},
    projectCalendarId: null,
    otherCalendarIds: null,
    events: eventAdapter.getInitialState(),
    error: '',
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.DataLoaded, (state, action) => {
            state.events = eventAdapter.setAll(state.events, action.payload.events);
        })
        .addCase(Actions.Calendar.SetPermission, (state, action) => {
            state.permissionGranted = !!action.payload;
        })
        .addCase(Actions.Calendar.SetCalendarIds, (state, action) => {
            state.projectCalendarId = action.payload.project;
            state.otherCalendarIds = action.payload.others;
        })
        .addCase(Actions.Calendar.SetDate, (state, action) => {
            state.selectedDate = action.payload;
        })
        .addCase(Actions.Calendar.upsertOne, (state, action) => {
            state.events = eventAdapter.upsertOne(state.events, action);
        })
        .addCase(Actions.Calendar.removeOne, (state, action) => {
            state.events = eventAdapter.removeOne(state.events, action);
        })
        .addCase(Actions.Calendar.setAll, (state, action) => {
            state.events = eventAdapter.setAll(state.events, action);
        })
        .addCase(Actions.Calendar.SetError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(Actions.Calendar.SetMap, (state, action) => {
            state.systemEventsMap = action.payload;
        });
});
