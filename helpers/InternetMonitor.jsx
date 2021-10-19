import React from "react";
import {useDispatch} from "react-redux";
import NetInfo from '@react-native-community/netinfo';
import Actions from "../redux/Actions";

export default function InternetMonitor() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        return NetInfo.addEventListener(state => {
            if (!!state?.isInternetReachable && !!state?.isConnected)
                dispatch(Actions.InternetChange(state.isInternetReachable));
        });
    }, []);

    return null;
};
