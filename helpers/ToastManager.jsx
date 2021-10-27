import React from "react";
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import useThemeStyles from "../hooks/useThemeStyles";
import Actions from "../redux/Actions";
import shadowGenerator from "../helpers/shadowGenerator";
import Toast from "react-native-tm";
import Constants from 'expo-constants';
import {Vibrator} from "./Vibrator";
import {InternetConnectedIcon, InternetLostIcon} from "../assets/images/svg/svgIcons";
import useTranslator from "../hooks/useTranslator";

export default function ToastManager() {
    const statusBarHeight = Constants.statusBarHeight;
    const theme = useThemeStyles();
    const dispatch = useDispatch();
    const toast = useSelector(state => state.toasts);
    const translate = useTranslator();
    const isOnline = useSelector(state => state.app.online);

    const message = translate(toast?.message);

    const cleanup = () => dispatch(Actions.Toasts.Cleanup());

    React.useEffect(() => {
        message && Vibrator();
    }, [message]);

    return (
        <Toast
            show={!!message}
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
                (isOnline) ? <InternetConnectedIcon/> : <InternetLostIcon/>
            )}
            <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', color: theme.dark_text}}> {message}</Text>
            </View>
        </Toast>
    );
};
