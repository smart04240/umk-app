import React from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslator from "../../hooks/useTranslator";
import Actions from "../../redux/Actions";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import Main from "../../components/general/Main";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import RemindItem from "../../components/reminders/RemindItem";
import {getUnreadNotifications, NotificationsSelector} from "../../redux/selectors/notificationsSelectors";


export default function RemindersScreen(props) {
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();
    const translate = useTranslator();
    const notifications = useSelector(state => NotificationsSelector.All(state));
    const unreadNotifications = useSelector(state => getUnreadNotifications(state));

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
                            {translate(Translations.UnreadNotifications)}: {unreadNotifications.length}
                        </Text>
                        {!!unreadNotifications && (
                            <TouchableOpacity onPress={() => dispatch(Actions.Notifications.markAsReadAll())}>
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
                    {!!notifications && notifications?.map((item, index) => <RemindItem key={index} {...item}/>)}
                </ContainerWithScroll>
            </Main>
        </ScreenWithRoundedHeader>
    )
}
