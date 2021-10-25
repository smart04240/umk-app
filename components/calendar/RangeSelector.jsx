import React, {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GeneralStyles from "../../constants/GeneralStyles";
import {FontAwesome} from "@expo/vector-icons";
import useThemeStyles from "../../hooks/useThemeStyles";
import moment from "moment";
import {useSelector} from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const RangeSelector = ({
    style,
    onPress,
    date,
    format = 'D MMMM, dddd',
    formatter,
    show,
    setClose,
    onChange
}) => {
    const theme = useThemeStyles();
    const locale = useSelector(state => state.app.locale);

    const label = useMemo(() => {
        return formatter ? formatter(date) : moment(date).locale(locale).format(format);
    }, [date, locale, format]);

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.weeksSelector,
                    style,
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
                        {label}
                    </Text>
                </View>
                <FontAwesome
                    styles={{flex: 0.1}}
                    name={'angle-down'}
                    size={20}
                    color={theme.icon_color}
                />
            </TouchableOpacity>
            <DateTimePickerModal
                date={date}
                isVisible={show}
                mode={'date'}
                onConfirm={onChange}
                onCancel={setClose}
            />
        </>
    );
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

