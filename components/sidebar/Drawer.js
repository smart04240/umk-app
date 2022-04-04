import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native";
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
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SidebarLogosIconEn, SidebarLogosIconPl} from "../../assets/images/svg/svgIcons";

export default function Drawer({state, navigation, defaultActiveRouteName}) {
    const offset = useSafeAreaInsets();
    const user = useSelector(state => state.user);
    const locale = useSelector(state => state.app.locale);
    const translate = useTranslator();
    const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();

    // must provide default for first screen, route state only appears after navigation (!)
    let currentRouteName = defaultActiveRouteName;
    const route = state.routes[0].state;
    if (route)
        currentRouteName = route.routes[route.index].name;

    const logout = () => {
        navigation.closeDrawer();
        dispatch(Actions.User.Logout());
    };

    return (
        <View style={[styles.sidebar_content]}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                }}
            >
                <View
                    style={{
                        flex: 0.9,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {locale === 'en' ? (
                        <SidebarLogosIconEn/>
                    ) : (
                        <SidebarLogosIconPl/>
                    )}
                </View>
                <View
                    style={{
                        flex: 0.1,
                        paddingRight: 10
                    }}
                >
                    <CloseButton style={styles.close_button} onPress={navigation.closeDrawer}/>
                </View>
            </View>
            <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{
                    paddingLeft: 40,
                    paddingRight: 10,
                    paddingBottom: 24,
                }}
            >
                <View style={{flexDirection: "row", marginBottom: 35}}>
                    <SidebarUserInfo navigation={navigation}/>
                </View>

                <View style={{flex: 1}}>
                    <SidebarMenu navigation={navigation} route={currentRouteName}/>
                    <LocaleSwitcher/>
                    <ThemeSwitcher style={{marginVertical: 15}}/>

                    <TouchableOpacity style={{marginTop: 40}} onPress={logout}>
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
    },
};
