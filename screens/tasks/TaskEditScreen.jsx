import React, { useLayoutEffect, useMemo, useState, useReducer } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslated from "../../hooks/useTranslated";

import Input from "../../components/form/Input";
import Container from "../../components/general/Container";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import Dropdown from "../../components/form/Dropdown";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";

const reducer = ( state, action ) => ({...state, [ action.name ]: action.value });

const opt_sample = [
	{ value: 1, label: "Opt 1"},
	{ value: 2, label: "Opt 2"},
	{ value: 3, label: "Opt 3"},
];

const task_sample = {
	name: "task of Potap Zolupa",
	place: 2,
	category: 1
}

export default function TaskEditScreen( props ) {

	const { navigation, route } = props;
	const translate = useTranslator();
	const theme = useSelector( state => state.theme );
	const ThemeStyles = useThemeStyles();
	const task_id = route.params?.id;

	const editing_task_data = !!task_id 
		? task_sample
		: {};

	const [ data, dispatch ] = useReducer( reducer, editing_task_data );
	const [ error_field_names, setErrorFieldNames ] = useState([]);
	console.log( "DATA: ", data );

	useLayoutEffect(() => {
        navigation.setOptions({
			headerStyle: [ 
				theme === "light" ? GeneralStyles.header_without_tb : {},
				{ backgroundColor: ThemeStyles.box_bg } 
			]
		});
    }, [ navigation, ThemeStyles ]);
	

	const main_title = useMemo(() => !!task_id 
		? translate( Translations.EditTheTask ) 
		: translate( Translations.AddANewTask )
	, [ task_id ]);


	const errors = useMemo(() => ({
		name: translate( Translations.EnteringTitleIsRequired ),
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
	

	return (
		<MainWithNavigation>

			<Container>
				<ScrollView>

					<TouchableOpacity onPress={ () => setErrorFieldNames([ "name", "category", "place" ]) }>
						<Text style={{ marginBottom: 20 }}> aaa </Text>
					</TouchableOpacity>
				
					<Text style={[
						GeneralStyles.text_regular,
						{ color: ThemeStyles.dark_text, marginBottom: 20 }
					]}>
						{ main_title }
					</Text>

					<View>

						<Input
							name="name"
							placeholder="Tytuł zadania *"
							defaultValue={ editing_task_data?.name }
							style={{ marginBottom: 8 }}
							error_message={ getErrorMessage( "name" )}
							onChangeText={ v => dispatch({ name: "name", value: v }) }
						/>

						{ main_dropdowns.map( dropdown => (
							<Dropdown
								key={ dropdown.name }
								{...dropdown }
								init_value={ editing_task_data?.[ dropdown.name ]}
								error_message={ getErrorMessage( dropdown.name )}
								onChange={ o => dispatch({ name: o.name, value : o.value }) }
							/>
						)) }
					</View>

				</ScrollView>
			</Container>

		</MainWithNavigation>
	)
} 