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
import {useFocusEffect, useNavigation} from "@react-navigation/core";
import Routes from "../../constants/Routes";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import API from "../../helpers/API";
import Actions from "../../redux/Actions";
import * as Calendar from "expo-calendar";
import {Platform} from "react-native";
import Colors from "../../constants/Colors";

const extractAddress = event => {
    if (!event)
        return '';

    if (event?.show_location_link)
        return event.location_link;

    return event?.marker?.address;
};

const CalendarTitle = 'UMK Calendar';

const getDefaultCalendarSource = async () => {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
};

/**
 * Create calendar for UMK events
 * @returns {Promise<string>} New calendar ID
 */
const createCalendar = async () => {
    const source = Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : {isLocalAccount: true, name: CalendarTitle};
    return await Calendar.createCalendarAsync({
        title: CalendarTitle,
        color: Colors.PrussianBlue,
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: source.id,
        source: source,
        name: 'umkCalendar',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
};

/**
 * Get calendar ID that contains UMK events
 * @returns {Promise<string>} Calendar ID
 */
const getCalendarId = async () => {
    const calendar = (await Calendar.getCalendarsAsync()).find(calendar => calendar.title === CalendarTitle);
    return calendar ? calendar.id : await createCalendar();
};

/**
 * Get calendar IDs that do not contain UMK events
 * @returns {Promise<string[]>} Array of calendar IDs
 */
const getCalendarIds = async () => {
    const ids = [];

    for (const calendar of await Calendar.getCalendarsAsync()) {
        if (calendar.title === CalendarTitle)
            continue;

        ids.push(calendar.id);
    }

    return ids;
};

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const {selectedDate, remoteEventsMap} = useSelector(state => state.events);
    const [permission, setPermission] = React.useState(null);
    const [calendarId, setCalendarId] = React.useState(null);
    const [calendarIds, setCalendarIds] = React.useState(null);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));
        Calendar.requestCalendarPermissionsAsync().then(({status}) => setPermission(status === 'granted'));
        return () => {
            dispatch(Actions.Calendar.SetDate(null))
        };
    }, []);

    React.useEffect(() => {
        if (!permission)
            return;

        getCalendarId().then(setCalendarId).catch(() => setCalendarId(false));
        getCalendarIds().then(setCalendarIds).catch(() => setCalendarIds(false));
    }, [permission]);

    useFocusEffect(React.useCallback(() => {
        if (!selectedDate || !calendarIds || !calendarId)
            return;

        const rangeStart = moment(selectedDate).startOf('month').day(-7);
        const rangeEnd = moment(selectedDate).endOf('month').day(+7);

        (async () => {
            let remoteEvents = API.events.byRange(rangeStart.format('YYYY-MM-DD'), rangeEnd.format('YYYY-MM-DD')).then(response => response.data);
            let systemEvents = Calendar.getEventsAsync(calendarIds, rangeStart.toDate(), rangeEnd.toDate()).then(events => {
                events.forEach(event => {
                    event.start_date = event.startDate;
                    event.end_date = event.endDate;
                });
                return events;
            });
            let allRemoteIds = API.events.allIds().then(response => response.data);

            [remoteEvents, systemEvents, allRemoteIds] = await Promise.all([remoteEvents, systemEvents, allRemoteIds]);

            const map = {...remoteEventsMap};

            for (const event of remoteEvents) {
                const remoteEventId = String(event.id);
                let localEventId = map[remoteEventId];
                const details = {
                    title: translate(event.title),
                    location: extractAddress(event),
                    notes: translate(event.description)?.replace(/[^a-zA-Z ]/g, "").slice(1, -1),
                    startDate: event.start_date,
                    endDate: event.end_date,
                    allDay: !!event.is_full_day,
                    alarms: [],
                };

                if (event.reminder_offset) {
                    details.alarms.push({
                        relativeOffset: -(event.reminder_offset / 60),
                        method: Calendar.AlarmMethod.ALERT,
                    });
                }

                if (!localEventId)
                    localEventId = await Calendar.createEventAsync(calendarId, details);
                else
                    await Calendar.updateEventAsync(localEventId, details);

                map[remoteEventId] = localEventId;
            }

            for (const remoteId in map) {
                if (!allRemoteIds.includes(parseInt(remoteId))) {
                    map[remoteId] && Calendar.deleteEventAsync(map[remoteId]);
                    delete map[remoteId];
                }
            }

            dispatch(Actions.Calendar.SetMap(map));

            dispatch(Actions.Calendar.setAll([...remoteEvents, ...systemEvents].sort((a, b) => {
                if (a.start_date < b.start_date)
                    return -1;

                if (a.start_date > b.start_date)
                    return 1;

                return 0;
            })));
        })();
    }, [selectedDate, calendarIds, calendarId]));

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

    if (permission === false) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(Translations.CalendarPermissionsError)}/>
                </MainWithNavigation>
            </WithHeaderConfig>
        );
    }

    if (!selectedDate || !calendarIds || !calendarId) {
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
