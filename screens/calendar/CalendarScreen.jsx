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
import API from "../../helpers/API";
import Actions from "../../redux/Actions";
import {getCalendarsAsync, getEventsAsync, requestCalendarPermissionsAsync} from "expo-calendar";

const getCalendarIds = async () => (await getCalendarsAsync()).map(calendar => calendar.id);

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const selectedDate = useSelector(state => state.events.selectedDate);
    const [permission, setPermission] = React.useState(null);
    const [calendarIds, setCalendarIds] = React.useState(null);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));
        requestCalendarPermissionsAsync().then(({status}) => setPermission(status === 'granted'));
    }, []);

    React.useEffect(() => {
        permission && getCalendarIds().then(setCalendarIds).catch(() => setCalendarIds(false));
    }, [permission]);

    React.useEffect(() => {
        if (!selectedDate || !calendarIds)
            return;

        const rangeStart = moment(selectedDate).startOf('month').day(-7);
        const rangeEnd = moment(selectedDate).endOf('month').day(+7);

        (async () => {
            let remoteEvents = API.events.byRange(rangeStart.format('YYYY-MM-DD'), rangeEnd.format('YYYY-MM-DD')).then(response => response.data);
            let systemEvents = getEventsAsync(calendarIds, rangeStart.toDate(), rangeEnd.toDate()).then(events => {
                events.forEach(event => {
                    event.start_date = event.startDate;
                    event.end_date = event.endDate;
                });
                return events;
            });

            [remoteEvents, systemEvents] = await Promise.all([remoteEvents, systemEvents]);

            dispatch(Actions.Calendar.setAll([...remoteEvents, ...systemEvents].sort((a, b) => {
                if (a.start_date < b.start_date)
                    return -1;

                if (a.start_date > b.start_date)
                    return 1;

                return 0;
            })));
        })();
    }, [selectedDate, calendarIds]);

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

    if (!selectedDate || !calendarIds)
        return null;

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
