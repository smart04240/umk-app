import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/general/Loader";
import useTranslator from "../hooks/useTranslator";
import Translations from "../constants/Translations";
import {useDispatch, useSelector} from "react-redux";
import ErrorView from "../components/general/ErrorView";
import API from "./API";
import Actions from "../redux/Actions";

export default function FirstLaunchGate({children}) {
    const dispatch = useDispatch();
    const translate = useTranslator();
    const isOnline = useSelector(state => state.online);
    const [firstLaunch, setFirstLaunch] = React.useState(null);

    React.useEffect(() => {
        // check if redux was persisted
        AsyncStorage.getItem('persist:root').then(value => setFirstLaunch(value === null));
    }, []);

    // hydrate store from API on first launch
    React.useEffect(() => {
        if (!firstLaunch)
            return;

        API.fetch().then(response => {
            dispatch(Actions.API.DataLoaded(response.data));
            setFirstLaunch(false);
        });
    }, [firstLaunch]);

    // checking if it is first launch in background
    if (firstLaunch === null)
        return children;

    // is first launch but no internet
    if (firstLaunch && !isOnline)
        return <ErrorView text={translate(Translations.FirstLoadingRequired)}/>;

    // visible loading
    if (firstLaunch && isOnline)
        return <Loader text={translate(Translations.FirstLoading)}/>;

    return children;
};
