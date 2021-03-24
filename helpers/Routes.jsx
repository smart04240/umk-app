import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import {useSelector} from "react-redux";
import LoginScreen from "../screens/LoginScreen";

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
            name: 'login',
            component: LoginScreen,
        },
    ],
    LoggedIn: [
        {
            name: 'profile',
            component: null,
        },
    ],
};

export default function Routes() {
    const user = useSelector(state => state.user);

    const routes = React.useMemo(() => RegisteredScreens[user ? 'LoggedIn' : 'LoggedOut'].map(screen => (
        <Stack.Screen
            key={screen.name}
            name={screen.name}
            // options={() => ({
            // headerTitle: "",
            // headerStyle: {backgroundColor: Colors.dark_blue},
            // headerLeft: () => <MenuToggle/>,
            // headerRight: () => <NavigationRight/>,
            // })}
        >
            {props => <screen.component {...props} extraData={{screenData: screen}}/>}
        </Stack.Screen>
    )), [user]);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={ScreenOptions}>
                {routes}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
