import {eventAdapter} from "../reducers/calendarReducer";
import {createSelector} from "@reduxjs/toolkit";
import moment from "moment";

const {selectAll, selectById} = eventAdapter.getSelectors(state => state.calendar.events);

export const eventsSelectors = {
    All: selectAll,
    byId: selectById,
};

export const selectDate = createSelector(state => state.calendar.selectedDate, date => new Date(date));
export const selectDateMoment = createSelector(state => state.calendar.selectedDate, date => moment(date));
