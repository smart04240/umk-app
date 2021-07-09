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
import {replacePushNotifications} from "../../helpers/Notification";

export default function CalendarScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.app.online);
    const selectedDate = useSelector(state => state.events.selectedDate);

    React.useEffect(() => {
        dispatch(Actions.Calendar.SetDate(moment().toISOString()));
    }, []);

    React.useEffect(() => {
        if (!selectedDate)
            return;

        let startOfMonth = moment(selectedDate).startOf('month').day(-7).format('YYYY-MM-DD'),
            endOfMonth = moment(selectedDate).endOf('month').day(+7).format('YYYY-MM-DD');

        API.events.byRange(startOfMonth, endOfMonth).then(res => {
            console.log(res)
            dispatch(Actions.Calendar.setAll(res?.data));
        });
    }, [selectedDate]);

    useFocusEffect(React.useCallback(() => {
        API.events.notifications().then(async res => await replacePushNotifications(res?.data));
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

    if (!selectedDate)
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
