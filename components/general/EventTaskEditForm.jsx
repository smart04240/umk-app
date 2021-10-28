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

export const EventTaskEditForm = ({onChange, isToDo, categoryValue, formTitle, title, description, files, canSave, saveData, eventData, validateStartDate, validateEndDate}) => {
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
            name: isToDo ? "category" : "category_id",
            placeholder: translate(Translations.SelectCategory) + ' *',
            options: isToDo ? TaskCategories : eventsOptions,
            init_value: (isToDo ? TaskCategories : eventsOptions).find(option => option.value === categoryValue)?.value,
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
                {formTitle}
            </Text>
            <View style={{width: "100%", marginBottom: 30}}>
                <Input
                    name="title"
                    placeholder={translate(Translations.EnterTitleOfTask)}
                    defaultValue={title}
                    style={{marginBottom: 8}}
                    error_message={getErrorMessage("title")}
                    onChangeText={title => onChange({name: 'title', value: title})}
                />
                {main_dropdowns.map(dropdown => (
                   <Dropdown
                       key={dropdown.name}
                       {...dropdown}
                       placeholder={dropdown?.placeholder}
                       error_message={getErrorMessage(dropdown.name)}
                       onChange={onChange}
                   />
                ))}
            </View>
            {!isToDo && eventData && (
                <TaskEditEventSection
                    data={eventData}
                    onChange={onChange}
                    validateStartDate={validateStartDate}
                    validateEndDate={validateEndDate}
                />
            )}
            <Input
                name="description"
                defaultValue={description}
                style={{marginBottom: 15, textAlignVertical: 'top'}}
                label={translate(Translations.EnterDescOfTask)}
                placeholder={translate(Translations.DescEllipsis)}
                multiline={true}
                numberOfLines={6}
                onChangeText={text => onChange({name: 'description', value: text})}
            />
            {!isToDo && <DocPicker files={files} onChange={onChange}/>}
            {!isToDo && eventData && <TaskEditReminderSection data={eventData} onChange={onChange}/>}
            <Button
                disabled={canSave}
                onPress={saveData}
            >
                {translate(Translations.Save)}
            </Button>
        </>
    )
};
