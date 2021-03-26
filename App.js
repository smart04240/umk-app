import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider, useSelector} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import Routes from "./helpers/Routes";
import * as Font from "expo-font";
import InternetMonitor from "./helpers/InternetMonitor";
import Fonts from './constants/Fonts';
import ReduxAwareInterceptors from "./helpers/ReduxAwareInterceptors";

ReduxAwareInterceptors(store);

const Main = React.memo(props => {
    const theme = useSelector(state => state.theme);
    return (
        <>
            <InternetMonitor/>
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

	const [ loading, setLoading ] = React.useState( true );

	React.useEffect(() => {
        Font.loadAsync({
            [Fonts.ProximaNova.Regular]: require('./assets/fonts/ProximaNova-Regular.ttf'),
            [Fonts.ProximaNova.Bold]: require('./assets/fonts/ProximaNova-Bold.ttf'),
            [Fonts.ProximaNova.SemiBold]: require('./assets/fonts/ProximaNova-Semibold.ttf')
        }).then(() => setLoading( false ));
    }, []);

	if ( loading ) return null;

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {bootstrapped => <Main loading={!bootstrapped}/>}
            </PersistGate>
        </Provider>
    );
}
