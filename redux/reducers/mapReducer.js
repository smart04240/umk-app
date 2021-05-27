import {createReducer, createSelector} from "@reduxjs/toolkit";
import Actions from "../Actions";
import {getTranslated} from "../../helpers/functions";

const InitialState = {
    markers: [],
    categories: [],
    selectedCategories: [],
    searchText: '',
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.DataLoaded, (state, action) => ({
            markers: action.payload.markers,
            categories: action.payload.marker_categories,
            selectedCategories: InitialState.selectedCategories,
            searchText: InitialState.searchText,
        }))
        .addCase(Actions.Categories.Toggle, (state, action) => {
            state.selectedCategories = state.selectedCategories.includes(action.payload)
                ? state.selectedCategories.filter(item => item !== action.payload)
                : [...state.selectedCategories, action.payload];
        })
        .addCase(Actions.Categories.Select, (state, action) => {
            state.selectedCategories = [action.payload];
        })
        .addCase(Actions.ChangeMapSearch, (state, action) => {
            state.searchText = action.payload;
        });
});

const filterMarkers = (locale, markers, categories, searchText) => markers.filter(marker => {
    const search = (searchText || '').trim().toLowerCase();
    if (search && !getTranslated(marker.title, locale).toLowerCase().includes(search))
        return false;

    if (!marker.category_id || (categories.length && !categories.includes(marker.category_id)))
        return false;

    return true;
});

export const selectFilteredMarkers = createSelector(
    [
        state => state.app.locale,
        state => state.mapData.markers,
        state => state.mapData.selectedCategories,
        state => state.mapData.searchText,
    ],
    filterMarkers,
);
