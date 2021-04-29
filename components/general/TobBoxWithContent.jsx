import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GeneralStyles from "../../constants/GeneralStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../form/Button";
import TopBox from "./TopBox";
import useThemeStyles from "../../hooks/useThemeStyles";
import {useNavigation} from "@react-navigation/core";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";
import {useDispatch, useSelector} from "react-redux";
import {categories} from "../tasks/TaskListItem";
import {ToDosSelectors} from "../../redux/selectors/todosSelectors";
import Actions from "../../redux/Actions";

export const TopBoxWithContent = ({id, isTask}) => {
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const todo = useSelector(state => ToDosSelectors.byId(state, id));
    const category = categories.find(category => category.value === parseInt(todo.category));
    let taskStatus = todo?.completed ? useTranslated(Translations.TaskCompleted) : useTranslated(Translations.TaskNotCompleted);

    const info = [
        {circle_color: category?.color, value: todo?.category},
        {icon: "map-marker-outline", value: todo?.place},
        {icon: "playlist-check", value: taskStatus},
    ];

    const completeTask = () => {
        dispatch(Actions.ToDos.upsertOne({
            id,
            ...todo,
            completed: true
        }));
    };

    const buttons = [
        {label: useTranslated(Translations.MarkAsDone), onPress: () => completeTask()},
        {label: useTranslated(Translations.EditTheTask), onPress: () => navigation.navigate(Routes.TaskEdit, {id})}
    ];

    return (
        <TopBox>
            {todo?.title && (
                <Text style={[
                    GeneralStyles.text_bold,
                    {color: ThemeStyles.dark_blue_text},
                    {marginBottom: 20}
                ]}>
                    {todo?.title}
                </Text>
            )}
            <View>
                {info.map((item, index) => (
                    !!item.value
                        ? (
                            <View key={index} style={[
                                GeneralStyles.row_ac,
                                {marginBottom: 20}
                            ]}>

                                {!!item.circle_color && (
                                    <View style={[
                                        styles.circle,
                                        {backgroundColor: item.circle_color}
                                    ]}/>
                                )}

                                {!!item.icon && (
                                    <MaterialCommunityIcons
                                        name={item.icon}
                                        size={22}
                                        color={ThemeStyles.icon_color}
                                    />
                                )}

                                <Text style={[
                                    GeneralStyles.text_regular,
                                    {color: ThemeStyles.dark_blue_text},
                                    {marginLeft: 30}
                                ]}>
                                    {item.value}
                                </Text>
                            </View>
                        ) : null
                ))}
            </View>
            {isTask && (
                <View style={[
                    GeneralStyles.row_ac,
                    {marginHorizontal: -5}
                ]}>
                    {buttons.map((b, index) => (
                        <Button
                            key={index}
                            style={styles.bottom_button}
                            transparent_bg={true}
                            onPress={b.onPress}
                        >
                            {b.label}
                        </Button>
                    ))}
                </View>
            )}
        </TopBox>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9
    },
    bottom_button: {
        flexGrow: 1,
        flexShrink: 1,
        marginHorizontal: 5
    }
})

