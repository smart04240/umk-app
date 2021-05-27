import {createReducer} from "@reduxjs/toolkit";
import Actions from '../Actions';
import Colors from "../../constants/Colors";
import Translations from "../../constants/Translations";


export default createReducer(null, builder => {
    builder
        .addCase(Actions.Toasts.Danger, (state, action) => {
            return action.payload;
        })
        .addCase(Actions.Toasts.Warning, (state, action) => {
            return action.payload;
        })
        .addCase(Actions.Toasts.Message, (state, action) => {
            return action.payload;
        })
        .addCase(Actions.InternetChange, (state, action) => {
            let isOnline = action.payload;

            return state = {
              color: isOnline ? Colors.Green : Colors.Red,
              message: Translations[isOnline ? 'InternetConnectionConnect' : 'InternetConnectionLost']
            };
        });
});
