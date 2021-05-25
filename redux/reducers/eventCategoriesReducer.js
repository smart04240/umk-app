import {createReducer} from '@reduxjs/toolkit';
import Actions from '../Actions';
import API from "../../helpers/API";

export const eventCategories = [];

export default createReducer(eventCategories, builder => {
    builder
        .addCase(Actions.EventCategories.getCategories, (state, action) => {
           return API.events.categories.then(res => console.log(res))
        });
});
