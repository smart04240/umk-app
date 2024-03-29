import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import shadowGenerator from "../../helpers/shadowGenerator";
import {Vibrator} from "../../helpers/Vibrator";
import {HtmlParser} from "./HtmlParser";
import {textTrim} from "../../helpers/textTrim";

const CircleButton = ({style, theme, icon, onPress}) => (
    <TouchableOpacity style={[styles.circle, {borderColor: theme.blue_text}, style]} onPress={onPress}>
        <MaterialCommunityIcons
            name={icon}
            size={22}
            color={theme.icon_color}
        />
    </TouchableOpacity>
);

export default function ColorCard({title, text, color, from, to, style, onPress, onRead, onEdit, onLongPress, onPressIn, html, isSmall}) {
    const theme = useThemeStyles();

    const Component = onPress ? TouchableOpacity : View;
    const regularTextStyles = [
        GeneralStyles.text_regular,
        {color: theme.dark_text},
    ];

    const longPress = () => {
        if (!onLongPress)
            return;
        Vibrator();
        onLongPress();
    };

    return (
        <Component
            style={[
                styles.card,
                {backgroundColor: theme.box_bg, borderLeftColor: color},
                style,
            ]}
            onPress={onPress}
            onPressIn={onPressIn}
            onLongPress={longPress}
        >
            <View
                style={{
                    flexDirection: 'column',
                    paddingRight: 12,
                }}
            >
                {!!from && <Text style={regularTextStyles}>{from}</Text>}
                {!!to && <Text style={regularTextStyles}>{to}</Text>}
            </View>

            <View style={styles.content}>
                <Text style={[
                    GeneralStyles.text_bold,
                    {
                        color: theme.dark_text,
                        marginBottom: 5,
                    },
                ]}>
                    {title}
                </Text>
                {!!html && (
                    <HtmlParser
                        html={textTrim(html, !isSmall ? 80 : 30)}
                    />
                )}
                {!!text && (
                    <Text style={regularTextStyles}>
                        {text}
                    </Text>
                )}
            </View>

            <View style={styles.actions}>
                {!!onRead && (
                    <CircleButton
                        style={onRead ? {marginBottom: 10} : null}
                        theme={theme}
                        icon={'eye-outline'}
                        onPress={onRead}
                    />
                )}
                {!!onEdit && (
                    <CircleButton
                        theme={theme}
                        icon={'pencil-outline'}
                        onPress={onEdit}
                    />
                )}
            </View>
        </Component>
    );
}

const styles = {
    card: {
        flex: 1,
        ...shadowGenerator(9),
        flexDirection: "row",
        maxHeight: 120,
        borderRadius: 15,
        paddingTop: 14,
        paddingBottom: 10,
        paddingHorizontal: 12,
        borderLeftWidth: 15,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    content: {
        flex: 1,
        overflow: 'hidden',
        flexGrow: 1,
    },
    actions: {
        marginLeft: 20,
        justifyContent: "space-between",
    },
    circle: {
        ...GeneralStyles.row_centered,
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
    },
};
