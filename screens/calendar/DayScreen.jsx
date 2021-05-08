import React from "react";
import {ScrollView, useWindowDimensions, View, Text, TouchableHighlight, Alert} from 'react-native';
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
import {useDispatch, useSelector} from "react-redux";
import {EventsSelectors} from "../../redux/selectors/eventsSelectors";
import {categories} from "../../components/tasks/TaskListItem";
import Actions from "../../redux/Actions";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";
import Colors from "../../constants/Colors";

function range(from, to) {
    return Array.from(Array(to), (_, i) => from + i);
}

const rowHeight = 60;
const minuteHeight = rowHeight / 60;
const hours = range(0, 24);
const timeHeight = date => (date.getHours() * 60 + date.getMinutes()) * minuteHeight;
const getCardHeight = event => {
    let start = new Date(event?.start);
    let end = new Date(event?.end);

    return ((end?.getHours() * 60) + end?.getMinutes()) - ((start?.getHours() * 60) + start?.getMinutes());
};

export default React.memo(function DayScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const width = useWindowDimensions().width;
    const [show, setShow] = React.useState(false);
    const [day, setDay] = React.useState(new Date());
    const [now, setNow] = React.useState(new Date());
    const events = useSelector(state => EventsSelectors.All(state));

    const message = {
        title: useTranslated(Translations.DeleteConfirmTitle),
        description: useTranslated(Translations.DeleteConfirmDescription) + '?'
    };

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

    const deleteEvent = event => {
        Alert.alert(
            message.title,
            message.description,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => dispatch(Actions.Calendar.removeOne(event.id))
                }
            ]
        );
    }

    const renderHours = () => (
        hours.map((hour, index) => (
            <View key={index} style={styles.row}>
                <View style={[styles.timeContainer, {backgroundColor: theme.main_bg}]}>
                    <Text style={[styles.time]}>
                        {(hour > 9 ? '' : '0') + (hour === 24 ? '00' : hour) + ':00'}
                    </Text>
                </View>
                <View style={[styles.lines, {width: '90%'}]}/>
            </View>
        ))
    );

    const renderEvents = () => (
        populateEvents(events, (width - 100), 0).map((event, index) => (
            <TouchableHighlight
                key={index}
                onPress={() => navigation.navigate(Routes.CalendarEvent, {id: event.id})}
                onLongPress={() => deleteEvent(event)}
                activeOpacity={0.85}
                underlayColor={Colors.Blue}
                style={[styles.eventContainer,
                {
                    backgroundColor: categories?.find(category => category.value === event.category).color,
                    height: getCardHeight(event),
                    width: event.width,
                    left: event.left + 50,
                    top: timeHeight(new Date(event.start)) + 18,
                }]}
            >
                <View>
                    <Text style={styles.eventTitle}>{event.title}</Text>
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
            </TouchableHighlight>
    )));

    const renderLine = () => (
        <View style={[{top: timeHeight(now) + 18,
             width: '91%',}, styles.lineNowContainer]}>
            <View style={[{backgroundColor: theme.timelineNowLine}, styles.lineDot]}/>
            <View key={`timeNow`} style={[{backgroundColor: theme.timelineNowLine}, styles.lineNow]}/>
        </View>
    );

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: Layout.paddingHorizontal}}
        >
            <RangeSelector
                day={day}
                show={show}
                onPress={() => setShow(true)}
                setClose={() => setShow(false)}
                calendarOnChange={setDay}
                rangeSelectorStyles={{marginVertical: 20}}
            />
            <View style={{flex: 1}}>
                {renderHours()}
                {renderLine()}
                {renderEvents()}
            </View>
        </ScrollView>
    );
});

const styles = {
    row: {
        flexDirection: 'row',
    },
    timeContainer: {
        position: 'absolute',
        zIndex: 2,
        top: 10,
        width: 43,
    },
    time: {
        fontFamily: Fonts.ProximaNova.Regular,
        color: 'gray',
    },
    lines: {
        height: rowHeight,
        top: 18,
        left: 35,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'gray',
    },
    lineNowContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 3,
        left: 32,
        ...shadowGenerator(2),
    },
    lineDot: {
        height: 7,
        width: 7,
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
        color: 'white'
    },
    eventDescription: {
        ...GeneralStyles.text_regular,
        color: 'white'
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
    }
};
