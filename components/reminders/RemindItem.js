import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import Actions from "../../redux/Actions";
import GeneralStyles, {main_font_size} from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import moment from "moment";
import useTranslator from "../../hooks/useTranslator";
import {HtmlParser} from "../general/HtmlParser";
import Fonts from "../../constants/Fonts";
import {useNavigation} from "@react-navigation/core";
import Routes from "../../constants/Routes";

const RemindItem = ({id, eventID, title, description, reminderDate, read}) => {
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();
    const translate = useTranslator();
    const today = moment();
    const navigation = useNavigation();

    const eyePress = () => {
        !read ? (
            dispatch(Actions.Notifications.markAsRead({
                id,
                changes: {
                    read: true
                }
            }))
        ) : null
    }

    return (
        <View style={[
            styles.container
        ]}>
            <TouchableOpacity
                style={{
                    flex: 1
                }}
                onPress={() => navigation.navigate(Routes.CalendarEvent, {id: eventID})}
            >
                <View style={[
                    styles.content
                ]}>
                    <Text style={[
                        read ? GeneralStyles.text_regular : GeneralStyles.text_bold,
                        {color: ThemeStyles.dark_text},
                        {marginBottom: 3}
                    ]}>
                        {translate(title)}
                    </Text>
                    <HtmlParser
                        textStyles={{
                            fontSize: main_font_size,
                            fontFamily: read ? Fonts.ProximaNova.Regular : Fonts.ProximaNova.Bold,
                            color: ThemeStyles.dark_text,
                            marginBottom: 3
                        }}
                        html={translate(description)}
                    />
                    <Text style={[
                        GeneralStyles.text_regular,
                        {color: read ? ThemeStyles.dark_text : ThemeStyles.blue_text},
                        {opacity: read ? 0.5 : 1}
                    ]}>
                        {moment.duration(-today.diff(reminderDate)).humanize(true)}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={eyePress}>
                <View style={[
                    GeneralStyles.circle_with_icon,
                    {marginTop: 11, marginLeft: 20},
                    {borderColor: read ? Colors.Manatee : ThemeStyles.blue_text}
                ]}>
                    <MaterialCommunityIcons
                        name="eye-outline"
                        size={22}
                        color={read ? Colors.Manatee : ThemeStyles.icon_color}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 26,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    content: {
        flexShrink: 1
    }
})


export default RemindItem;
