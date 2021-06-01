import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Fonts from "../../constants/Fonts";
import moment from "moment";
import Colors from "../../constants/Colors";

const Circle = ({color}) => <View style={{marginHorizontal: 1, borderColor: color, borderRadius: 999, borderWidth: 2}}/>;

export default function Day({style, textStyle, date: {isSelectedMonth, isToday, date, day} = {}, onPress, selectedDate, events, categories}) {
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
            <View style={[
                {borderRadius: style.width / 2, overflow: 'hidden'},
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
            </View>
            <View style={styles.events}>
                {!!events?.length && events.map(event => {
                    const category = categories?.find?.(category => category.id === event.category);
                    return category?.color ? <Circle key={String(event.id)} color={category.color}/> : null;
                })}
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
        marginTop: 1,
        flexDirection: 'row',
    },
};
