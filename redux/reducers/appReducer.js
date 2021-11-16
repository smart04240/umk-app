import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";
import {Appearance} from "react-native-appearance";
import {setDeviceLang} from "../../helpers/setDeviceLang";

/**
 * @typedef ApplicationState
 * @type {object}
 * @property {('en'|'pl')} locale - active language
 * @property {('light'|'dark')} theme - active theme
 * @property {!boolean} cached - denotes if application data was fetched at least once
 * @property {!boolean} online - denotes if internet is reachable
 * @property {!boolean} tutorialViewed - denotes if tutorial was viewed
 * @property {!boolean} authenticating - denotes if student is being authenticated
 */

/**
 * Application state
 * @type {ApplicationState}
 */
const InitialState = {
    locale: setDeviceLang(),
    theme: Appearance.getColorScheme() === 'no-preference' ? 'light' : Appearance.getColorScheme(),
    cached: false,
    online: true,
    tutorialViewed: false,
    authenticating: false,
};

export default createReducer(InitialState, builder => {
    builder
        .addCase(Actions.API.DataLoaded, state => {
            state.cached = true;
        })
        .addCase(Actions.User.Logout, state => {
            state.cached = false;
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
        })
        .addCase(Actions.User.USOSAccessToken.rejected, state => {
            state.authenticating = false;
        })
        .addCase(Actions.User.USOSAccessToken.fulfilled, state => {
            state.authenticating = false;
        })
        .addCase(Actions.User.USOSAccessToken.pending, state => {
            state.authenticating = true;
        });
});
