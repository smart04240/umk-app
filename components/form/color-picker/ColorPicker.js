import React from 'react';
import {Text, View} from "react-native";
import {ColoredButton} from "./ColoredButton";
import useThemeStyles from "../../../hooks/useThemeStyles";

export const ColorPicker = ({selectedColor, label, colors, onPressColorButton}) => {
    const ThemeStyles = useThemeStyles();

    return (
        <View
            style={{
                paddingBottom: 30,
            }}
        >
            <Text
                style={{
                    color: ThemeStyles.dark_text
                }}
            >
                {label}
            </Text>
            <View
                style={{
                    paddingVertical: 10,
                    flexDirection: 'row'
                }}
            >
                {colors?.map((item, index) => (
                    <ColoredButton
                        key={index}
                        color={item}
                        activeColorStyles={selectedColor === item && {borderWidth: 4, borderColor: ThemeStyles.blue_text}}
                        onPress={() => onPressColorButton(item)}
                    />
                ))}
            </View>
        </View>
    );
}
