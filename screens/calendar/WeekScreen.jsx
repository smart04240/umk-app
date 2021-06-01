import React, {useMemo} from "react";
import {Alert, SectionList, Text, View} from "react-native";
import useThemeStyles from "../../hooks/useThemeStyles";
import ColorCard from "../../components/general/ColorCard";
import GeneralStyles from "../../constants/GeneralStyles";
import Routes from "../../constants/Routes";
import {useNavigation} from "@react-navigation/core";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {RangeSelector} from "../../components/calendar/RangeSelector";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import {Vibrator} from "../../helpers/Vibrator";
import {eventsByWeek, selectDate} from "../../redux/selectors/eventsSelector";
import Actions from "../../redux/Actions";
import {getTranslated} from "../../helpers/functions";

export default React.memo(function WeekScreen() {
    const theme = useThemeStyles();
    const navigation = useNavigation();
    const translate = useTranslator();
    const selectedDay = useSelector(state => selectDate(state));
    const dispatch = useDispatch();
    const locale = useSelector(state => state.app.locale);
    const [show, setShow] = React.useState(false);
    const events = useSelector(state => eventsByWeek(state));
    const categories = useSelector(state => state.eventCategories);

    React.useEffect(() => {
        if (!events?.length)
            dispatch(Actions.Toasts.Message(getTranslated(Translations.EventMessageWeek, locale)));
    },[selectedDay]);

    const weekPreparer = useMemo(() => {
        const week = [];

        let start = moment(selectedDay).startOf('week').clone(),
            end = moment(selectedDay).endOf('week');

        while (start.isSameOrBefore(end)) {
            let newDay = start.format('YYYY-MM-DD');

            week.push({
                day: start.format('YYYY-MM-DD'),
                data: events.filter(event => newDay === moment(event.start_date).format('YYYY-MM-DD'))
            });

            start.add(1, 'days');
        }

        return week.filter(day => day?.data?.length);
    },[selectedDay]);

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

    const deleteEvent = () => {
        // ToDo delete event
    }

    return (
        <SectionList
            sections={weekPreparer}
            initialNumToRender={6}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            ListHeaderComponent={
                <RangeSelector
                    isDay={false}
                    onPress={() => setShow(true)}
                    date={selectedDay}
                    show={show}
                    setClose={() => setShow(false)}
                    calendarOnChange={date => {
                        if (!!date)
                            dispatch(Actions.Calendar.SetDate(moment(date).toISOString()))
                    }}
                    rangeSelectorStyles={{marginHorizontal: 20, marginVertical: 20}}
                />
            }
            ListFooterComponent={<View style={{height: 20}}/>}
            renderItem={({item}) => (
                <>
                    <ColorCard
                        title={item.title}
                        text={item.description}
                        color={categories?.find(category => category.id === item.category).color}
                        from={moment(item.start_date).format('HH:mm')}
                        to={moment(item.end_date).format('HH:mm')}
                        onPressIn={() => Vibrator()}
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
                                        onPress: () => deleteEvent(),
                                    },
                                ]
                            );
                        }}
                    />
                </>
            )}
            renderSectionHeader={({section: {day}}) => (<SectionHeader day={day}/>)}
        />
    );
});
