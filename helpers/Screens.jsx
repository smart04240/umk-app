import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import {useSelector} from "react-redux";

import useThemeStyles from "../hooks/useThemeStyles";
import useTranslator from "../hooks/useTranslator";

import Fonts from "../constants/Fonts";
import Routes from "../constants/Routes";
import Translations from "../constants/Translations";

import HeaderRight from "../components/header/HeaderRight";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import BadgeScreen from "../screens/BadgeScreen";
import ProfileEventsScreen from "../screens/ProfileEventsScreen";
import MapScreen from "../screens/MapScreen";

const ScreenOptions = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },

    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-layouts.screen.width, 0],
                        }),
                    },
                    {
                        scale: next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.9],
                            })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
};

const Stack = createStackNavigator();

const RegisteredScreens = {
    LoggedOut: [
        {
            name: Routes.Login,
            component: LoginScreen,
        },
        {
            name: Routes.Registration,
            component: RegistrationScreen,
        },
    ],
    LoggedIn: [
        {
            name: Routes.Profile,
            title: Translations.YourProfile,
            component: ProfileScreen,
        },
        {
            name: Routes.ProfileEdit,
            title: Translations.EditProfile,
            component: EditProfileScreen,
        },
        {
            name: Routes.ProfileBadge,
            title: Translations.Badge,
            component: BadgeScreen,
        },
        {
            name: Routes.ProfileEvents,
            title: Translations.YourEvents,
            component: ProfileEventsScreen,
        },
        {
            name: Routes.Map,
            title: Translations.Map,
            component: MapScreen,
        },
    ],
};

export default function Screens() {
    const user = useSelector(state => state.user);
	const theme = useSelector( state => state.theme );

    const ThemeStyles = useThemeStyles();
    const translate = useTranslator();

    // const screens = React.useMemo(() => RegisteredScreens['LoggedIn'].map(screen => (
    const screens = React.useMemo(() => RegisteredScreens[user ? 'LoggedIn' : 'LoggedOut'].map(screen => (
        <Stack.Screen
            key={ screen.name }
            name={ screen.name }
            options={{
                title: translate(screen.title),
                headerStyle: {backgroundColor: ThemeStyles.box_bg, elevation: 0},
                headerTintColor: ThemeStyles.blue_text,
                headerTitleStyle: {
                    color: ThemeStyles.blue_text,
                    fontSize: 20,
                    fontFamily: Fonts.ProximaNova.Regular,
                },
                headerRight: () => <HeaderRight/>
            }}
        >
            {props => <screen.component {...props} />}
        </Stack.Screen>
    )), [user, theme, translate]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ScreenOptions}>
                { screens }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
