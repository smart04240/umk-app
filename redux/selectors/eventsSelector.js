import {eventAdapter} from "../reducers/calendarReducer";
import {createSelector} from "@reduxjs/toolkit";
import moment from "moment";

const {selectAll, selectById, selectIds, selectEntities} = eventAdapter.getSelectors(state => state.events);

export const eventsSelectors = {
    All: selectAll,
    byId: selectById,
};

export const selectDate = createSelector(state => state.events.selectedDate, date => new Date(date));
export const selectDateMoment = createSelector(state => state.events.selectedDate, date => moment(date));

const filterBy = range => (date, events) => {
    return Object.values(events).filter(event => {
        const rangeStart = moment(date).startOf(range);
        const rangeEnd = moment(date).endOf(range);

        return rangeStart.isSameOrBefore(event.start_date) && rangeEnd.isSameOrAfter(event.end_date);
    });
};

export const eventsByMonthPerDay = createSelector(
    [
        state => state.events.selectedDate,
        state => state.events.entities,
    ],
    (date, events) => {
        const rangeStart = moment(date).startOf('month');
        const rangeEnd = moment(date).endOf('month');
        const days = {};

        Object.values(events).forEach(event => {
            if (rangeStart.isAfter(event.start_date) || rangeEnd.isBefore(event.end_date))
                return;

            const dayNumber = moment(event.start_date).format('YYYY-MM-DD');

            if (!days[dayNumber])
                days[dayNumber] = [];

            days[dayNumber].push(event);
        });

        return days;
    }
);

export const eventsByDay = createSelector(
    [
        state => state.events.selectedDate,
        state => state.events.entities,
    ],
    filterBy('day')
);

export const eventsByWeek = createSelector(
    [
        state => state.events.selectedDate,
        state => state.events.entities,
    ],
    filterBy('week')
);

export const eventsByMonth = createSelector(
    [
        state => state.events.selectedDate,
        state => state.events.entities,
    ],
    filterBy('month')
);
