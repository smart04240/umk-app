import React from "react";
import {Text} from "react-native";
import Main from "./Main";
import useThemeStyles from "../../hooks/useThemeStyles";
import {AntDesign} from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import Layout from "../../constants/Layout";

export default function ErrorView({text}) {
    const theme = useThemeStyles();

    return (
        <Main style={main}>
            <AntDesign name="warning" size={Layout.width / 3} color={Colors.Red}/>
            <Text style={{
                fontSize: 24,
                fontFamily: Fonts.ProximaNova.Bold,
                color: theme.dark_text,
            }}>
                {text}
            </Text>
        </Main>
    );
};

const main = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
};
