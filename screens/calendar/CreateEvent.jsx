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
        category_id: !!id ? event.category_id : '',
        files: !!id ? event.files : [],
        start: !!id ? event.start_date : '',
        end: !!id ? event.end_date : '',
        date: !!id ? moment(event.start_date).toISOString() : moment().toISOString(),
        one_day_event: !!id ? event?.is_full_day : false,
        reminder: !!id ? !!event.reminder_offset : false,
        reminder_offset: !!id ? event.reminder_offset : null,
    });

    const canSave = useMemo(() => {
        if (!data?.description?.length || !data?.title?.length || !data?.category_id)
            return false;

        if (!!data?.one_day_event && !data.date)
            return false;

        if (!data?.one_day_event && (!data.start || !data.end))
            return false;

        return true;
    },[data]);

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
        const checkValue = (name === 'start' || name === 'end' || name === 'date') ? moment(value).toISOString() : name === 'reminder_offset' ? moment(value).unix() : value;

        if (name === 'reminder' && !value && !!data?.reminder_offset) {
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
                            reminder_offset: '',
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
        if (data?.reminder && !data?.reminder_offset) {
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
            category_id: data?.category_id,
            files: data?.files,
            reminder_offset: data?.reminder_offset,
            is_full_day: data?.one_day_event
        };

        API.events[!!id ? 'edit' : 'create'](makeFormData(eventData)).then(response => {
            dispatch(Actions.Calendar.upsertOne(response.data));
            navigation.goBack();
        });
    };

    return (
        <ScreenWithRoundedHeader>
            <MainWithNavigation>
                <ContainerWithScroll>
                    <EventTaskEditForm
                        title={data?.title}
                        formTitle={!!id ? translate(Translations.EditEvent) : translate(Translations.CreateEvent)}
                        route={props.route}
                        canSave={!canSave}
                        saveData={() => save()}
                        onChange={o => onChange(o.name, o.value)}
                        placeValue={data?.place}
                        categoryValue={data?.category}
                        description={data?.description}
                        files={data?.files}
                        eventData={data}
                        validateStartDate={!moment(data.start).isSameOrBefore(moment(data.end))}
                        validateEndDate={!moment(data.end).isSameOrAfter(moment(data.start))}
                    />
                </ContainerWithScroll>
            </MainWithNavigation>
        </ScreenWithRoundedHeader>
    )
};
