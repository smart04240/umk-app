import React from "react";
import {Alert, SectionList, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import moment from "moment";
import useTranslator from "../../hooks/useTranslator";
import Layout from "../../constants/Layout";
import useThemeStyles from "../../hooks/useThemeStyles";
import Fonts from "../../constants/Fonts";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import Day from "../../components/calendar/Day";
import {useNavigation} from "@react-navigation/core";
import Translations from "../../constants/Translations";
import ColorCard from "../../components/general/ColorCard";
import Routes from "../../constants/Routes";
import GeneralStyles from "../../constants/GeneralStyles";
import Container from "../../components/general/Container";
import Actions from "../../redux/Actions";
import {eventsByMonthPerDay, selectDateMoment} from "../../redux/selectors/eventsSelector";
import {getAllScheduledNotificationsAsync} from "expo-notifications";
import API from "../../helpers/API";
import {cancelPushNotification} from "../../helpers/Notification";

const Days = {
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pl: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
};

const SectionHeader = ({day}) => {
    const theme = useThemeStyles();
    const locale = useSelector(state => state.app.locale);

    const formatDate = format => moment(day, 'YYYY-MM-DD').locale(locale).format(format);

    return (
        <View style={{
            position: 'absolute',
            backgroundColor: theme.main_bg,
            width: 50,
            left: 10,
            top: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Text style={[
                GeneralStyles.text_bold,
                {
                    color: theme.dark_text,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                },
            ]}>
                {formatDate('D')}
            </Text>
            <Text style={[
                GeneralStyles.text_regular,
                {
                    color: theme.dark_text,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                },
            ]}>
                {formatDate('dd')}
            </Text>
        </View>
    );
};

export default React.memo(function MonthScreen() {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const width = useWindowDimensions().width;
    const locale = useSelector(state => state.app.locale);
    const selectedDate = useSelector(state => selectDateMoment(state));
    const events = useSelector(state => eventsByMonthPerDay(state));
    const eventCategories = useSelector(state => state.eventCategories);
    const [selectedMonth, setSelectedMonth] = React.useState(moment());
    const [notifications, setNotifications] = React.useState([]);

    const calendarWeeks = React.useMemo(() => weeks(selectedMonth), [selectedMonth]);
    const sections = React.useMemo(() => {
        const sections = [];
        const from = selectedDate.format('YYYY-MM-DD');
        Object.keys(events).forEach(date => date >= from && sections.push({
            day: date,
            data: events[date],
        }));
        return sections;
    }, [events]);

    const buttonWidth = (width - Layout.paddingHorizontal * 2) / 7;
    const arrowStyle = {width: buttonWidth, alignItems: 'center', justifyContent: 'center'};
    const weekDaysTextStyle = {color: theme.blue_text, textAlign: 'center', marginTop: 20, marginBottom: 10};
    const buttonStyle = {width: buttonWidth};
    const buttonTextStyle = {color: theme.blue_text};

    React.useEffect(() => {
        if (selectedMonth.month() !== selectedDate.month())
            setSelectedMonth(selectedDate);
    }, [selectedDate]);

    React.useEffect(() => {
        getAllScheduledNotificationsAsync().then(setNotifications);
    }, []);

    const setSelectedDate = date => dispatch(Actions.Calendar.SetDate(date.toISOString()));
    const prevMonth = () => dispatch(Actions.Calendar.SetDate(moment(selectedDate).subtract(1, 'month').toISOString()));
    const nextMonth = () => dispatch(Actions.Calendar.SetDate(moment(selectedDate).add(1, 'month').toISOString()));

    const deleteEvent = event => {
        API.events.delete(event.id).then(async res => {
            if (res?.status === 200) {
                dispatch(Actions.Calendar.removeOne(event.id))

                if (event.reminder)
                    await cancelPushNotification(event.id, notifications);
            }
        });
    };

    return (
        <SectionList
            sections={sections}
            stickySectionHeadersEnabled={true}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={
                <>
                    <Container>
                        <View style={styles.controls}>
                            <TouchableOpacity style={arrowStyle} onPress={prevMonth}>
                                <Feather name="arrow-left" size={22} color={theme.icon_color}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlCenter}>
                                <Text style={{
                                    fontFamily: Fonts.ProximaNova.Regular,
                                    color: theme.blue_text,
                                    fontSize: 24,
                                    textAlign: 'center',
                                    textTransform: 'capitalize',
                                    marginRight: 10,
                                }}>
                                    {selectedMonth.locale(locale).format('MMMM YYYY')}
                                </Text>
                                <MaterialCommunityIcons name="chevron-down" size={24} color={theme.icon_color}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={arrowStyle} onPress={nextMonth}>
                                <Feather name="arrow-right" size={22} color={theme.icon_color}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.day_names}>
                            {translate(Days).map(day => (
                                <View key={day} style={buttonStyle}>
                                    <Text style={weekDaysTextStyle}>
                                        {day}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {calendarWeeks.map(week => (
                            <View key={week[0].key} style={styles.day_names}>
                                {week.map(dayObject => (
                                    <Day
                                        key={dayObject.key}
                                        text={dayObject.day}
                                        date={dayObject}
                                        events={events[dayObject.formattedDay]}
                                        categories={eventCategories}
                                        selectedDate={selectedDate}
                                        onPress={setSelectedDate}
                                        style={buttonStyle}
                                        textStyle={buttonTextStyle}
                                    />
                                ))}
                            </View>
                        ))}
                    </Container>
                    <View style={{paddingLeft: 20}}>
                        <Text style={[
                            GeneralStyles.text_bold,
                            {
                                color: theme.dark_text,
                            }
                        ]}>
                            {translate(Translations.CalendarEventsTitle)}
                        </Text>
                    </View>
                </>
            }
            ListFooterComponent={<View style={{height: 20}}/>}
            renderItem={({item}) => (
                <ColorCard
                    style={{
                        width: width - 100,
                        left: 60
                    }}
                    title={item.title}
                    text={item.description}
                    color={eventCategories?.find?.(category => category.id === item.category)?.color}
                    from={moment(item.start_date).format('HH:mm')}
                    to={moment(item.end_date).format('HH:mm')}
                    onPress={() => navigation.navigate(Routes.CalendarEvent, item)}
                    onLongPress={() => {
                        Alert.alert(
                            translate(Translations.DeleteConfirmTitle),
                            translate(Translations.DeleteConfirmDescription) + '?',
                            [
                                {
                                    text: translate(Translations.Cancel),
                                    style: "cancel"
                                },
                                {
                                    text: "OK",
                                    onPress: () => deleteEvent(item),
                                },
                            ]
                        );
                    }}
                />
            )}
            renderSectionHeader={({section: {day}}) => (<SectionHeader day={day}/>)}
        />
    );
});

const styles = {
    main: {
        padding: Layout.paddingHorizontal,
    },
    controls: {
        flexDirection: 'row',
    },
    controlCenter: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    day_names: {
        flexDirection: 'row',
    },
};

const weeks = date => {
    const momentDate = moment(date);
    const dates = calendarDates(momentDate);
    const weeks = [];
    while (dates.length > 0) {
        const week = dates.splice(0, 7);

        /* Skip week if all its days are from another month */
        let shouldSkip = true;
        week.forEach(day => {
            if (momentDate.isSame(day.date, 'month'))
                shouldSkip = false;
        });

        if (!shouldSkip)
            weeks.push(week);
    }

    return weeks;
};

const calendarDates = selectedDate => {
    const firstOfMonth = moment(selectedDate).startOf('month').day() - 1;
    const lastOfMonth = moment(selectedDate).endOf('month').day() - 1;

    const firstDayOfGrid = moment(selectedDate).startOf('month').subtract(firstOfMonth + 7, 'days');
    const lastDayOfGrid = moment(selectedDate).endOf('month').subtract(lastOfMonth - 7, 'days');

    const now = moment();
    const dates = [];

    for (let i = firstDayOfGrid.date(); i < firstDayOfGrid.date() + lastDayOfGrid.diff(firstDayOfGrid, 'days'); i++) {
        const date = moment(firstDayOfGrid).date(i);
        const isSelectedMonth = moment(selectedDate).isSame(date, 'month');
        dates.push({
            isToday: now.isSame(date, 'day'),
            isSelectedMonth,
            date,
            day: date.date(),
            formattedDay: date.format('YYYY-MM-DD'),
            key: date.toISOString() + (isSelectedMonth ? ' Current' : ''),
        });
    }

    return dates;
};
