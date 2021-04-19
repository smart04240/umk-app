import {createReducer, createSelector} from "@reduxjs/toolkit";
import Actions from "../Actions";
import {getTranslated} from "../../helpers/functions";

const Categories = {
    Departments: {
        title: {
            en: 'Departments',
            pl: 'Wydziały',
        },
        slug: 'departments',
        color: '#A3238F',
    },
    Aule: {
        title: {
            en: 'Aule',
            pl: 'Aule',
        },
        slug: 'aule',
        color: '#034EA2',
    },
    Laboratories: {
        title: {
            en: 'Laboratories',
            pl: 'Laboratoria',
        },
        slug: 'laboratories',
        color: '#00AEEF',
    },
    Photocopying: {
        title: {
            en: 'Photocopying',
            pl: 'Ksero',
        },
        slug: 'photocopying',
        color: '#00A651',
    },
    Dormitories: {
        title: {
            en: 'Dormitories',
            pl: 'Akademiki',
        },
        slug: 'dormitories',
        color: '#A6CE39',
    },
    Food: {
        title: {
            en: 'Food outlets',
            pl: 'Punkty gastronomiczne',
        },
        slug: 'food',
        color: '#FFCB05',
    },
    Libraries: {
        title: {
            en: 'Libraries',
            pl: 'Biblioteki',
        },
        slug: 'libraries',
        color: '#F58220',
    },
    Others: {
        title: {
            en: 'Others',
            pl: 'Inni',
        },
        slug: 'others',
        color: '#ED1D24',
    },
};

const Markers = [
    {
        id: 1,
        title: {
            en: 'Marker 1',
            pl: 'POI 1',
        },
        address: "Test Address 1, 111 City, Poland",
        latitude: 53.0196473,
        longitude: 18.6108992,
        category: Categories.Departments,
    },
    {
        id: 2,
        title: {
            en: 'Marker 2',
            pl: 'POI 2',
        },
        address: "Test Address 2, 222 City, Poland",
        latitude: 53.1196473,
        longitude: 18.6108992,
        category: Categories.Laboratories,
    },
];

const InitialState = {
    markers: [...Markers],
    categories: [...Object.values(Categories)],
    selectedCategories: [],
    searchText: '',
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.Fetch.fulfilled, (state, action) => ({
            markers: action.payload.markers,
            categories: action.payload.categories,
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

    if (!marker.category || (categories.length && !categories.includes(marker.category.slug)))
        return false;

    return true;
});

export const selectFilteredMarkers = createSelector(
    [
        state => state.locale,
        state => state.mapData.markers,
        state => state.mapData.selectedCategories,
        state => state.mapData.searchText,
    ],
    filterMarkers,
);
