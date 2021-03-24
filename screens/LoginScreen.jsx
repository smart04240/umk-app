import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import Actions from "../redux/Actions";
import useThemeStyles from "../hooks/useThemeStyles";
import ThemeStyles from "../constants/ThemeStyles";

export default function LoginScreen(props) {
    const dispatch = useDispatch();
    const Styles = useThemeStyles(ThemeStyles.Container);
    return (
        <View style={Styles}>
            <Text>Login</Text>
            <TouchableOpacity onPress={() => dispatch(Actions.Theme.Toggle())}>
                <Text>Toggle theme</Text>
            </TouchableOpacity>
        </View>
    );
};
