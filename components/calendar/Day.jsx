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
            <Text style={[
                styles.text,
                {borderRadius: style.width / 2},
                isToday && styles.today,
                textStyle,
                selectedDate.isSame(date, 'day') && styles.selected,
            ]}>
                {day}
            </Text>
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
        aspectRatio: 1,
        textAlign: 'center',
        fontFamily: Fonts.ProximaNova.Regular,
        padding: 5,
        margin: 5,
    },
    selected: {
        color: Colors.White,
        backgroundColor: Colors.Blue,
    },
    events: {
        flexDirection: 'row',
    },
};
