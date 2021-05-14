import React from "react";
import {Alert, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import useThemeStyles from "../../hooks/useThemeStyles";
import {RangeSelector} from "../../components/calendar/RangeSelector";
import GeneralStyles from "../../constants/GeneralStyles";
import moment from "moment";
import shadowGenerator from "../../helpers/shadowGenerator";
import populateEvents from "../../components/calendar/Packer";
import Layout from "../../constants/Layout";
import Fonts from "../../constants/Fonts";
import {useNavigation} from "@react-navigation/core";
import Routes from "../../constants/Routes";
import {categories} from "../../components/tasks/TaskListItem";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import API from "../../helpers/API";
import {Vibration, Vibrator} from "../../helpers/Vibrator";

function range(from, to) {
    return Array.from(Array(to), (_, i) => from + i);
}

const rowHeight = 60;
const minuteHeight = rowHeight / 60;
const hours = range(0, 24);

const linesTopOffset = 18;
const linesLeftOffset = 35;
const nowCircleSize = 7;
const timeContainerWidth = 43;
const leftMargin = 50;
const nowLeftOffset = linesLeftOffset - nowCircleSize / 2;

const timeHeight = date => (date.getHours() * 60 + date.getMinutes()) * minuteHeight + linesTopOffset;
const getCardHeight = event => {
    let start = new Date(event?.start);
    let end = new Date(event?.end);

    return ((end?.getHours() * 60) + end?.getMinutes()) - ((start?.getHours() * 60) + start?.getMinutes());
};

const eventsArray = [
    {
        start: moment().subtract(1, 'hours').set({minutes: 0}).toDate(),
        end: moment().add(1, 'hour').set({minutes: 0}).toDate(),
        title: {
            en: 'One',
            pl: 'Jeden',
        },
        category: 1,
        id: 1,
    },
    {
        start: moment().subtract(1, 'hours').toDate(),
        end: moment().add(1, 'hour').toDate(),
        title: {
            en: 'Two',
            pl: 'Dwa',
        },
        category: 2,
        id: 2,
    },
    {
        start: moment().subtract(5, 'hours').toDate(),
        end: moment().add(-4, 'hour').toDate(),
        title: {
            en: 'Three',
            pl: 'Trzy',
        },
        category: 3,
        id: 3,
    },
    {
        start: moment().subtract(3, 'hours').toDate(),
        end: moment().add(5, 'hour').toDate(),
        title: {
            en: 'Four',
            pl: 'Cztery',
        },
        category: 4,
        id: 4,
    },
];

export default React.memo(function DayScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const translate = useTranslator();
    const width = useWindowDimensions().width;
    const [show, setShow] = React.useState(false);
    const [day, setDay] = React.useState(new Date());
    const [now, setNow] = React.useState(new Date());
    const [events, setEvents] = React.useState(null);
    const [eventsJSX, setEventsJSX] = React.useState(null);

    const lineWidth = width - linesLeftOffset - Layout.paddingHorizontal * 2;
    const nowLineWidth = lineWidth - nowCircleSize / 2;

    React.useEffect(() => {
        API.events.all().then(console.log)
    },[]);

    // move current time line every minute
    React.useEffect(() => {
        let timeout = null;

        const update = () => {
            timeout = setTimeout(() => {
                setNow(new Date());
                update();
            }, 60000);
        };
        update();

        return () => clearTimeout(timeout);
    }, []);

    // load new events on day change
    React.useEffect(() => {
        setEvents(null);

        // todo replace with loading events from API
        (new Promise((resolve) => {
            setTimeout(() => {
                resolve(eventsArray);
            }, 1000);
        })).then(setEvents);
    }, [day]);

    // memoize events JSX asynchronously
    React.useEffect(() => {
        setEventsJSX(populateEvents(events || [], width - timeContainerWidth - leftMargin, 0).map((event, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.eventContainer,
                    {
                        backgroundColor: categories?.find(category => category.value === event.category).color,
                        height: getCardHeight(event),
                        width: event.width,
                        left: event.left + leftMargin,
                        top: timeHeight(new Date(event.start)),
                    },
                ]}
                // todo update navigation
                onPress={() => navigation.navigate(Routes.CalendarEvent, {id: event.id})}
                onLongPress={() => {
                    Vibrator();
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
                                onPress: () => deleteEvent(event),
                            },
                        ]
                    );
                }}
            >
                <View>
                    <Text style={styles.eventTitle}>{translate(event.title)}</Text>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeRange}>
                            {moment(event.start).format('HH:mm') + ' - ' + moment(event.end).format('HH:mm')}
                        </Text>
                    </View>
                    {getCardHeight(event) > 100 && (
                        <Text numberOfLines={2} style={styles.eventDescription}>
                            {event.description}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        )));
    }, [events, width, translate]);

    const showPicker = () => setShow(true);
    const hidePicker = () => setShow(false);

    const deleteEvent = event => {
        // todo delete from API
        setEvents(eventsArray.filter(e => e.id !== event.id));
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
        >
            <RangeSelector
                day={day}
                show={show}
                onPress={showPicker}
                setClose={hidePicker}
                calendarOnChange={setDay}
                rangeSelectorStyles={styles.picker}
            />
            <View>
                {/* hours */}
                {hours.map((hour, index) => (
                    <View key={index} style={styles.row}>
                        <View style={[styles.timeContainer, {backgroundColor: theme.main_bg}]}>
                            <Text style={styles.time}>
                                {(hour > 9 ? '' : '0') + (hour === 24 ? '00' : hour) + ':00'}
                            </Text>
                        </View>
                        <View style={[styles.lines, {width: lineWidth}]}/>
                    </View>
                ))}

                {/* line */}
                <View style={[{top: timeHeight(now), width: nowLineWidth}, styles.lineNowContainer]}>
                    <View style={[{backgroundColor: theme.timelineNowLine}, styles.lineDot]}/>
                    <View style={[{backgroundColor: theme.timelineNowLine}, styles.lineNow]}/>
                </View>

                {/* events */}
                {eventsJSX}
            </View>
        </ScrollView>
    );
});

const styles = {
    scrollViewContent: {
        paddingHorizontal: Layout.paddingHorizontal,
    },
    picker: {
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
    },
    timeContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 10,
        width: timeContainerWidth,
    },
    time: {
        fontFamily: Fonts.ProximaNova.Regular,
        color: 'gray',
    },
    lines: {
        height: rowHeight,
        top: linesTopOffset,
        left: linesLeftOffset,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'gray',
    },
    lineNowContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 3,
        left: nowLeftOffset,
        ...shadowGenerator(2),
    },
    lineDot: {
        height: nowCircleSize,
        width: nowCircleSize,
        borderRadius: 10,
    },
    lineNow: {
        height: 1,
        width: '100%',
    },
    eventContainer: {
        position: 'absolute',
        flex: 1,
        zIndex: 5,
        borderRadius: 10,
        padding: 10,
        ...shadowGenerator(1),
    },
    eventTitle: {
        ...GeneralStyles.text_bold,
        color: 'white',
    },
    eventDescription: {
        ...GeneralStyles.text_regular,
        color: 'white',
    },
    timeBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 3,
        padding: 2,
    },
    timeRange: {
        color: 'black',
        fontSize: 10,
        fontFamily:
        Fonts.ProximaNova.Regular,
    },
};
