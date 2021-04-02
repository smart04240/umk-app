import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import {useSelector} from "react-redux";

import useThemeStyles from "../hooks/useThemeStyles";
import Fonts from "../constants/Fonts";
import Routes from "../constants/Routes";

import HeaderRight from "../components/header/HeaderRight";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import BadgeScreen from "../screens/BadgeScreen";

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
			component: RegistrationScreen
		}
    ],
    LoggedIn: [
        {
            name: Routes.Profile,
			header_title: "TWÓJ PROFIL",
            component: ProfileScreen,
        },
		{
			name: Routes.ProfileEdit,
			header_title: "EDYTUJ PROFIL",
			component: EditProfileScreen
		},
		{
			name: Routes.ProfileBadge,
			header_title: "ODZNAKA",
			component: BadgeScreen
		}
    ],
};

export default function Screens() {

    const user = useSelector(state => state.user);
    const ThemeStyles = useThemeStyles();

    // const screens = React.useMemo(() => RegisteredScreens['LoggedIn'].map(screen => (
    const screens = React.useMemo(() => RegisteredScreens[user ? 'LoggedIn' : 'LoggedOut'].map(screen => (
        <Stack.Screen
            key={ screen.name }
            name={ screen.name }
            options={{
            	title: screen.header_title,
				headerStyle: { backgroundColor: ThemeStyles.box_bg, elevation: 0 },
				headerTintColor: ThemeStyles.blue_text,
				headerTitleStyle: {
					color: ThemeStyles.blue_text,
					fontSize: 20,
					fontFamily: Fonts.ProximaNova.Regular,
				},
				headerRight: () => <HeaderRight/>
			}}
        >
            { props => <screen.component {...props} /> }
        </Stack.Screen>
    )), [ user, ThemeStyles ]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ScreenOptions}>
                { screens }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
