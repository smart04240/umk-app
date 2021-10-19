import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import GeneralStyles, {isExtraSmallDevice} from "../../constants/GeneralStyles";
import Fonts from '../../constants/Fonts';
import Routes from '../../constants/Routes';
import {getUnreadNotifications} from "../../redux/selectors/notificationsSelectors";

const RemindersBell = props => {
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const route = useRoute();

    const reminders_unread_amount = useSelector(state => getUnreadNotifications(state));
    const reminders_shown_amount = reminders_unread_amount.length >= 10 ? "9+" : reminders_unread_amount.length;
    const remind_icon = route.name === Routes.Reminders ? "bell" : "bell-outline";

    return (
        <TouchableOpacity
            style={[styles.remind_button, !isExtraSmallDevice && {padding: 10}]}
            onPress={() => navigation.navigate(Routes.Reminders)}
        >

            <MaterialCommunityIcons name={remind_icon} size={24} color={ThemeStyles.icon_color}/>

            {!!reminders_unread_amount.length && (
                <View style={styles.reminders_circle}>
                    <Text style={styles.reminders_amount}>
                        {reminders_shown_amount}
                    </Text>
                </View>
            )}

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    remind_button: {
        position: "relative"
    },
    reminders_circle: {
        ...GeneralStyles.row_centered,
        backgroundColor: Colors.Red,
        position: "absolute",
        right: 2,
        top: 2,
        width: 18,
        height: 18,
        borderRadius: 18
    },

    reminders_amount: {
        fontSize: 12,
        fontFamily: Fonts.ProximaNova.Regular,
        color: Colors.White
    }
})

export default RemindersBell;
