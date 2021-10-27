import React from "react";
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import useThemeStyles from "../hooks/useThemeStyles";
import Actions from "../redux/Actions";
import shadowGenerator from "../helpers/shadowGenerator";
import Toast from "react-native-tm";
import Constants from 'expo-constants';
import {Vibrator} from "./Vibrator";
import {getTranslated} from "./functions";
import {InternetConnectedIcon, InternetLostIcon} from "../assets/images/svg/svgIcons";

export default function ToastManager(props) {
    const statusBarHeight = Constants.statusBarHeight;
    const theme = useThemeStyles();
    const dispatch = useDispatch();
    const toast = useSelector(state => state.toasts);
    const locale = useSelector(state => state.app.locale);
    const isOnline = useSelector(state => state.app.online);

    const cleanup = () => dispatch(Actions.Toasts.Cleanup());

    const isEmptyToast = dataToCheck => {
        if (typeof dataToCheck === 'string' && dataToCheck?.length === 0)
            return true;

        if (typeof dataToCheck === 'object' && Object.keys(toast?.message).length === 0 && Object.getPrototypeOf(toast?.message) === Object.prototype)
            return true;

        return false;
    }

    React.useEffect(() => {
        if (!isEmptyToast(toast?.message))
            Vibrator();
    },[toast]);

    return (
        <Toast
            show={!isEmptyToast(toast?.message)}
            withClose
            onHide={cleanup}
            animationType={'bounce'}
            statusBarHeight={statusBarHeight}
            style={{
                toast: {
                    backgroundColor: theme.main_bg,
                    padding: 20,
                    marginVertical: 5,
                    marginHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: toast?.color,
                    borderRadius: 5,
                    ...shadowGenerator(10)
                },
            }}
        >
            {!!toast?.withLoader && (
                (isOnline) ? (
                    <InternetConnectedIcon/>
                ) : (
                    <InternetLostIcon/>
                )
            )}
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', color: theme.dark_text}}> {getTranslated(toast?.message || props.message, locale)}</Text>
            </View>
        </Toast>
    );
};
