import React, {useMemo, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {isFunction} from "../../helpers/functions";
import moment from "moment";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

export const CustomDateTimePicker = ({buttonStyle, label, onChange, validateData, dateFormat, name, mode, initialValue}) => {
    const ThemeStyles = useThemeStyles();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const formattedDate = useMemo(() => {
        const format = date => moment(date).format(dateFormat);

        if (!!initialValue)
            return format(initialValue);

        if (!initialValue)
            return label;
    },[onChange]);

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.input,
                    validateData && {borderColor: Colors.Red},
                    {borderColor: ThemeStyles.blue_text}, buttonStyle || {}

                ]}
                onPress={showDatePicker}>
                <Text style={{fontFamily: Fonts.ProximaNova.Regular, color: ThemeStyles.dark_text}}>
                    {formattedDate}
                </Text>
                <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={23}
                    color={ThemeStyles.icon_color}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={value => {
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
