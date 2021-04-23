import React from "react";
import Loader from "../../components/general/Loader";
import {ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import moment from "moment";
import useTranslator from "../../hooks/useTranslator";
import Layout from "../../constants/Layout";
import useThemeStyles from "../../hooks/useThemeStyles";
import Fonts from "../../constants/Fonts";
import {Feather} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import range from 'lodash.range';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Day from "../../components/calendar/Day";
import {usePrevious} from "react-native-screens-swiper/helpers/usePrevious";
import ErrorView from "../../components/general/ErrorView";

const Days = {
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    pl: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
};

export default React.memo(function MonthScreen({calendar}) {
    const translate = useTranslator();
    const theme = useThemeStyles();
    const width = useWindowDimensions().width;
    const locale = useSelector(state => state.locale);
    const [selectedDate, setSelectedDate] = React.useState(moment());
    const [selectedMonth, setSelectedMonth] = React.useState(moment());

    const calendarWeeks = React.useMemo(() => calendar && weeks(selectedMonth), [calendar, selectedMonth]);

    React.useEffect(() => {
        if (selectedMonth.month() !== selectedDate.month())
            setSelectedMonth(selectedDate);
    }, [selectedDate]);

    if (!calendar)
        return <Loader text={'Loading calendar'}/>;

    const buttonWidth = (width - Layout.paddingHorizontal * 2) / 7;

    const weekDaysTextStyle = {color: theme.blue_text, textAlign: 'center', marginTop: 20, marginBottom: 10};
    const buttonStyle = {width: buttonWidth};
    const buttonTextStyle = {color: theme.blue_text};

    const prevMonth = () => setSelectedMonth(moment(selectedMonth).subtract(1, 'month'));
    const nextMonth = () => setSelectedMonth(moment(selectedMonth).add(1, 'month'));

    return (
        <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlLeft} onPress={prevMonth}>
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
                <TouchableOpacity style={styles.controlRight} onPress={nextMonth}>
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

            <ErrorView text={'work in progress'}/>
        </ScrollView>
    );
});

const styles = {
    main: {
        flex: 1,
        padding: Layout.paddingHorizontal,
    },
    controls: {
        flexDirection: 'row',
    },
    controlLeft: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
    },
    controlCenter: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlRight: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    day_names: {
        flexDirection: 'row',
    },
};

const weeks = date => {
    const dates = calendarDates(date);
    const weeks = [];
    while (dates.length > 0) {
        const week = dates.splice(0, 7);

        /* Skip week if all its days are from another month */
        let shouldSkip = true;
        week.forEach(day => {
            if (moment(date).isSame(moment(day.date), 'month'))
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

    const firstDayOfGrid = moment(selectedDate).startOf('month').subtract(firstOfMonth, 'days');
    const lastDayOfGrid = moment(selectedDate).endOf('month').subtract(lastOfMonth, 'days').add(7, 'days');
    const startCalendar = firstDayOfGrid.date();

    const now = moment();

    return range(
        startCalendar,
        startCalendar + lastDayOfGrid.diff(firstDayOfGrid, 'days'),
    ).map(day => {
        const date = moment(firstDayOfGrid).date(day);
        const isSelectedMonth = moment(selectedDate).isSame(date, 'month');
        return {
            isToday: now.isSame(date, 'day'),
            isSelectedMonth,
            date,
            day: date.date(),
            key: date.toISOString() + (isSelectedMonth ? ' Current' : ''),
        };
    });
};
