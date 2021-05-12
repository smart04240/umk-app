import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import Actions from "../../redux/Actions";
import useThemeStyles from '../../hooks/useThemeStyles';
import SidebarMenu from './SidebarMenu';
import SidebarUserInfo from './SidebarUserInfo';
import CloseButton from '../buttons/CloseButton';
import LocaleSwitcher from '../locale/LocaleSwitcher';
import ThemeSwitcher from "../theme/ThemeSwitcher";
import Translations from '../../constants/Translations';
import GeneralStyles from '../../constants/GeneralStyles';
import useTranslator from "../../hooks/useTranslator";

export default function Drawer({state, navigation, defaultActiveRouteName}) {
    const user = useSelector(state => state.user);
    const translate = useTranslator();
    const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();

    if (!user)
        return null;

    let currentRouteName = defaultActiveRouteName;
    const route = state.routes[0].state;
    if (route)
        currentRouteName = route.routes[route.index].name;

    return (
        <View style={styles.sidebar_content}>
            <CloseButton style={styles.close_button} onPress={() => navigation.closeDrawer()}/>
            <ScrollView style={{flex: 1}}>
                <View style={{flexDirection: "row", marginBottom: 35}}>
                    <SidebarUserInfo navigation={navigation}/>
                </View>

                <View style={{flex: 1}}>
                    <SidebarMenu navigation={navigation} route={currentRouteName}/>
                    <LocaleSwitcher/>
                    <ThemeSwitcher style={{marginVertical: 15}}/>

                    <TouchableOpacity style={{marginTop: 40}} onPress={() => dispatch(Actions.User.Logout())}>
                        <Text style={[GeneralStyles.text_regular, {color: ThemeStyles.blue_text}]}>
                            {translate(Translations.LogOut)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = {
    close_button: {
        marginLeft: "auto",
        paddingVertical: 5,
    },
    sidebar_content: {
        flex: 1,
        elevation: 5,
        paddingLeft: 40,
        paddingRight: 10,
        paddingBottom: 24,
    },
};
