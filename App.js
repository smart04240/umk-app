import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Text, View} from 'react-native';
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <View>
                    <Text>Open up App.js to start working on your app!</Text>
                    <StatusBar style="auto"/>
                </View>
            </PersistGate>
        </Provider>
    );
}
