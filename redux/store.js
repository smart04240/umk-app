import AsyncStorage from "@react-native-async-storage/async-storage";
import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import themeReducer from "./reducers/themeReducer";
import localeReducer from "./reducers/localeReducer";
import userReducer from "./reducers/userReducer";
import internetReducer from "./reducers/internetReducer";
import mapReducer from "./reducers/mapReducer";
import remindersReducer from "./reducers/remindersReducer";
import todosReducer from "./reducers/todosReducer";

const reducer = combineReducers({
    theme: themeReducer,
    locale: localeReducer,
    reminders: remindersReducer,
    user: userReducer,
    online: internetReducer,
    mapData: mapReducer,
    todos: todosReducer
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
