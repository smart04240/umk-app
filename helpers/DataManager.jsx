import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/general/Loader";
import useTranslator from "../hooks/useTranslator";
import Translations from "../constants/Translations";
import {useSelector} from "react-redux";
import ErrorView from "../components/general/ErrorView";
import API from "./API";

export default function DataManager({children}) {
    const translate = useTranslator();
    const isOnline = useSelector(state => state.online);
    const [firstLaunch, setFirstLaunch] = React.useState(null);

    React.useEffect(() => {
        AsyncStorage.getItem('persist:root').then(value => setFirstLaunch(value === null));
    }, []);

    // when becoming online, run scheduled tasks (if any), then fetch new data
    React.useEffect(() => {
        if (!isOnline)
            return;

        API.Scheduler.hasTasks().then(hasTasks => {
            if (!hasTasks)
                return;

            try {
                // todo await scheduled tasks
            } catch (e) {
                // do nothing, continue to next task, this one will be scheduled automatically
            }
        }).then(() => {
            // todo fetch new data and dispatch it into redux
        });
    }, [isOnline]);

    // checking if is first launch
    if (firstLaunch === null)
        return <Loader/>;

    // is first launch but no internet
    if (firstLaunch && !isOnline)
        return <ErrorView text={translate(Translations.FirstLoadingRequired)}/>;

    // visible loading
    if (firstLaunch && isOnline)
        return <Loader text={translate(Translations.FirstLoading)}/>;

    // background loading
    return children;
};
