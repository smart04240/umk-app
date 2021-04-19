import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import {useDispatch, useSelector} from 'react-redux';
import Actions from "../../redux/Actions";
import useThemeStyles from '../../hooks/useThemeStyles';
import SidebarMenu from './SidebarMenu';
import SidebarUserInfo from './SidebarUserInfo';
import CloseButton from '../buttons/CloseButton';
import LocaleSwitcher from '../locale/LocaleSwitcher';
import ThemeSwitcher from "../theme/ThemeSwitcher";
import useTranslated from '../../hooks/useTranslated';
import Translations from '../../constants/Translations';
import GeneralStyles from '../../constants/GeneralStyles';
import Layout from "../../constants/Layout";

const DrawerWidth = Layout.width * 0.85;

export default function Drawer({state, navigation, defaultActiveRouteName, progress}) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();

    if (!user)
        return null;

    let currentRouteName = defaultActiveRouteName;
    const route = state.routes[0].state;
    if (route)
        currentRouteName = route.routes[route.index].name;

    return (
        <>
            <Animated.View style={{
                width: DrawerWidth,
                height: '100%',
                transform: [{
                    translateX: Animated.interpolate(progress, {
                        inputRange: [0, 1],
                        outputRange: [-1, 0],
                    }),
                }],
            }}>
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
                                    {useTranslated(Translations.LogOut)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </>
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
