import React from "react";
import {ActivityIndicator, Text} from "react-native";
import useThemeStyles from "../../hooks/useThemeStyles";
import Fonts from "../../constants/Fonts";
import Main from "./Main";

export default function Loader({text, ...rest}) {
    const theme = useThemeStyles();

    return (
        <Main style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: text ? 40 : 0,
        }}>
            <ActivityIndicator color={theme.icon_color} size={'large'} {...rest}/>
            <Text style={{
                marginTop: 20,
                fontSize: 20,
                fontFamily: Fonts.ProximaNova.Bold,
                color: theme.blue_text,
            }}>
                {text}
            </Text>
        </Main>
    );
};
