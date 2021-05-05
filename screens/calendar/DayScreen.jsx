import React from "react";
import {ScrollView, useWindowDimensions, View, Text, TouchableOpacity} from 'react-native';
import useThemeStyles from "../../hooks/useThemeStyles";
import {RangeSelector} from "../../components/calendar/RangeSelector";
import GeneralStyles from "../../constants/GeneralStyles";
import moment from "moment";
import shadowGenerator from "../../helpers/shadowGenerator";
import populateEvents from "../../components/calendar/Packer";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Fonts from "../../constants/Fonts";
import {useNavigation} from "@react-navigation/core";
import Routes from "../../constants/Routes";

function range(from, to) {
    return Array.from(Array(to), (_, i) => from + i);
}

const rowHeight = 60;
const minuteHeight = rowHeight / 60;
const hours = range(0, 24);

const eventsArray = [
    {
        start: moment().subtract(1, 'hours').toDate(),
        end: moment().add(1, 'hour').toDate(),
        title: 'One',
        color: Colors.Yellow
    },
    {
        start: moment().subtract(1, 'hours').toDate(),
        end: moment().add(1, 'hour').toDate(),
        title: 'Two',
        color: Colors.Blue
    },
    {
        start: moment().subtract(5, 'hours').toDate(),
        end: moment().add(-4, 'hour').toDate(),
        title: 'Three',
        color: Colors.CarrotOrange
    },
    {
        start: moment().subtract(3, 'hours').toDate(),
        end: moment().add(5, 'hour').toDate(),
        title: 'Three',
        color: Colors.Yellow
    },
];

const timeHeight = date => (date.getHours() * 60 + date.getMinutes()) * minuteHeight;
const getCardHeight = event => ((event.end.getHours() * 60) + event.end.getMinutes()) - ((event.start.getHours() * 60) + event.start.getMinutes());

export default React.memo(function DayScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const width = useWindowDimensions().width;
    const [show, setShow] = React.useState(false);
    const [day, setDay] = React.useState(new Date());
    const [now, setNow] = React.useState(new Date());

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

    const renderHours = () => (
        hours.map((hour, index) => (
            <View key={index} style={styles.row}>
                <View style={[styles.timeContainer, {backgroundColor: theme.main_bg}]}>
                    <Text style={[styles.time]}>
                        {(hour > 9 ? '' : '0') + (hour === 24 ? '00' : hour) + ':00'}
                    </Text>
                </View>
                <View style={[styles.lines, {width: '90%',},]}/>
            </View>
        ))
    );

    const renderEvents = () => (
        populateEvents(eventsArray, (width - 100), 0).map((event, index) => (
            <TouchableOpacity key={index} style={[styles.eventContainer,
                {
                    backgroundColor: event.color,
                    height: getCardHeight(event),
                    width: event.width,
                    left: event.left + 50,
                    top: timeHeight(event.start) + 18,
                }]}
                onPress={() => navigation.navigate(Routes.CalendarEvent)}
            >
                <View>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeRange}>
                            {event.start.getHours() + ':' + event.start.getMinutes() + ' - ' + event.end.getHours() + ':' + event.end.getMinutes()}
                        </Text>
                    </View>
                    {getCardHeight(event) > 100 && (
                        <Text numberOfLines={2} style={styles.eventDescription}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
    )));

    const renderLine = () => (
        <View style={[{top: timeHeight(now) + 18, width: '91%',}, styles.lineNowContainer]}>
            <View style={styles.lineDot}/>
            <View key={`timeNow`} style={styles.lineNow}/>
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
        backgroundColor: 'black',
        borderRadius: 10,
    },
    lineNow: {
        height: 1,
        width: '100%',
        backgroundColor: 'black',
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
