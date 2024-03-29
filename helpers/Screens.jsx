import React from "react";
import * as Linking from "expo-linking";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';
import {useDispatch, useSelector} from "react-redux";
import useThemeStyles from "../hooks/useThemeStyles";
import useTranslator from "../hooks/useTranslator";
import Routes from "../constants/Routes";
import Translations from "../constants/Translations";
import HeaderRight from "../components/header/HeaderRight";
import LoginScreen from "../screens/unlogged/LoginScreen";
import RegistrationScreen from "../screens/unlogged/RegistrationScreen";
import StartScreen from "../screens/start/StartScreen";
import TutorialScreen from "../screens/tutorial/TutorialScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import ProfileBadgeScreen from "../screens/profile/ProfileBadgeScreen";
import ProfileEventsScreen from "../screens/profile/ProfileEventsScreen";
import ProfileBadgesScreen from "../screens/profile/ProfileBadgesScreen";
import RankingsScreen from "../screens/rankings/RankingsScreen";
import TasksListScreen from "../screens/tasks/TasksListScreen";
import TaskSingleScreen from "../screens/tasks/TaskSingleScreen";
import TaskEditScreen from "../screens/tasks/TaskEditScreen";
import RemindersScreen from "../screens/reminders/RemindersScreen";
import MapScreen from "../screens/map/MapScreen";
import GeneralStyles from "../constants/GeneralStyles";
import MarkersListScreen from "../screens/map/MarkersListScreen";
import {default as CustomDrawer} from "../components/sidebar/Drawer";
import shadowGenerator from "./shadowGenerator";
import Layout from "../constants/Layout";
import MarkerScreen from "../screens/map/MarkerScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import CreateEventScreen from "../screens/calendar/CreateEventScreen";
import {CalendarEvent} from "../screens/calendar/CalendarEvent";
import MapOfStudiesScreen from "../screens/map-of-studies/MapOfStudiesScreen";
import SimulationsScreen from "../screens/simulations/SimulationsScreen";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import FirstLoadingGate from "./FirstLoadingGate";
import DataManager from "./DataManager";
import Actions from "../redux/Actions";
import {parse} from "search-params";
import Web from "../screens/unlogged/Web";
import CalendarManager from "./CalendarManager";
import NotificationsManager from "./NotificationsManager";
import Loader from "../components/general/Loader";
import PrivacyPolicyScreen from "../screens/unlogged/PrivacyPolicyScreen";

const ScreenOptions = {
    gestureEnabled: false,
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const RegisteredScreens = {
    LoggedOut: [
        {
            name: Routes.Login,
            component: LoginScreen,
        },
        {
            name: Routes.Web,
            component: Web,
        },
    ],
    PrivacyPolicy: [
        {
            name: Routes.PrivacyPolicy,
            component: PrivacyPolicyScreen
        }
    ],
    LoggedIn: [
        {
            name: Routes.Registration,
            component: RegistrationScreen,
        },
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
            name: Routes.Tasks,
            title: Translations.ToDoList,
            component: TasksListScreen
        },
        {
            name: Routes.TaskSingle,
            title: Translations.ToDoList,
            component: TaskSingleScreen
        },
        {
            name: Routes.TaskEdit,
            title: Translations.ToDoList,
            component: TaskEditScreen
        },
        {
            name: Routes.Reminders,
            title: Translations.Reminders,
            component: RemindersScreen
        },
        {
            name: Routes.MapOfStudies,
            title: Translations.MapOfStudies,
            component: MapOfStudiesScreen
        },
		{
			name: Routes.Simulations,
			title: Translations.Simulations,
			component: SimulationsScreen
		},
        {
            name: Routes.Map,
            title: Translations.Map,
            component: MapScreen,
        },
        {
            name: Routes.MarkersList,
            title: Translations.Map,
            component: MarkersListScreen,
        },
        {
            name: Routes.Marker,
            title: Translations.Map,
            component: MarkerScreen,
        },
        {
            name: Routes.Calendar,
            title: Translations.Calendar,
            component: CalendarScreen,
        },
        {
            name: Routes.CalendarEvent,
            title: Translations.Calendar,
            component: CalendarEvent,
        },
        {
            name: Routes.CalendarCreateEvent,
            title: Translations.Calendar,
            component: CreateEventScreen
        }
    ],
};

const StackScreens = () => {
    const user = useSelector(state => state.user);
    const appliedPrivacyPolicy = useSelector(state => state.app.appliedPrivacyPolicy);
    const tutorialViewed = useSelector(state => state.app.tutorialViewed);
    const authenticating = useSelector(state => state.app.authenticating);
    const loggedIn = !!user?.access_token && !!user?.access_secret;
    const firstLogin = loggedIn && !!user?.isUnregistered;
    const ThemeStyles = useThemeStyles();
    const translate = useTranslator();

    const screens = React.useMemo(() => {
        return (loggedIn ? (appliedPrivacyPolicy ? RegisteredScreens.LoggedIn : RegisteredScreens.PrivacyPolicy) : RegisteredScreens.LoggedOut).filter(screen => {
            if (tutorialViewed && screen.name === Routes.Tutorial)
                return false;

            if (appliedPrivacyPolicy && screen.name === Routes.PrivacyPolicy)
                return false;

            if (!firstLogin && screen.name === Routes.Registration)
                return false;

            return true;
        }).map(screen => (
            <Stack.Screen
                key={screen.name}
                name={screen.name}
                options={{
                    title: translate(screen.title),
                    headerStyle: {
                        backgroundColor: ThemeStyles.box_bg,
                    },
                    headerTintColor: ThemeStyles.blue_text,
                    headerTitleStyle: {
                        ...GeneralStyles.header_title,
                        textAlign: 'center',
                        color: ThemeStyles.blue_text
                    },
                    headerRight: () => <HeaderRight/>
                }}
            >
                {props => <screen.component {...props} />}
            </Stack.Screen>
        ));
    }, [loggedIn, ThemeStyles, appliedPrivacyPolicy, translate]); // do NOT add 'tutorialViewed' or 'firstLogin' to dependencies, only used on app start

    if (authenticating)
        return <Loader text={translate(Translations.Authenticating)}/>;

    if (loggedIn) {
        return (
            <>
                <DataManager/>
                <FirstLoadingGate>
                    <CalendarManager/>
                    <NotificationsManager/>
                    <Stack.Navigator screenOptions={ScreenOptions}>
                        {screens}
                    </Stack.Navigator>
                </FirstLoadingGate>
            </>
        );
    }

    return (
        <Stack.Navigator screenOptions={ScreenOptions}>
            {screens}
        </Stack.Navigator>
    );
};

const DrawerStyles = {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    elevation: 50,
    marginTop: 40,
    paddingTop: 20,
    width: Layout.width * 0.85,
    ...shadowGenerator(20),
};

const RenderDrawerContent = props => <CustomDrawer defaultActiveRouteName={RegisteredScreens.LoggedIn[0].name} {...props}/>;

const prefix = Linking.createURL('/');

export default function Screens() {
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();

    const linking = {
        prefixes: [prefix],
        subscribe: listener => {
            const onReceiveURL = (e) => {
                const params = parse(e.url);

                if (!params.oauth_token || !params.oauth_verifier)
                    return;

                dispatch(Actions.User.USOSAccessToken({
                    oauth_token: params.oauth_token,
                    oauth_verifier: params.oauth_verifier,
                    access_token: null,
                    access_secret: null,
                }));
            };

            Linking.addEventListener('url', onReceiveURL);
            return () => Linking.removeEventListener('url', onReceiveURL);
        },
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer linking={linking}>
                <Drawer.Navigator
                    drawerContent={RenderDrawerContent}
                    drawerPosition={'right'}
                    overlayColor={ThemeStyles.blue_overlay_rgba(0.7)}
                    drawerStyle={[DrawerStyles, {backgroundColor: ThemeStyles.box_bg}]}
                >
                    <Drawer.Screen name={'index'} component={StackScreens}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
