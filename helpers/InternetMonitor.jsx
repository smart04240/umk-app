import React from "react";
import {useDispatch, useSelector} from "react-redux";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import Actions from "../redux/Actions";

export default function InternetMonitor() {
    const dispatch = useDispatch();
    const internetInfo = useNetInfo();
    const internet = useSelector(state => state.app.online);

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => dispatchInternetStatus(state));
        unsubscribe();
    }, [internetInfo?.isInternetReachable, internetInfo?.isConnected, internetInfo]);

    const dispatchInternetStatus = data => {
        // If no internet connection
        if (!data?.isConnected) {
            dispatch(Actions.InternetChange(data.isInternetReachable));
            return;
        }
        // If switching between wi-fi and cellular do nothing
        if (data?.type !== internetInfo?.type && !!data?.isConnected)
            return;

        dispatch(Actions.InternetChange(!!data.isInternetReachable));
    }

    return null;
};
