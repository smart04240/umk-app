import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";
import {Appearance} from "react-native-appearance";

/**
 * @typedef ApplicationState
 * @type {object}
 * @property {('en'|'pl')} locale - active language
 * @property {('light'|'dark')} theme - active theme
 * @property {!boolean} cached - denotes if application data was fetched at least once
 * @property {!boolean} online - denotes if internet is reachable
 * @property {!boolean} tutorialViewed - denotes if tutorial was viewed
 */

/**
 * Application state
 * @type {ApplicationState}
 */
const InitialState = {
    locale: 'en',
    theme: Appearance.getColorScheme() === 'no-preference' ? 'light' : Appearance.getColorScheme(),
    cached: false,
    online: false,
    tutorialViewed: false,
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.DataLoaded, state => {
            state.cached = true;
        })
        .addCase(Actions.Tutorial.Passed, state => {
            state.tutorialViewed = true;
        })
        .addCase(Actions.Tutorial.Reset, state => {
            state.tutorialViewed = false;
        })
        .addCase(Actions.InternetChange, (state, action) => {
            state.online = !!action.payload;
        })
        .addCase(Actions.Locale.Toggle, state => {
            state.locale = state.locale === 'pl' ? 'en' : 'pl';
        })
        .addCase(Actions.Theme.Toggle, state => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        });
});
