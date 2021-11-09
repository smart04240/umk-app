import React, {useMemo} from "react";
import ErrorView from "../../components/general/ErrorView";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import WithHeaderConfig from "../../components/layout/WithHeaderConfig";
import DayScreen from "./DayScreen";
import WeekScreen from "./WeekScreen";
import MonthScreen from "./MonthScreen";
import useThemeStyles from "../../hooks/useThemeStyles";
import shadowGenerator from "../../helpers/shadowGenerator";
import GeneralStyles from "../../constants/GeneralStyles";
import Fonts from "../../constants/Fonts";
import Swiper from "react-native-screens-swiper";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import FloatAddButton from "../../components/tasks/FloatAddButton";
import {useNavigation} from "@react-navigation/core";
import Routes from "../../constants/Routes";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import Actions from "../../redux/Actions";
import * as Calendar from 'expo-calendar';
import {getCalendarsAsync} from 'expo-calendar';
import {Modal, Platform, ScrollView, Share, Text, View} from "react-native";
import Button from "../../components/form/Button";

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const {selectedDate, permissionGranted, projectCalendarId, otherCalendarIds} = useSelector(state => state.calendar);

    const [showDebugModal, setShowDebugModal] = React.useState(true);
    const [debugData, setDebugData] = React.useState(null);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));
        requestPermissionsForCalendar();
        return () => {
            dispatch(Actions.Calendar.SetDate(null));
        };
    }, []);

    React.useEffect(() => {
        getCalendarsAsync().then(res => setDebugData(res))
    },[]);

    const onShare = async (message) => {
        try {
            const result = await Share.share({
                message: message,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // useFocusEffect(React.useCallback(() => {
    // API.events.notifications().then(async res => await replacePushNotifications(res?.data));
    // }, []));

    const style = useMemo(() => ({
        pillContainer: {
            ...shadowGenerator(5),
            ...GeneralStyles.bottom_border_radius,
            zIndex: 10,
            backgroundColor: theme.box_bg,
        },
        pillLabel: {
            textTransform: 'uppercase',
            ...GeneralStyles.text_regular,
            color: theme.blue_text,
        },
        activeLabel: {
            fontFamily: Fonts.ProximaNova.Bold,
            color: theme.blue_text,
        },
        borderActive: {
            borderColor: theme.blue_text,
        },
    }), [theme]);

    const requestPermissionsForCalendar = async () => {
        let permissions = {};

        Calendar.requestCalendarPermissionsAsync().then(async res => {
            permissions.calendar = (res?.status === 'granted');

            if (Platform.OS === 'ios') {
                await Calendar.requestRemindersPermissionsAsync().then(res => {
                    permissions.reminders = (res?.status === 'granted')
                });
            }

            dispatch(Actions.Calendar.SetPermission(Platform.OS === 'ios' ? !!(permissions?.calendar && permissions?.reminders) : !!permissions?.calendar));
        });
    }

    if (permissionGranted === false) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(Translations.CalendarPermissionsError)}/>
                </MainWithNavigation>
                <Modal show={showDebugModal}>
                    <View
                        style={{
                            flex: 1,
                            padding: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ScrollView>
                            <Text selectable>
                                {JSON.stringify(debugData, null, '\t')}
                            </Text>
                        </ScrollView>
                        <Button style={{width: '100%'}} label={'Share'} onPress={() => onShare(JSON.stringify(debugData, null, '\t'))}>Share</Button>
                    </View>
                </Modal>
            </WithHeaderConfig>
        );
    }

    if (!selectedDate || !otherCalendarIds || !projectCalendarId) {
        return (
            <WithHeaderConfig borderless={true}>
                <MainWithNavigation/>
                <Modal show={showDebugModal}>
                    <View
                        style={{
                            flex: 1,
                            padding: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ScrollView>
                            <Text selectable>
                                {JSON.stringify(debugData, null, '\t')}
                            </Text>
                        </ScrollView>
                        <Button style={{width: '100%'}} label={'Share'} onPress={() => onShare(JSON.stringify(debugData, null, '\t'))}>Share</Button>
                    </View>
                </Modal>
            </WithHeaderConfig>
        );
    }

    // offline
    if (!isOnline) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(Translations.CalendarOffline)}/>
                </MainWithNavigation>
                <Modal show={showDebugModal}>
                    <View
                        style={{
                            flex: 1,
                            padding: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ScrollView>
                            <Text selectable>
                                {JSON.stringify(debugData, null, '\t')}
                            </Text>
                        </ScrollView>
                        <Button style={{width: '100%'}} label={'Share'} onPress={() => onShare(JSON.stringify(debugData, null, '\t'))}>Share</Button>
                    </View>
                </Modal>
            </WithHeaderConfig>
        );
    }

    const screens = [
        {
            component: DayScreen,
            tabLabel: translate(Translations.Day),
        },
        {
            component: WeekScreen,
            tabLabel: translate(Translations.Week),
        },
        {
            component: MonthScreen,
            tabLabel: translate(Translations.Month),
        },
    ];

    return (
        <WithHeaderConfig borderless={true}>
            <MainWithNavigation>
                <Swiper style={style} data={screens} isStaticPills={true}/>
            </MainWithNavigation>
            <FloatAddButton onPress={() => navigation.navigate(Routes.CalendarCreateEvent, {is_event: true})}/>
            <Modal show={showDebugModal}>
                <View
                    style={{
                        flex: 1,
                        padding: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ScrollView>
                        <Text selectable>
                            {JSON.stringify(debugData, null, '\t')}
                        </Text>
                    </ScrollView>
                    <Button style={{width: '100%'}} onPress={() => onShare(JSON.stringify(debugData, null, '\t'))}>Share'</Button>
                </View>
            </Modal>
        </WithHeaderConfig>
    );
}
