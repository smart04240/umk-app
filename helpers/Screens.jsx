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

// UNLOGGED
import LoginScreen from "../screens/unlogged/LoginScreen";
import RegistrationScreen from "../screens/unlogged/RegistrationScreen";

// START
import StartScreen from "../screens/start/StartScreen";
import TutorialScreen from "../screens/start/TutorialScreen";

// PROFILE
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import ProfileBadgeScreen from "../screens/profile/ProfileBadgeScreen";
import ProfileEventsScreen from "../screens/profile/ProfileEventsScreen";
import ProfileBadgesScreen from "../screens/profile/ProfileBadgesScreen";

// RANKINGS
import RankingsScreen from "../screens/rankings/RankingsScreen";

// MAP
import MapScreen from "../screens/map/MapScreen";

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
			name: Routes.Tutorial,
			title: Translations.Tutorial,
			component: TutorialScreen
		},
		{
			name: Routes.Start,
			title: "UMK Toruń",
			component: StartScreen
		},
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
			name: Routes.ProfileBadges,
			title: Translations.Badges,
			component: ProfileBadgesScreen
		},
        {
            name: Routes.ProfileBadge,
            title: Translations.Badge,
            component: ProfileBadgeScreen,
        },
        {
            name: Routes.ProfileEvents,
            title: Translations.YourEvents,
            component: ProfileEventsScreen,
        },
		{
			name: Routes.Rankings,
			title: Translations.Rankings,
			component: RankingsScreen
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
    )), [user, ThemeStyles, translate]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ScreenOptions}>
                { screens }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
