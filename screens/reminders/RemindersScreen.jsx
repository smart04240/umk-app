import React from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslator from "../../hooks/useTranslator";
import Actions from "../../redux/Actions";
import {getUnreadRemindersAmount} from "../../redux/reducers/remindersReducer";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import Main from "../../components/general/Main";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import RemindItem from "../../components/reminders/RemindItem";


export default function RemindersScreen(props) {
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();
    const translate = useTranslator();
    const reminders = useSelector(state => state.reminders);
    const reminders_unread_amount = useSelector(state => getUnreadRemindersAmount(state));

    // ToDo show notifications from the store

    return (
        <ScreenWithRoundedHeader>
            <Main>
                <ContainerWithScroll>
                    <View style={{width: "100%", marginBottom: 30}}>
                        <Text style={[
                            GeneralStyles.text_regular,
                            {
                                color: ThemeStyles.dark_text,
                                marginBottom: 8
                            }
                        ]}>
                            {translate(Translations.UnreadNotifications)}: {reminders_unread_amount}
                        </Text>
                        {!!reminders_unread_amount && (
                            <TouchableOpacity onPress={() => dispatch(Actions.Reminders.MarkAsReadAll())}>
                                <Text style={[
                                    GeneralStyles.text_regular,
                                    {
                                        color: ThemeStyles.blue_text,
                                        textDecorationLine: "underline"
                                    }
                                ]}>
                                    {translate(Translations.MarkAllRead)}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {reminders && !!reminders.length && reminders.map((item, index) => <RemindItem key={index} {...item}/>)}
                </ContainerWithScroll>
            </Main>
        </ScreenWithRoundedHeader>
    )
}
