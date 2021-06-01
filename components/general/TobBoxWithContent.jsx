import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import GeneralStyles from "../../constants/GeneralStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Button from "../form/Button";
import TopBox from "./TopBox";
import useThemeStyles from "../../hooks/useThemeStyles";
import {useNavigation} from "@react-navigation/core";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";
import {useDispatch, useSelector} from "react-redux";
import {ToDosSelectors} from "../../redux/selectors/todosSelectors";
import Actions from "../../redux/Actions";
import useTranslator from "../../hooks/useTranslator";
import API from "../../helpers/API";
import {cancelPushNotification} from "../../helpers/Notification";
import {getAllScheduledNotificationsAsync} from "expo-notifications";
import {eventsSelectors} from "../../redux/selectors/eventsSelector";
import {categories} from "../tasks/TaskListItem";

export const TopBoxWithContent = ({id, isTask}) => {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const todos = useSelector(state => ToDosSelectors.byId(state, id));
    const event = useSelector(state => eventsSelectors.byId(state, id));
    const locale = useSelector(state => state.app.locale);
    const data = isTask ? todos : event;
    const [notifications, setNotifications] = React.useState([]);
    const eventCategories = useSelector(state => state.eventCategories);
    const category = (isTask ? categories : eventCategories).find(category => category.id === parseInt(data?.category));
    let status = data?.completed ? translate(Translations.TaskCompleted) : translate(Translations.TaskNotCompleted);


    const info = [
        {circle_color: category?.color, value: category?.title[locale]},
        {icon: "map-marker-outline", value: data?.place},
        {icon: "playlist-check", value: status},
    ];

    const message = {
        title: translate(Translations.DeleteConfirmTitle),
        description: translate(Translations.DeleteConfirmDescription) + ' ' + data?.title + '?'
    };

    React.useEffect(() => {
        getAllScheduledNotificationsAsync().then(setNotifications)
    },[]);

    const completeTask = () => {
        dispatch(Actions.ToDos.upsertOne({
            id,
            ...data,
            completed: true
        }));
    };

    const askBeforeDelete = () => {
        Alert.alert(
            message.title,
            message.description,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => deleteEvent()
                }
            ]
        );
    }

    const deleteEvent = () => {
        API.events.delete(data.id).then(async res => {
            if (res?.status === 200) {
                dispatch(Actions.Calendar.removeOne(data.id))

                await cancelPushNotification(data.id, notifications);

                navigation.goBack();
            }
        })
    }

    const toDoButtons = [
        {label: translate(Translations.MarkAsDone), onPress: () => completeTask()},
        {label: translate(Translations.EditTheTask), onPress: () => navigation.navigate(Routes.TaskEdit, {id})}
    ];

    const eventButtons = [
        {
            label: translate(Translations.EditEvent),
            onPress: () => navigation.navigate(Routes.CalendarCreateEvent, data)
        },
        {
            label: translate(Translations.Delete),
            isDangerButton: true,
            onPress: () => askBeforeDelete()
        },
    ];

    return (
        <TopBox>
            {data?.title && (
                <Text style={[
                    GeneralStyles.text_bold,
                    {color: ThemeStyles.dark_blue_text},
                    {marginBottom: 20}
                ]}>
                    {data?.title}
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
            <View style={[
                GeneralStyles.row_ac,
                {marginHorizontal: -5}
            ]}>
                {(isTask ? toDoButtons : eventButtons).map((b, index) => (
                    <Button
                        key={index}
                        style={b?.style || styles.bottom_button}
                        isDangerButton={b?.isDangerButton}
                        transparent_bg={true}
                        onPress={b.onPress}
                    >
                        {b.label}
                    </Button>
                ))}
            </View>
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

