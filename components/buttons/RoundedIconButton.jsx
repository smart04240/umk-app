import React from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import shadowGenerator from "../../helpers/shadowGenerator";
import useThemeStyles from "../../hooks/useThemeStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {Text} from "react-native";
import Fonts from "../../constants/Fonts";

export default function RoundedIconButton({style, icon, iconSize, iconSet, text, ...rest}) {
    const theme = useThemeStyles();
    const IconSet = iconSet || MaterialCommunityIcons;

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.box_bg}, style]} {...rest}>
            <LinearGradient
                style={styles.circle}
                colors={['#034EA2', '#1F6BC1']}
                start={{x: 0, y: 0.5}}
                end={{x: 0.5, y: 0}}
            >
                <IconSet name={icon} size={24} color={'white'}/>
            </LinearGradient>
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
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 99999,
        padding: 10,
    },
    text: {
        flex: 1,
        marginHorizontal: 20,
        fontSize: 16,
        fontFamily: Fonts.ProximaNova.Regular,
    },
};
