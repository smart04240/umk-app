import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider, useSelector} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import Routes from "./helpers/Routes";

const Main = React.memo(props => {
    const theme = useSelector(state => state.theme);
    return (
        <>
            <StatusBar style={theme === 'light' ? 'dark' : 'light'}/>
            {!props.loading && (
                <>
                    <Routes/>
                </>
            )}
        </>
    );
});

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {bootstrapped => <Main loading={!bootstrapped}/>}
            </PersistGate>
        </Provider>
    );
}
