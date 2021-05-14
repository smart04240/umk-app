import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider, useSelector} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import Screens from "./helpers/Screens";
import * as Font from "expo-font";
import InternetMonitor from "./helpers/InternetMonitor";
import Fonts from './constants/Fonts';
import ReduxAwareInterceptors from "./helpers/ReduxAwareInterceptors";
import "moment/locale/pl";
import DataManager from "./helpers/DataManager";
import FirstLaunchGate from "./helpers/FirstLaunchGate";
import {Toast} from "./components/general/Toast";

ReduxAwareInterceptors(store);

function Main(props) {
    const theme = useSelector(state => state.theme);
    return (
        <>
            <InternetMonitor/>
            <StatusBar style={theme === 'light' ? 'dark' : 'light'}/>
            {!props.loading && (
                <FirstLaunchGate>
                    <DataManager/>
                    <Screens/>
                </FirstLaunchGate>
            )}
            <Toast/>
        </>
    );
}

export default function App() {
	const [loading, setLoading] = React.useState(true);

	const setLoaded = () => setLoading(false);

	React.useEffect(() => {
        Font.loadAsync({
            [Fonts.ProximaNova.Regular]: require('./assets/fonts/ProximaNova-Regular.ttf'),
            [Fonts.ProximaNova.Bold]: require('./assets/fonts/ProximaNova-Bold.ttf'),
            [Fonts.ProximaNova.SemiBold]: require('./assets/fonts/ProximaNova-Semibold.ttf'),
        }).then(setLoaded);
    }, []);

	if (loading)
	    return null;

	const render = bootstrapped => <Main loading={!bootstrapped}/>;

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {render}
            </PersistGate>
        </Provider>
    );
}
