import React, {useMemo} from 'react';
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import {EventTaskEditForm} from "../../components/general/EventTaskEditForm";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import {useNavigation} from "@react-navigation/core";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import moment from "moment";
import {Alert} from "react-native";
import API from "../../helpers/API";
import Actions from "../../redux/Actions";
import {useDispatch} from "react-redux";
import makeFormData from "../../helpers/makeFormData";

export const CreateEvent = props => {
    const event = props?.route?.params;
    const id = event.id;
    const navigation = useNavigation();
    const translate = useTranslator();
    const dispatch = useDispatch();
    const [data, setData] = React.useState({
        title: !!id ? event.title['pl'] : '',
        description: !!id ? event.description['pl'] : '',
        place: !!id ? event.description : '',
        category: !!id ? event.category : '',
        files: !!id ? event.files : [],
        start: !!id ? event.start_date : '',
        end: !!id ? event.end_date : '',
        date: !!id ? moment(event.start_date).toISOString() : moment().toISOString(),
        one_day_event: !!id ? event?.is_full_day : false,
        reminder: !!id ? event.reminder : true,
        reminder_date: !!id ? event.notification.reminder_date : null,
    });

    const canSave = useMemo(() => {
        return (!!data?.description?.length && !!data?.title?.length && !!data?.category && (!!data.date && data?.one_day_event || !!data.date && !!data?.start && !!data?.end))
    },[data]);

    const title = useMemo(() => {
        return !!id ? translate(Translations.EditEvent) : translate(Translations.CreateEvent)
    }, [id]);

    const datePreparer = useMemo(() => {
        if (!!data?.date && !!data?.start && !!data?.end && !data?.one_day_event)
            return {
                start: moment(moment(data?.date).format('YYYY-MM-DD') + ' ' + moment(data?.start).format('HH:mm:00')).toISOString(),
                end: moment(moment(data?.date).format('YYYY-MM-DD') + ' ' + moment(data?.end).format('HH:mm:00')).toISOString()
            };

        if (data?.one_day_event)
            return {
                start: moment(data?.date).startOf('day').toISOString(),
                end: moment(data?.date).endOf('day').toISOString()
            }
    },[data.date, data.start, data.end, data.one_day_event]);

    const onChange = (name, value) => {
        const checkValue = (name === 'start' || name === 'end' || name === 'reminder_date' || name === 'date') ? moment(value).toISOString() : value;

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
            [name] : checkValue
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
            title: {
                pl: data?.title,
                en: data?.title
            },
            description: {
                pl: data?.description,
                en: data?.description
            },
            start_date: datePreparer.start,
            end_date: datePreparer.end,
            category: data?.category,
            files: data?.files,
            reminder: data?.reminder,
            reminder_date: data?.reminder_date,
            is_full_day: data?.one_day_event
        };

        API.events[!!id ? 'edit' : 'create'](makeFormData(eventData)).then(res => {
            dispatch(Actions.Calendar.upsertOne(eventData));

            navigation.goBack();
        });
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
