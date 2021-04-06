import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const InitialState = {
    markers: [],
    filteredMarkers: [],
    categories: [],
    selectedCategories: [],
    searchText: '',
};

const filterMarkers = (markers, categories, searchText) => markers.filter(marker => {
    const search = searchText.trim().toLowerCase();
    if (search && !marker.title.toLowerCase().includes(search))
        return false;

    if (!marker.category || (categories.length && !categories.includes(marker.category.slug)))
        return false;

    return true;
});

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.Fetch.fulfilled, (state, action) => ({
            markers: action.payload.markers,
            filteredMarkers: action.payload.markers,
            categories: action.payload.categories,
            selectedCategories: InitialState.selectedCategories,
            searchText: InitialState.searchText,
        }))
        .addCase(Actions.ToggleCategory, (state, action) => {
            const selectedCategories = state.selectedCategories.includes(action.payload)
                ? state.selectedCategories.filter(item => item !== action.payload)
                : [...state.selectedCategories, action.payload];
            state.selectedCategories = selectedCategories;
            state.filteredMarkers = filterMarkers(state.markers, selectedCategories, state.searchText);
        })
        .addCase(Actions.ChangeMapSearch, (state, action) => {
            state.searchText = action.payload;
            state.filteredMarkers = filterMarkers(state.markers, state.selectedCategories, action.payload);
        });
});
