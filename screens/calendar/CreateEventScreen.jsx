import React from 'react';
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import {useNavigation} from "@react-navigation/core";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import moment from "moment";
import {Text, View} from "react-native";
import API from "../../helpers/API";
import Actions from "../../redux/Actions";
import {useDispatch, useSelector} from "react-redux";
import makeFormData from "../../helpers/makeFormData";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import Input from "../../components/form/Input";
import Dropdown from "../../components/form/Dropdown";
import {useCategoryPreparer} from "../../hooks/useCategoryPreparer";
import {CustomDateTimePicker} from "../../components/form/CustomDateTimePicker";
import Checkbox from "../../components/form/Checkbox";
import DocPicker from "../../components/form/doc-picker/DocPicker";
import Button from "../../components/form/Button";

const LocationOptions = [
    {
        value: '1',
        label: {
            pl: 'Online',
            en: 'Online',
        },
    },
    {
        value: '0',
        label: {
            pl: 'Miejsce',
            en: 'Place',
        },
    },
];

const CustomReminderOptionValue = 'custom';
export const ReminderOptions = [
    {
        value: '600',
        label: {
            pl: '10 minut przed',
            en: '10 minutes before',
        },
    },
    {
        value: '3600',
        label: {
            pl: '1 godzinę przed',
            en: '1 hour before',
        },
    },
    {
        value: '21600',
        label: {
            pl: '6 godzin przed',
            en: '6 hours before',
        },
    },
    {
        value: '86400',
        label: {
            pl: '1 dzień przed',
            en: '1 day before',
        },
    },
    {
        value: '172800',
        label: {
            pl: '2 dni przed',
            en: '2 days before',
        },
    },
    {
        value: '604800',
        label: {
            pl: 'Tydzień przed',
            en: 'Week before',
        },
    },
    {
        value: CustomReminderOptionValue,
        label: {
            pl: 'Inne (data i godzina)',
            en: 'Other (date and time)',
        },
    },
];

const Validate = data => {
    if (!data.title)
        return 'Title required';

    if (!data.category_id)
        return 'Category required';

    if (!data.description)
        return 'Description required';

    if (!data.start_date)
        return 'Date required';

    if (!data.is_full_day && !data.end_date)
        return 'Start time required';

    if (!data.is_full_day && data.start_date > data.end_date)
        return 'Start time must be before or equal end time';

    if (!!data.reminder_enabled && !data.reminder_option)
        return 'Please select valid reminder option';

    if (!!data.reminder_enabled && data.reminder_option === CustomReminderOptionValue && !data.custom_reminder)
        return 'Custom reminder required';

    return '';
};

export default function CreateEventScreen(props) {
    const event = props?.route?.params;
    const ThemeStyles = useThemeStyles();
    const navigation = useNavigation();
    const translate = useTranslator();
    const dispatch = useDispatch();
    const categories = useCategoryPreparer();
    const markers = useSelector(state => state.mapData.markers);
    const markerOptions = React.useMemo(() => markers.map(marker => ({
        value: String(marker.id),
        label: translate(marker.title)
    })), [markers, translate]);
    const reminderOptions = React.useMemo(() => ReminderOptions.map(option => ({
        ...option,
        label: translate(option.label)
    })), [translate]);
    const locationOptions = React.useMemo(() => LocationOptions.map(option => ({
        ...option,
        label: translate(option.label)
    })), [translate]);
    const initialValue = React.useMemo(() => ({
        title: event?.title?.pl || '',
        category_id: event?.category_id || '',

        show_location_link: event?.show_location_link === undefined ? '1' : (event.show_location_link ? '1' : '0'),
        location_link: event?.location_link || '',
        marker_id: event?.marker_id || null,

        start_date: event?.start_date || moment().toISOString(),
        end_date: event?.end_date || moment().toISOString(),
        is_full_day: event?.is_full_day || false,

        description: event?.description?.pl || '',

        files: event?.files || [],

        reminder_enabled: !!event?.reminder_offset,
        reminder_option: event?.reminder_offset
            ? (ReminderOptions.find(option => option.value === String(event?.reminder_offset))?.value || CustomReminderOptionValue)
            : '',
        custom_reminder: event?.reminder_offset
            ? moment(event.start_date).subtract(event.reminder_offset, 'seconds').toISOString()
            : null,
    }), []);
    const [data, setData] = React.useState(initialValue);

    const onChange = ({name, value}) => setData({...data, [name]: value});
    const onTextChange = name => value => onChange({name, value});

    const save = () => {
        const errorMessage = Validate(data);
        if (errorMessage) {
            dispatch(Actions.Toasts.Warning(errorMessage));
            return;
        }

        const eventData = {
            ...data,
            show_location_link: data.show_location_link === '1',
        };

        if (eventData.is_full_day) {
            const start_date = moment(eventData.start_date);
            const end_date = start_date.clone();

            start_date.hours(0);
            start_date.minutes(0);
            start_date.seconds(0);
            start_date.milliseconds(0);

            end_date.hours(23);
            end_date.minutes(59);
            end_date.seconds(59);
            end_date.milliseconds(999);

            eventData.start_date = start_date.toISOString();
            eventData.end_date = end_date.toISOString();
        }

        if (!eventData.reminder_enabled)
            eventData.reminder_offset = null;
        else {
            if (!isNaN(eventData.reminder_option)) {
                // one of select options
                eventData.reminder_offset = eventData.reminder_option;
            } else {
                // custom reminder
                eventData.reminder_offset = moment(eventData.start_date).diff(moment(eventData.custom_reminder), 'seconds');
            }
        }

        API.events[!!event?.id ? 'edit' : 'create'](makeFormData(eventData)).then(response => {
            dispatch(Actions.Calendar.upsertOne(response.data));
            navigation.goBack();
        });
    };

    return (
        <ScreenWithRoundedHeader>
            <MainWithNavigation>
                <ContainerWithScroll container_style={styles.bigSpacer}>
                    <Text style={{...GeneralStyles.text_regular, color: ThemeStyles.dark_text, marginBottom: 20}}>
                        {!!event?.id ? translate(Translations.EditEvent) : translate(Translations.CreateEvent)}
                    </Text>

                    <View style={styles.bigSpacer}>
                        {/* Title */}
                        <Input
                            name={'title'}
                            placeholder={translate(Translations.EventFormTitle)}
                            value={data.title}
                            style={styles.smallSpacer}
                            onChangeText={onTextChange('title')}
                        />
                        {/* Category */}
                        <Dropdown
                            name={'category_id'}
                            placeholder={translate(Translations.EventFormCategory)}
                            init_value={data.category_id}
                            options={categories}
                            onChange={onChange}
                        />
                    </View>

                    <View style={styles.bigSpacer}>
                        {/* Location */}
                        <Text style={{...GeneralStyles.text_regular, color: ThemeStyles.dark_text, marginBottom: 11}}>
                            {translate(Translations.EventFormLocation)}
                        </Text>
                        <Dropdown
                            name={'show_location_link'}
                            init_value={data.show_location_link}
                            options={locationOptions}
                            onChange={onChange}
                        />
                        {data.show_location_link === '1' && (
                            <Input
                                name={'location_link'}
                                placeholder={translate(Translations.EventFormLocationLink)}
                                value={data.location_link}
                                style={styles.smallSpacer}
                                onChangeText={onTextChange('location_link')}
                            />
                        )}
                        {data.show_location_link === '0' && (
                            <Dropdown
                                name={'marker_id'}
                                placeholder={translate(Translations.SelectMarker)}
                                init_value={data.marker_id}
                                options={markerOptions}
                                onChange={onChange}
                            />
                        )}
                    </View>


                    {/* Dates */}
                    <View style={styles.mediumSpacer}>
                        <Text style={{...GeneralStyles.text_regular, color: ThemeStyles.dark_text, marginBottom: 11}}>
                            {translate(Translations.EventFormDates)}
                        </Text>
                        <View style={styles.dateContainer}>
                            <CustomDateTimePicker
                                buttonStyle={styles.dateButton}
                                label={'Date'}
                                initialValue={data?.start_date}
                                name={'start_date'}
                                mode={'date'}
                                dateFormat={'DD.MM.YYYY'}
                                onChange={onChange}
                            />
                        </View>
                        <View style={styles.timeContainer}>
                            {!data.is_full_day && (
                                <>
                                    <CustomDateTimePicker
                                        buttonStyle={styles.timeButton}
                                        label={'Start time'}
                                        initialValue={data?.start_date}
                                        name={'start_date'}
                                        mode={'time'}
                                        dateFormat={'HH:mm'}
                                        onChange={onChange}
                                    />
                                    <CustomDateTimePicker
                                        buttonStyle={styles.timeButton}
                                        label={'End time'}
                                        initialValue={data?.end_date}
                                        name={'end_date'}
                                        mode={'time'}
                                        dateFormat={'HH:mm'}
                                        onChange={onChange}
                                    />
                                </>
                            )}
                        </View>
                        <Checkbox
                            name={'is_full_day'}
                            init_checked={data.is_full_day}
                            label={translate(Translations.EventFormFullDay)}
                            onChange={onChange}
                        />
                    </View>

                    {/* Description */}
                    <Input
                        style={styles.description}
                        name={'description'}
                        value={data.description}
                        label={translate(Translations.EnterDescOfTask)}
                        placeholder={translate(Translations.DescEllipsis)}
                        multiline={true}
                        numberOfLines={6}
                        onChangeText={onTextChange('description')}
                    />

                    {/* Files */}
                    <DocPicker files={data.files} onChange={onChange}/>

                    {/* Reminder */}
                    <View style={styles.mediumSpacer}>
                        <Checkbox
                            name={'reminder_enabled'}
                            init_checked={data.reminder_enabled}
                            label={translate(Translations.Reminder)}
                            row_style={{alignItems: "center"}}
                            onChange={onChange}
                        />
                        {!!data.reminder_enabled && (
                            <Dropdown
                                name={'reminder_option'}
                                placeholder={translate(Translations.EventFormReminderOption)}
                                init_value={data.reminder_option}
                                options={reminderOptions}
                                onChange={onChange}
                            />
                        )}
                        {!!data.reminder_enabled && data.reminder_option === CustomReminderOptionValue && (
                            <View style={styles.timeContainer}>
                                <CustomDateTimePicker
                                    label={'Reminder date'}
                                    initialValue={data.custom_reminder}
                                    buttonStyle={{flex: 1, marginBottom: 8}}
                                    name={'custom_reminder'}
                                    mode={'datetime'}
                                    dateFormat={'DD.MM.YYYY HH:mm'}
                                    onChange={onChange}
                                />
                            </View>
                        )}
                    </View>

                    <Button onPress={save}>
                        {translate(Translations.Save)}
                    </Button>
                </ContainerWithScroll>
            </MainWithNavigation>
        </ScreenWithRoundedHeader>
    );
};

const styles = {
    bigSpacer: {
        marginBottom: 30,
    },
    mediumSpacer: {
        marginBottom: 15,
    },
    smallSpacer: {
        marginBottom: 8,
    },
    dateContainer: {
        ...GeneralStyles.row_ac,
        marginVertical: 10,
    },
    timeContainer: {
        ...GeneralStyles.row_ac,
        marginVertical: 10,
        justifyContent: 'space-between',
        flex: 1,
    },
    dateButton: {
        flex: 1,
    },
    timeButton: {
        flex: 0.48,
    },
    description: {
        marginBottom: 15,
        textAlignVertical: 'top',
    },
};
