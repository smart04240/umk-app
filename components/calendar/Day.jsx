import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Fonts from "../../constants/Fonts";
import moment from "moment";
import Colors from "../../constants/Colors";

const Circle = ({color}) => <View style={{marginHorizontal: 1, borderColor: color, borderRadius: 999, borderWidth: 2}}/>;

export default function Day({style, textStyle, date: {isSelectedMonth, isToday, date, day} = {}, onPress, selectedDate}) {
    const Component = onPress ? TouchableOpacity : View;

    const press = () => onPress(moment(date));

    return (
        <Component
            style={[
                styles.container,
                isSelectedMonth === false && styles.inactive,
                style,
            ]}
            onPress={press}
        >
            <TouchableOpacity style={[
                {borderRadius: style.width / 2},
                isToday && styles.today,
                selectedDate.isSame(date, 'day') && styles.selected,
            ]}>
                <Text
                    style={[
                        styles.text,
                        textStyle,
                        selectedDate.isSame(date, 'day') && styles.selectedText,
                    ]}
                >
                    {day}
                </Text>
            </TouchableOpacity>
            <View style={styles.events}>
                <Circle color={'red'}/>
                <Circle color={'orange'}/>
                <Circle color={'green'}/>
            </View>
        </Component>
    );
};

const styles = {
    container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    inactive: {
        opacity: 0.3,
    },
    today: {
        backgroundColor: Colors.BlueRgba(0.25),
    },
    text: {
        padding: 2,
        margin: 2,
        aspectRatio: 1,
        textAlign: 'center',
        fontFamily: Fonts.ProximaNova.Regular,
    },
    selected: {
        backgroundColor: Colors.Blue,
    },
    selectedText: {
        color: Colors.White,
    },
    events: {
        flexDirection: 'row',
    },
};
