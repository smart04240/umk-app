import React, {useMemo} from "react";
import {View, TouchableOpacity, Text, SectionList, ScrollView} from "react-native";
import useThemeStyles from "../../hooks/useThemeStyles";
import {FontAwesome} from "@expo/vector-icons";
import ColorCard from "../../components/general/ColorCard";
import GeneralStyles from "../../constants/GeneralStyles";
import {ModalCalendar} from "../../components/form/datepicker/ModalCalendar";
import Routes from "../../constants/Routes";
import {useNavigation} from "@react-navigation/core";
import moment from "moment";
import {categories} from "../../components/tasks/TaskListItem";
import {useSelector} from "react-redux";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";
import {RangeSelector} from "../../components/calendar/RangeSelector";

export default React.memo(function WeekScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const locale = useSelector(state => state.locale);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

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

    const SectionHeader = ({day}) => (
        <View
            style={{
                backgroundColor: theme.main_bg,
                height: 30,
                justifyContent: 'center'
            }}
        >
            <Text style={[
                GeneralStyles.text_bold,
                {
                    color: theme.dark_text,
                    left: 20
                }
            ]}>
                {moment(day, 'YYYY-MM-DD').locale(locale).format('dddd, D MMMM')}
            </Text>
        </View>
    );

    return (
        <SectionList
            sections={DATA}
            initialNumToRender={6}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={
                <RangeSelector
                    isDay={false}
                    onPress={() => setShow(true)}
                    date={date}
                    show={show}
                    setClose={() => setShow(false)}
                    calendarOnChange={date => setDate(date)}
                    rangeSelectorStyles={{marginHorizontal: 20, marginVertical: 20}}
                />
            }
            ListFooterComponent={<View style={{height: 20}}/>}
            renderItem={({item}) => (
                <ColorCard
                    title={item.title}
                    text={item.description}
                    color={categories.find(category => category.value === item.category).color}
                    from={item.from}
                    to={item.to}
                    onPress={() => navigation.navigate(Routes.CalendarEvent)}
                />
            )}
            renderSectionHeader={({section: {day}}) => (<SectionHeader day={day}/>)}
        />
    );
});
