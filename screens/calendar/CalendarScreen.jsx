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
import * as Calendar from 'expo-calendar';
import {Platform} from "react-native";
import Colors from "../../constants/Colors";

const CalendarTitle = 'UMK Calendar';

const createCalendar = async () => {
    const source = Platform.OS === 'ios'
        ? (await Calendar.getDefaultCalendarAsync()).source
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

const getCalendar = async () => {
    const calendar = (await Calendar.getCalendarsAsync()).find(calendar => calendar.title === CalendarTitle);
    if (!calendar) {
        await createCalendar();
        return await getCalendar();
    } else
        return calendar;
};

/**
 * @returns {string|undefined}
 */
const extractAddress = event => {
    if (!event)
        return '';

    if (event?.show_location_link)
        return event.location_link;

    return event?.marker?.address;
};

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const selectedDate = useSelector(state => state.events.selectedDate);
    const remoteEventsMap = useSelector(state => state.events.remoteEventsMap);
    const [permission, setPermission] = React.useState(null);
    const [calendar, setCalendar] = React.useState(null);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));

        Calendar.requestCalendarPermissionsAsync().then(({status}) => setPermission(status === 'granted'));
    }, []);

    React.useEffect(() => {
        permission && getCalendar().then(setCalendar).catch(() => setCalendar(false));
    }, [permission]);

    React.useEffect(() => {
        if (!selectedDate || !calendar)
            return;

        let startOfMonth = moment(selectedDate).startOf('month').day(-7),
            endOfMonth = moment(selectedDate).endOf('month').day(+7);

        API.events.byRange(startOfMonth.format('YYYY-MM-DD'), endOfMonth.format('YYYY-MM-DD')).then(async res => {
            if (!res?.data)
                return;

            const map = {...remoteEventsMap};
            const allRemoteIds = (await API.events.allIds()).data;

            for (const event of res.data) {
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

                if (event?.reminder_offset)
                    details.alarms.push({
                        relativeOffset: -(event.reminder_offset / 60),
                        method: Calendar.AlarmMethod.ALARM,
                    });

                if (!localEventId)
                    localEventId = await Calendar.createEventAsync(calendar.id, details);
                else
                    await Calendar.updateEventAsync(localEventId, details);

                map[remoteEventId] = localEventId;
            }

            for (const remoteId in map) {
                if (!allRemoteIds.includes(parseInt(remoteId))) {
                    map[remoteId] && await Calendar.deleteEventAsync(map[remoteId]);
                    delete map[remoteId];
                }
            }

            dispatch(Actions.Calendar.SetMap(map));
            dispatch(Actions.Calendar.setAll(res?.data));
        });
    }, [selectedDate, calendar, translate]);

    useFocusEffect(React.useCallback(() => {
        // API.events.notifications().then(async res => await replacePushNotifications(res?.data));
    }, []));

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

    if (!selectedDate && !permission)
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
