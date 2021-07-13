import {createReducer, createSelector} from "@reduxjs/toolkit";
import Actions from "../Actions";

const reminders_sample = [
    {
        id: 1,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        when: "21 minut temu",
        read: true
    },
    {
        id: 2,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        when: "21 minut temu"
    },
    {
        id: 3,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        when: "21 minut temu",
        read: true
    },
    {
        id: 4,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        when: "21 minut temu"
    },
    {
        id: 5,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        when: "21 minut temu",
        read: true
    },
    {
        id: 6,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        when: "21 minut temu"
    },
    {
        id: 7,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        when: "21 minut temu",
        read: true
    },
    {
        id: 8,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        when: "21 minut temu"
    },
    {
        id: 9,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        when: "21 minut temu",
        read: true
    },
    {
        id: 10,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        when: "21 minut temu"
    }
];

// ToDo replace reminders reducer with notifications

export default createReducer(reminders_sample || [], builder => {
    builder.addCase(Actions.Reminders.MarkAsRead, (state, action) => {
        const found_reminder = state.find(item => item.id === action.payload);
        if (found_reminder) found_reminder.read = true;
    });
    builder.addCase(Actions.Reminders.MarkAsReadAll, state => {
        return state.map(reminder => ({...reminder, read: true}));
    });
});


export const getUnreadRemindersAmount = createSelector(
    state => state.reminders,
    reminders => Array.isArray(reminders) ? reminders.filter(item => !item.read).length : 0
)
