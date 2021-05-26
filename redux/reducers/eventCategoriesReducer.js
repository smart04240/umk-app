import {createReducer} from '@reduxjs/toolkit';
import Actions from '../Actions';

export const eventCategories = [];

export default createReducer(eventCategories, builder => {
    builder
        .addCase(Actions.API.DataLoaded, (state, action) => {
            return action.payload.event_categories;
        });
});
