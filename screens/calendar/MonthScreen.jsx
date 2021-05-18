import React from "react";
import Loader from "../../components/general/Loader";
import {Alert, ScrollView, SectionList, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import moment from "moment";
import useTranslator from "../../hooks/useTranslator";
import Layout from "../../constants/Layout";
import useThemeStyles from "../../hooks/useThemeStyles";
import Fonts from "../../constants/Fonts";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import Day from "../../components/calendar/Day";
import {useNavigation} from "@react-navigation/core";
import * as Calendar from "expo-calendar";
import Translations from "../../constants/Translations";
import ColorCard from "../../components/general/ColorCard";
import {categories} from "../../components/tasks/TaskListItem";
import Routes from "../../constants/Routes";
import GeneralStyles from "../../constants/GeneralStyles";
import Container from "../../components/general/Container";

const Days = {
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pl: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
};

const DATA = [
    {
        day: '2020-04-1',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-2',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-3',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 1,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-4',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 5,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 5,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-5',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 3,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-6',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-7',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-8',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 5,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-9',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-10',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-11',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-12',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 3,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-13',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 3,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-14',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-15',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-16',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 4,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-17',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 2,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-18',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 3,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-19',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 3,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
    {
        day: '2020-04-20',
        data: [
            {
                from: '17:00',
                to: '17:30',
                title: 'Title',
                category: 5,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            },
        ]
    },
];

const navigationHeight = 120;

export default React.memo(function MonthScreen({calendar}) {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const locale = useSelector(state => state.locale);
    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [selectedMonth, setSelectedMonth] = React.useState(moment());
    const [events, setEvents] = React.useState(null);
    const [scroll, setScroll] = React.useState(false);

    const calendarWeeks = React.useMemo(() => calendar && weeks(selectedMonth), [calendar, selectedMonth]);

    React.useEffect(() => {
        if (selectedMonth.month() !== selectedDate.month())
            setSelectedMonth(selectedDate);
    }, [selectedDate]);

    // load events of current month
    React.useEffect(() => {
        if (!calendar)
            return;

        // events loading
        setEvents(null);

        const now = moment();

        Calendar.getEventsAsync([calendar.id], now.startOf('month').toDate(), now.endOf('month').toDate())
            .then(events => events.reduce((accumulator, event) => {
                const date = moment(event.startDate).date();

                if (!accumulator[date])
                    accumulator[date] = [];

                accumulator[date].push(event);
                return accumulator;
            }, {}))
            .then(setEvents);
    }, [calendar]);

    if (!calendar)
        return <Loader text={'Loading calendar'}/>;

    const buttonWidth = (width - Layout.paddingHorizontal * 2) / 7;

    const arrowStyle = {width: buttonWidth, alignItems: 'center', justifyContent: 'center'};
    const weekDaysTextStyle = {color: theme.blue_text, textAlign: 'center', marginTop: 20, marginBottom: 10};
    const buttonStyle = {width: buttonWidth};
    const buttonTextStyle = {color: theme.blue_text};

    const prevMonth = () => setSelectedMonth(moment(selectedMonth).subtract(1, 'month'));
    const nextMonth = () => setSelectedMonth(moment(selectedMonth).add(1, 'month'));

    const handleScroll = e => {
        // function for disabling and enabling nested scrollview
        if (e.nativeEvent.contentOffset.y === 0) {
            setScroll(false)
        } else {
            setScroll(true)
        }
    }

    const SectionHeader = ({day}) => {
        const formatDate = format => moment(day, 'YYYY-MM-DD').locale(locale).format(format);

        return(
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: theme.main_bg,
                    width: 50,
                    left: 10,
                    top: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <Text style={[
                    GeneralStyles.text_bold,
                    {
                        color: theme.dark_text,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    }
                ]}>
                    {formatDate('D')}
                </Text>
                <Text style={[
                    GeneralStyles.text_regular,
                    {
                        color: theme.dark_text,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                    }
                ]}>
                    {formatDate('dd')}
                </Text>
            </View>
        )
    };

    return (
        <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => handleScroll(e)}
            scrollEventThrottle={20}
            stickyHeaderIndices={[1]}
        >
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
                                selectedDate={selectedDate}
                                onPress={setSelectedDate}
                                style={buttonStyle}
                                textStyle={buttonTextStyle}
                            />
                        ))}
                    </View>
                ))}
            </Container>

            {events === null && <Loader text={translate(Translations.LoadingEvents)}/>}
            {!!events && (
                <View style={{
                    height: height - navigationHeight
                }}>
                    <SectionList
                        sections={DATA}
                        scrollEventThrottle={20}
                        scrollEnabled={scroll}
                        nestedScrollEnabled={true}
                        stickySectionHeadersEnabled={true}
                        keyExtractor={(item, index) => index}
                        ListHeaderComponent={
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
                                color={categories.find(category => category.value === item.category).color}
                                from={item.from}
                                to={item.to}
                                onPress={() => navigation.navigate(Routes.CalendarEvent)}
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
                                                onPress: () => {},
                                            },
                                        ]
                                    );
                                }}
                            />
                        )}
                        renderSectionHeader={({section: {day}}) => (<SectionHeader day={day}/>)}
                    />
                </View>
            )}
        </ScrollView>
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
            key: date.toISOString() + (isSelectedMonth ? ' Current' : ''),
        });
    }

    return dates;
};
