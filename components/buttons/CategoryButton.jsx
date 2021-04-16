import React from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import useTranslated from "../../hooks/useTranslated";
import Fonts from "../../constants/Fonts";
import useThemeStyles from "../../hooks/useThemeStyles";

export default function CategoryButton({style, buttonStyle, category, onPress, size}) {
    const theme = useThemeStyles();

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.container, style]}>
                <View style={[styles.button, {backgroundColor: theme.box_bg, width: size, height: size}, buttonStyle]}>
                    <FontAwesome5 name="map-marker" size={32} color={category.color}/>
                </View>
                <Text style={[styles.title, {color: theme.dark_blue_text}]}>
                    {useTranslated(category.title)}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {
    container: {
        alignItems: 'center',
    },
    button: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    title: {
        textAlign: 'center',
        fontFamily: Fonts.ProximaNova.Regular,
    },
    inactive: {
        opacity: 0.5,
    },
};
