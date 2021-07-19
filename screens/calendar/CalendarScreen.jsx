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
import * as Calendar from "expo-calendar";

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const {selectedDate, permissionGranted, projectCalendarId, otherCalendarIds} = useSelector(state => state.calendar);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));
        Calendar.requestCalendarPermissionsAsync().then(({status}) => dispatch(Actions.Calendar.SetPermission(status === 'granted')));
        return () => {
            dispatch(Actions.Calendar.SetDate(null));
        };
    }, []);

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

    if (permissionGranted === false) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(Translations.CalendarPermissionsError)}/>
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
        </WithHeaderConfig>
    );
}
