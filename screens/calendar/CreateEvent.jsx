import React, {useMemo} from 'react';
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import {EventTaskEditForm} from "../../components/general/EventTaskEditForm";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import {v4 as uuidv4} from "uuid";
import {useNavigation} from "@react-navigation/core";
import {useDispatch, useSelector} from "react-redux";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import Actions from "../../redux/Actions";
import moment from "moment";

const generateEvent = () => {
    return {
        id: uuidv4(),
        title: '',
        description: '',
        place: '',
        category: '',
        files: [],
        completed: false,
        is_event: true,
        start: '',
        end: '',
        date: '',
        reminder: true,
        reminder_option: "custom",
        reminder_date: '',
    }
};

export const CreateEvent = props => {
    const id = props?.route?.params?.id;
    const navigation = useNavigation();
    const translate = useTranslator();

    const [data, setData] = React.useState(generateEvent());

    const canSave = useMemo(() => {
        return !!data?.description?.length && !!data?.title?.length && !!data?.category && !!data?.place
    },[data]);

    const title = useMemo(() => {
        return !!id ? translate(Translations.EditEvent) : translate(Translations.CreateEvent)
    }, [id]);

    const onChange = (name, value) => {
        const checkIfDate = (name === 'start' || name === 'end' || name === 'reminder_date' || name === 'date') ? moment(value).toISOString() : value;

        setData({
            ...data,
            [name] : checkIfDate
        });
    };

    const save = () => {

        navigation.goBack();
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
                        reminderOnChange={o => {
                            onChange(o.name, o.value);

                            if (o.name === "reminder" && !o.value) {
                                dispatch({
                                    type: "remove",
                                    name: ["reminder_option", "reminder_date", "reminder_time"]
                                })
                            }

                            if (o.name === "reminder_option" && o.value !== "custom") {
                                dispatch({
                                    type: "remove",
                                    name: ["reminder_date", "reminder_time"]
                                })
                            }
                        }}
                    />
                </ContainerWithScroll>
            </MainWithNavigation>
        </ScreenWithRoundedHeader>
    )
};
