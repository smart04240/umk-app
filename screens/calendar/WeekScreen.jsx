import React, {useMemo} from "react";
import {View, TouchableOpacity, Text, SectionList} from "react-native";
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

export default React.memo(function WeekScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const locale = useSelector(state => state.locale);
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const getWeekDateRange = useMemo(() => {
        let startDate = moment(date).startOf('week');
        let endDate = moment(date).endOf('week');

        return {
            startDate,
            endDate,
            formattedStartDate: startDate.locale(locale).format('D MMM').toUpperCase(),
            formattedEndDate: endDate.locale(locale).format('D MMM').toUpperCase()
        };
    },[date, locale]);

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

    const ListHeader = () => (
        <TouchableOpacity
            style={[
                styles.weeksSelector,
                {borderColor: theme.blue_text}
            ]}
            onPress={() => setShow(true)}
        >
            <View
                style={styles.weeksSelectorInner}
            >
                <Text
                    style={[
                        GeneralStyles.text_bold,
                        styles.selectorText,
                        {color: theme.blue_text}
                    ]}
                >
                    {getWeekDateRange.formattedStartDate} - {getWeekDateRange.formattedEndDate}
                </Text>
            </View>
            <FontAwesome
                styles={{flex: 0.1}}
                name={'angle-down'}
                size={20}
                color={theme.icon_color}
            />
        </TouchableOpacity>
    );

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
        <>
            <SectionList
                sections={DATA}
                initialNumToRender={6}
                stickySectionHeadersEnabled={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={<ListHeader/>}
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
            <ModalCalendar
                modalTitle={useTranslated(Translations.Calendar)}
                show={show}
                setClose={() => setShow(false)}
                calendarOnChange={date => setDate(date)}
                initialCalendarDate={date}
            />
        </>
    );
});

const styles = {
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    weeksSelector: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    selectorText: {
        fontSize: 15,
        left: 10
    },
    weeksSelectorInner: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
