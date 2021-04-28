import React, {useMemo} from "react";
import ErrorView from "../../components/general/ErrorView";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import * as Calendar from "expo-calendar";
import {Platform} from "react-native";
import WithHeaderConfig from "../../components/layout/WithHeaderConfig";
import DayScreen from "./DayScreen";
import WeekScreen from "./WeekScreen";
import MonthScreen from "./MonthScreen";
import useThemeStyles from "../../hooks/useThemeStyles";
import shadowGenerator from "../../helpers/shadowGenerator";
import GeneralStyles from "../../constants/GeneralStyles";
import Fonts from "../../constants/Fonts";
import Swiper from "react-native-screens-swiper";
import Colors from "../../constants/Colors";
import MainWithNavigation from "../../components/general/MainWithNavigation";

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

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const [permission, setPermission] = React.useState(null);
    const [calendar, setCalendar] = React.useState(null);

    React.useEffect(() => {
        Calendar.requestCalendarPermissionsAsync().then(({status}) => {
            if (status !== 'granted') {
                setPermission(false);
                return;
            }

            if (Platform.OS === 'android') {
                setPermission(true);
                return;
            }

            // reminders only on iOS
            Calendar.requestRemindersPermissionsAsync().then(({status}) => setPermission(status === 'granted'));
        });
    }, []);

    React.useEffect(() => {
        permission && getCalendar().then(setCalendar).catch(() => setCalendar(false));
    }, [permission]);

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

    // asking for permission
    if (permission === null)
        return null;

    // permission denied
    if (!permission) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(Translations.CalendarPermissionsError)}/>
                </MainWithNavigation>
            </WithHeaderConfig>
        );
    }

    // error while retrieving/creating calendar
    if (calendar === false) {
        return (
            <WithHeaderConfig semitransparent={true}>
                <MainWithNavigation>
                    <ErrorView text={translate(Translations.CalendarRetrievalError)}/>
                </MainWithNavigation>
            </WithHeaderConfig>
        );
    }

    // all good, calendar is being loaded (but not loaded yet)

    const props = {calendar};

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
            props,
        },
    ];

    return (
        <WithHeaderConfig borderless={true}>
            <MainWithNavigation>
                <Swiper style={style} data={screens} isStaticPills={true}/>
            </MainWithNavigation>
        </WithHeaderConfig>
    );
}
