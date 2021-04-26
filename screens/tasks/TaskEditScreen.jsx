import React, { useLayoutEffect, useMemo, useState, useReducer } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";

import Input from "../../components/form/Input";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import Dropdown from "../../components/form/Dropdown";
import TaskEditEventSection from "../../components/tasks/TaskEditEventSection";
import Button from "../../components/form/Button";
import TaskEditReminderSection from "../../components/tasks/TaskEditReminderSection";
import DocPicker from "../../components/form/doc-picker/DocPicker";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

const reducer = ( state, action ) => {

	switch ( action.type ) {

		case "update": return {...state, [ action.name ]: action.value }

		case "clear": return {}

		case "remove": 

			const state_copy = {...state };
			Array.isArray( action.name )
				? action.name.forEach( k => delete state_copy[ k ])
				: delete state_copy[ action.name ]
			
			return state_copy;

		default: throw new Error();
	}
};

const opt_sample = [
	{ value: 1, label: "Opt 1"},
	{ value: 2, label: "Opt 2"},
	{ value: 3, label: "Opt 3"},
];

const task_sample = {
	title: "task of Potap Zolupa",
	place: 2,
	category: 1,

	is_event: true,
	// one_day_event: true,
	date_from: "2021-04-15",
	date_to: "2021-04-16",
	time_from: "10:00",
	time_to: "20:30",

	description: "DESCRIPTION OF THE AHUITELNI TASK",
	reminder: true,
	reminder_option: "custom",
	reminder_date: "2021-04-20",
	reminder_time: "09:30"
}

export default function TaskEditScreen( props ) {

	const { route } = props;
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const task_id = route.params?.id;

	const editing_task_data = !!task_id 
		? task_sample
		: {};

	const [ data, dispatch ] = useReducer( reducer, editing_task_data );
	const [ error_field_names, setErrorFieldNames ] = useState([]);
	// console.log( "DATA: ", data );

	const main_title = useMemo(() => !!task_id 
		? translate( Translations.EditTheTask ) 
		: translate( Translations.AddANewTask )
	, [ task_id ]);


	const errors = useMemo(() => ({
		title: translate( Translations.EnteringTitleIsRequired ),
		place: translate( Translations.SelectingPlaceIsRequired ),
		category: translate( Translations.SelectingCategoryIsRequired ) 
	}), [ translate ]);


	const main_dropdowns = useMemo(() => ([
		{
			name: "place",
			placeholder: "Miejsce *",
			options: opt_sample
		},
		{
			name: "category",
			placeholder: "Kategoria *",
			options: opt_sample,
		}
	]) , []);


	const getErrorMessage = name => error_field_names.includes( name ) ? errors[ name ] : "";
	
	const inputOnChangeText = ( name, text ) =>  dispatch({ type: "update", name, value: text });

	const onChange = o => dispatch({ type: "update", name: o.name, value : o.value });


	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>
								
					<Text style={[
						GeneralStyles.text_regular,
						{ color: ThemeStyles.dark_text, marginBottom: 20 }
					]}>
						{ main_title }
					</Text>

					<View style={{ width: "100%", marginBottom: 30 }}>

						<Input
							name="title"
							placeholder="Tytuł zadania *"
							defaultValue={ editing_task_data?.title }
							style={{ marginBottom: 8 }}
							error_message={ getErrorMessage( "title" )}
							onChangeText={ v => inputOnChangeText( "title", v )}
						/>

						{ main_dropdowns.map( dropdown => (
							<Dropdown
								key={ dropdown.name }
								{...dropdown }
								init_value={ editing_task_data?.[ dropdown.name ]}
								error_message={ getErrorMessage( dropdown.name )}
								onChange={ o => onChange( o )}
							/>
						)) }
					</View>

						
					<TaskEditEventSection
						data={ data }
						onChange={ o => { 
							onChange( o );
							
							if ( o.name === "is_event" && !o.value ) {
								dispatch({ 
									type: "remove", 
									name: [ "one_day_event", "date_from", "date_to", "time_from", "time_to" ] 
								})
							}

							if ( o.name === "one_day_event" && !!o.value ) {
								dispatch({
									type: "remove",
									name: [ "time_from", "time_to" ]
								})
							}
						}}
					/>

					<Input
						name="description"
						defaultValue={ editing_task_data?.description }
						style={{ marginBottom: 15 }}
						label={ translate( Translations.EnterDescOfTask )}
						placeholder={ translate( Translations.DescEllipsis )}
						multiline={ true }
						numberOfLines={ 6 }
						onChangeText={ v => inputOnChangeText( "description", v )}
					/>
				

					<DocPicker onChange={ onChange }/>

					<TaskEditReminderSection
						data={ data }
						onChange={ o => {
							onChange( o );

							if ( o.name === "reminder" && !o.value ) {
								dispatch({
									type: "remove",
									name: [ "reminder_option", "reminder_date", "reminder_time"]
								})
							}

							if ( o.name === "reminder_option" && o.value !== "custom" ) {
								dispatch({
									type: "remove",
									name: [ "reminder_date", "reminder_time"]
								})
							}
						}}
					/>

					<Button>
						{ translate( Translations.Save )}
					</Button>

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
} 
