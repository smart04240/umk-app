import React, {useEffect, useMemo} from 'react';
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import {EventTaskEditForm} from "../../components/general/EventTaskEditForm";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import {useNavigation} from "@react-navigation/core";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import moment from "moment";
import {Alert} from "react-native";
import {getAllScheduledNotificationsAsync} from "expo-notifications";
import API from "../../helpers/API";

export const CreateEvent = props => {
    const id = props?.route?.params?.id;
    const navigation = useNavigation();
    const translate = useTranslator();
    const [data, setData] = React.useState({
        title: '',
        description: '',
        place: '',
        category: 1,
        files: [],
        completed: false,
        is_event: true,
        start: '',
        end: '',
        date: '',
        reminder: true,
        reminder_date: '',
    });
    const [notifications, setNotifications] = React.useState([]);

    useEffect(() => {
        const getNotifications = async () => {await getAllScheduledNotificationsAsync().then(res => setNotifications(res))}
        getNotifications();
    }, []);

    const canSave = useMemo(() => {
        return !!data?.description?.length && !!data?.title?.length && !!data?.category && !!data?.place
    },[data]);

    const title = useMemo(() => {
        return !!id ? translate(Translations.EditEvent) : translate(Translations.CreateEvent)
    }, [id]);

    const onChange = (name, value) => {
        const checkIfDate = (name === 'start' || name === 'end' || name === 'reminder_date' || name === 'date') ? moment(value).toISOString() : value;

        if (name === 'reminder' && !value && !!data?.reminder_date) {
            Alert.alert(
                translate(Translations.Calendar),
                translate(Translations.ReminderDisable),
                [
                    {
                        text: translate(Translations.Yes),
                        style: "danger",
                        onPress: () => setData({
                            ...data,
                            reminder: false,
                            reminder_date: '',
                        }),
                    },
                    {
                        text: translate(Translations.No),
                        style: "cancel",
                    },
                ]
            );

            return;
        }

        setData({
            ...data,
            [name] : checkIfDate
        });
    };

    const save = async () => {
        if (data?.reminder && !data?.reminder_date) {
            Alert.alert(
                translate(Translations.Calendar),
                translate(Translations.ReminderDateWarning),
                [
                    {
                        text: translate(Translations.Yes),
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        let eventData = {
            title: data?.title,
            description: data?.description,
            start_date: data?.start,
            end_date: data?.end,
            category: data?.category,
            attachments: data?.files
        };


        API.events[!!id ? 'edit' : 'create'](eventData).then(res => {
            console.log(res)
            if (res?.status === '200') {

            }
        });
        // const getReminderId = notifications.find(notification => notification?.content?.data?.eventID === data?.id)?.identifier;
        //
        // if (!data?.reminder && !!getReminderId) {
        //     await cancelScheduledNotificationAsync(getReminderId);
        // }
        //
        // // ToDo checking all reminders from the server and replace old local reminders with new
        //
        // await schedulePushNotification(data?.title, data?.description, data?.reminder_date, data?.id);

        //navigation.goBack();
    };

    return (
        <ScreenWithRoundedHeader>
            <MainWithNavigation>
                <ContainerWithScroll>
                    <EventTaskEditForm
                        title={data?.title}
                        formTitle={title}
                        route={props.route}
                        isEvent={true}
                        canSave={!canSave}
                        saveData={() => save()}
                        titleOnChange={title => onChange('title', title)}
                        dropdownOnChange={option => onChange(option.name, option.value)}
                        placeValue={data?.place}
                        categoryValue={data?.category}
                        descriptionOnChange={description => onChange('description', description)}
                        docPickerOnChange={object => onChange(object.name, object.value)}
                        description={data?.description}
                        files={data?.files}
                        eventData={data}
                        validateStartDate={!moment(data.start).isSameOrBefore(moment(data.end))}
                        validateEndDate={!moment(data.end).isSameOrAfter(moment(data.start))}
                        editEventOnChange={o => onChange(o.name, o.value)}
                        reminderData={data}
                        reminderOnChange={o => onChange(o.name, o.value)}
                    />
                </ContainerWithScroll>
            </MainWithNavigation>
        </ScreenWithRoundedHeader>
    )
};
