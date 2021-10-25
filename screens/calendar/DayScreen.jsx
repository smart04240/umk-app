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
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import {Vibrator} from "../../helpers/Vibrator";
import {useDispatch, useSelector} from "react-redux";
import API from "../../helpers/API";
import Actions from "../../redux/Actions";
import {getTranslated} from "../../helpers/functions";
import {HtmlParser} from "../../components/general/HtmlParser";
import Colors from "../../constants/Colors";
import useMixedEvents from "../../hooks/useMixedEvents";
import {selectDate} from "../../redux/selectors/eventsSelector";

function range(from, to) {
    return Array.from(Array(to), (_, i) => from + i);
}

const rowHeight = 60;
const minuteHeight = rowHeight / 60;
const hours = range(0, 24);

const linesTopOffset = 18;
const linesLeftOffset = 35;
const nowCircleSize = 7;
const timeContainerWidth = 50;
const leftMargin = 50;
const nowLeftOffset = linesLeftOffset - nowCircleSize / 2;

const timeHeight = date => (date.getHours() * 60 + date.getMinutes()) * minuteHeight + linesTopOffset;
const getCardHeight = event => {
    let start = moment(event.start_date).toDate();
    let end = moment(event.end_date).toDate();

    return ((end?.getHours() * 60) + end?.getMinutes()) - ((start?.getHours() * 60) + start?.getMinutes());
};

export default React.memo(function DayScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const translate = useTranslator();
    const dispatch = useDispatch();
    const width = useWindowDimensions().width;
    const [show, setShow] = React.useState(false);
    const selectedDay = useSelector(state => selectDate(state));
    const [now, setNow] = React.useState(new Date());
    const events = useMixedEvents('day');
    const [eventsJSX, setEventsJSX] = React.useState(null);
    const categories = useSelector(state => state.eventCategories);
    const locale = useSelector(state => state.app.locale);

    const lineWidth = width - linesLeftOffset - Layout.paddingHorizontal * 2;
    const nowLineWidth = lineWidth - nowCircleSize / 2;

    React.useEffect(() => {
        if (!events?.length)
            dispatch(Actions.Toasts.Message(getTranslated(Translations.EventMessage, locale)));
    },[selectedDay]);

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

    // memoize events JSX asynchronously
    React.useEffect(() => {
        setEventsJSX(populateEvents(events || [], width - timeContainerWidth - leftMargin, 0).map((event, index) => {
            let cardHeight = getCardHeight(event);

            return(
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.eventContainer,
                        {
                            backgroundColor: categories?.find(category => String(category.id) === String(event.category_id))?.color || Colors.NoCategoryColor,
                            height: cardHeight,
                            width: Math.round(event?.width),
                            left: event.left + leftMargin,
                            top: timeHeight(moment(event.start_date).toDate()),
                        },
                    ]}
                    // todo update navigation
                    onPress={() => navigation.navigate(Routes.CalendarEvent, event)}
                    onPressIn={() => Vibrator()}
                    onLongPress={!!event.student_id ? () => {
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
                    } : () => {}}
                >
                    <View style={cardHeight < 100 ? {
                        flexDirection: 'row',
                    } : null}>
                        <Text style={[
                            cardHeight < 100 ? {
                                flex: 1,
                            } : null,
                            styles.eventTitle,
                        ]}>
                            {translate(event.title)}
                        </Text>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeRange}>
                                {moment(event.start_date).format('HH:mm') + ' - ' + moment(event.end_date).format('HH:mm')}
                            </Text>
                        </View>
                        {cardHeight > 100 && (
                            <HtmlParser
                                html={translate(event.description)}
                                textStyles={styles.eventDescription}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            )
        }));
    }, [events, width, translate]);

    const showPicker = () => setShow(true);
    const hidePicker = () => setShow(false);

    const deleteEvent = event => API.events.delete(event.id).then(() => dispatch(Actions.Calendar.removeOne(event.id)));

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            delayPressIn={200}
        >
            <RangeSelector
                style={styles.picker}
                date={selectedDay}
                show={show}
                onPress={showPicker}
                setClose={hidePicker}
                onChange={day => {
                    hidePicker();
                    day && dispatch(Actions.Calendar.SetDate(moment(day).toISOString()));
                }}
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 1,
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
        zIndex: 6,
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
        overflow: 'hidden',
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
        height: 18,
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
