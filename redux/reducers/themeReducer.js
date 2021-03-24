import {Appearance} from "react-native-appearance";
import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";

const SystemPreference = Appearance.getColorScheme() === 'no-preference' ? 'light' : Appearance.getColorScheme();

export default createReducer(SystemPreference, builder => {
    builder.addCase(Actions.Theme.Toggle, state => {
        return state === 'light' ? 'dark' : 'light';
    });
});
