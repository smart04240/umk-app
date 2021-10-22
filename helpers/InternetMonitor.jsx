import React from "react";
import {useDispatch} from "react-redux";
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import Actions from "../redux/Actions";

export default function InternetMonitor() {
    const dispatch = useDispatch();
    const internetInfo = useNetInfo();

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => dispatchInternetStatus(state));
        unsubscribe();
    }, [internetInfo?.isInternetReachable, internetInfo?.isConnected]);

    const dispatchInternetStatus = data => {
        // If no internet connection
        if (!data?.isConnected) {
            dispatch(Actions.InternetChange(data.isInternetReachable));
            return;
        }

        dispatch(Actions.InternetChange(data.isInternetReachable));
    }

    return null;
};
