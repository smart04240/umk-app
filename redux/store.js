import AsyncStorage from "@react-native-async-storage/async-storage";
import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import appReducer from "./reducers/appReducer";
import userReducer from "./reducers/userReducer";
import mapReducer from "./reducers/mapReducer";
import remindersReducer from "./reducers/remindersReducer";
import todosReducer from "./reducers/todosReducer";
import notificationsReducer from "./reducers/notificationsReducer";
import toastsReducer from "./reducers/toastsReducer";
import eventCategoriesReducer from "./reducers/eventCategoriesReducer";
import calendarReducer from "./reducers/calendarReducer";

// todo - data carries user-specific information (e.g. profile) along with regular data (e.g. markers), should reset application data on logout?
const reducer = combineReducers({
    app: appReducer,
    reminders: remindersReducer,
    user: userReducer,
    mapData: mapReducer,
    todos: todosReducer,
    notifications: notificationsReducer,
    toasts: toastsReducer,
    eventCategories: eventCategoriesReducer,
    events: calendarReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            // must blacklist react-persist actions in react-toolkit
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
// persistor.purge();
