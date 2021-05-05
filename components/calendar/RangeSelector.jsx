import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GeneralStyles from "../../constants/GeneralStyles";
import {FontAwesome} from "@expo/vector-icons";
import useThemeStyles from "../../hooks/useThemeStyles";
import moment from "moment";
import {useSelector} from "react-redux";
import {ModalCalendar} from "../form/datepicker/ModalCalendar";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";

export const RangeSelector = ({onPress, date, day, show, setClose, calendarOnChange, rangeSelectorStyles}) => {
    const theme = useThemeStyles();
    const locale = useSelector(state => state.locale);

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

    const getDay = useMemo(() => {
        if (day)
            return moment(day).locale(locale).format('D MMMM, dddd').toUpperCase();
    },[day, locale]);

    return(
        <>
            <TouchableOpacity
                style={[
                    styles.weeksSelector,
                    rangeSelectorStyles,
                    {borderColor: theme.blue_text}
                ]}
                onPress={onPress}
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
                        {!!date
                            ? (getWeekDateRange.formattedStartDate + ' - ' + getWeekDateRange.formattedEndDate)
                            : (getDay)
                        }
                    </Text>
                </View>
                <FontAwesome
                    styles={{flex: 0.1}}
                    name={'angle-down'}
                    size={20}
                    color={theme.icon_color}
                />
            </TouchableOpacity>
            <ModalCalendar
                modalTitle={useTranslated(Translations.Calendar)}
                show={show}
                setClose={setClose}
                calendarOnChange={calendarOnChange}
                initialCalendarDate={date}
            />
        </>
    )
};

const styles = {
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    weeksSelector: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    selectorText: {
        fontSize: 15,
        left: 10,
    },
    weeksSelectorInner: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

