import React, {useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import GeneralStyles from "../../constants/GeneralStyles";
import Input from "../form/Input";
import Dropdown from "../form/Dropdown";
import TaskEditEventSection from "../tasks/TaskEditEventSection";
import Translations from "../../constants/Translations";
import DocPicker from "../form/doc-picker/DocPicker";
import TaskEditReminderSection from "../tasks/TaskEditReminderSection";
import Button from "../form/Button";
import useTranslator from "../../hooks/useTranslator";
import useThemeStyles from "../../hooks/useThemeStyles";
import {useCategoryPreparer} from "../../hooks/useCategoryPreparer";

export const EventTaskEditForm = props => {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const eventsOptions = useCategoryPreparer();

    const [error_field_names, setErrorFieldNames] = useState([]);

    const errors = useMemo(() => ({
        title: translate(Translations.EnteringTitleIsRequired),
        place: translate(Translations.SelectingPlaceIsRequired),
        category: translate(Translations.SelectingCategoryIsRequired)
    }), [translate]);

    const TaskCategories = [
        {
            value: 1,
            label: translate(Translations.TaskCategory1),
            color: '#ff111a'
        },
        {
            value: 2,
            label: translate(Translations.TaskCategory2),
            color: '#ff9124',
        },
        {
            value: 3,
            label: translate(Translations.TaskCategory3),
            color: '#b73839'
        },
        {
            value: 4,
            label: translate(Translations.TaskCategory4),
            color: '#346eaa'
        },
    ];

    const main_dropdowns = [
        // {
        //     name: "place",
        //     placeholder: "Miejsce *",
        //     options: opt_sample,
        //     init_value: opt_sample.find(option => option.value === props?.placeValue)?.value,
        // },
        {
            name: "category",
            placeholder: "Kategoria *",
            options: props.isToDo ? TaskCategories : eventsOptions,
            init_value: (props.isToDo ? TaskCategories : eventsOptions).find(option => option.value === props?.categoryValue)?.value,
        }
    ];

    const getErrorMessage = name => error_field_names.includes(name) ? errors[name] : "";

    return (
        <>
            <Text
                style={[
                    GeneralStyles.text_regular,
                    {color: ThemeStyles.dark_text, marginBottom: 20}
                ]}
            >
                {props?.formTitle}
            </Text>
            <View style={{width: "100%", marginBottom: 30}}>
                <Input
                    name="title"
                    placeholder="Tytuł zadania *"
                    defaultValue={props?.title}
                    style={{marginBottom: 8}}
                    error_message={getErrorMessage("title")}
                    onChangeText={props?.titleOnChange}
                />
                {main_dropdowns.map(dropdown => (
                   <Dropdown
                       key={dropdown.name}
                       {...dropdown}
                       error_message={getErrorMessage(dropdown.name)}
                       onChange={props?.dropdownOnChange}
                   />
                ))}
            </View>
            {props.isEvent && props.eventData && (
                <TaskEditEventSection
                    data={props.eventData}
                    onChange={props.editEventOnChange}
                    validateStartDate={props?.validateStartDate}
                    validateEndDate={props?.validateEndDate}
                />
            )}
            <Input
                name="description"
                defaultValue={props?.description}
                style={{marginBottom: 15, textAlignVertical: 'top'}}
                label={translate(Translations.EnterDescOfTask)}
                placeholder={translate(Translations.DescEllipsis)}
                multiline={true}
                numberOfLines={6}
                onChangeText={props?.descriptionOnChange}
            />
            <DocPicker files={props?.files} onChange={props?.docPickerOnChange}/>
            {props.isEvent && props.reminderData && <TaskEditReminderSection data={props.reminderData} onChange={props.reminderOnChange}/>}
            <Button
                disabled={props?.canSave}
                onPress={props?.saveData}
            >
                {translate(Translations.Save)}
            </Button>
        </>
    )
};
