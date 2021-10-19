import React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import shadowGenerator from "../../helpers/shadowGenerator";
import useThemeStyles from "../../hooks/useThemeStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {Text, View} from "react-native";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export default function RoundedIconButton({style, icon, iconSize, iconSet, text, ...rest}) {
    const theme = useThemeStyles();
    const IconSet = iconSet || MaterialCommunityIcons;

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.box_bg}, style]} {...rest}>
            <View
                style={{
                    flex: 0.2
                }}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        overflow: 'hidden',
                        borderRadius: 99999,
                    }}
                >
                    <LinearGradient
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        colors={[Colors.PrussianBlue, Colors.Blue]}
                        start={{x: 0, y: 0.5}}
                        end={{x: 0.5, y: 0}}
                    >
                        <IconSet name={icon} size={28} color={'white'}/>
                    </LinearGradient>
                </View>
            </View>
            <Text style={[styles.text, {color: theme.dark_text}]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = {
    button: {
        flexDirection: 'row',
        ...shadowGenerator(5),
        borderRadius: 40,
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        flex: 0.8,
        marginHorizontal: 20,
        fontSize: 16,
        fontFamily: Fonts.ProximaNova.Regular,
    },
};
