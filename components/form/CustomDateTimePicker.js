import React, {useMemo, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {isFunction} from "../../helpers/functions";
import moment from "moment";

export const CustomDateTimePicker = ({buttonStyle, label, onChange, name}) => {
    const ThemeStyles = useThemeStyles();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const formatDate = useMemo(() => {
        if (!selectedDate)
            return label;

        return moment(selectedDate).format('HH:mm DD.MM.YY');
    },[selectedDate]);

    return (
        <>
            <TouchableOpacity
                style={[styles.input, {borderColor: ThemeStyles.blue_text}, buttonStyle || {}]}
                onPress={showDatePicker}>
                <Text>
                    {formatDate}
                </Text>
                <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={23}
                    color={ThemeStyles.icon_color}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={value => {
                    setSelectedDate(value);
                    isFunction(onChange) && onChange({name, value});
                    hideDatePicker();
                }}
                onCancel={hideDatePicker}
            />
        </>
    );
};

const styles = {
    input: {
        ...GeneralStyles.row_ac,
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
};
