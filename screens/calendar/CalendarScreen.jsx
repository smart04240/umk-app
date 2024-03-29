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
import {Platform} from "react-native";

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const {
        selectedDate,
        permissionGranted,
        projectCalendarId,
        otherCalendarIds,
        error,
    } = useSelector(state => state.calendar);
    const [activeIndex, setActiveIndex] = React.useState(0);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));
        requestPermissionsForCalendar();
        return () => {
            dispatch(Actions.Calendar.SetDate(null));
        };
    }, []);

    const style = useMemo(() => ({
        pillContainer: {
            ...shadowGenerator(5),
            ...GeneralStyles.bottom_border_radius,
            zIndex: 10,
            backgroundColor: theme.box_bg,
        },
        staticPillsContainer: {
            height: 35,
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

    const props = useMemo(() => ({activeIndex}), [activeIndex]);

    const requestPermissionsForCalendar = () => {
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

    if (permissionGranted === false || error) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(error || Translations.CalendarPermissionsError)}/>
                </MainWithNavigation>
            </WithHeaderConfig>
        );
    }

    if (!selectedDate || !otherCalendarIds || !projectCalendarId) {
        return (
            <WithHeaderConfig borderless={true}>
                <MainWithNavigation/>
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
            </WithHeaderConfig>
        );
    }

    const screens = [
        {
            component: DayScreen,
            tabLabel: translate(Translations.Day),
            props,
        },
        {
            component: WeekScreen,
            tabLabel: translate(Translations.Week),
            props,
        },
        {
            component: MonthScreen,
            tabLabel: translate(Translations.Month),
        },
    ];

    const onActiveScreenChange = index => setActiveIndex(index);

    return (
        <WithHeaderConfig borderless={true}>
            <MainWithNavigation>
                <Swiper
                    style={style}
                    data={screens}
                    onActiveScreenChange={onActiveScreenChange}
                    isStaticPills
                />
            </MainWithNavigation>
            <FloatAddButton onPress={() => navigation.navigate(Routes.CalendarCreateEvent, {is_event: true})}/>
        </WithHeaderConfig>
    );
}
