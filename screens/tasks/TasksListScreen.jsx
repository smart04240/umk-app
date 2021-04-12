import React from "react";
import { ScrollView, View, Text } from "react-native";

import GeneralStyles from "../../constants/GeneralStyles";
import Colors from "../../constants/Colors";
import Translations from "../../constants/Translations";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslated from "../../hooks/useTranslated";

import MainWithNavigation from "../../components/general/MainWithNavigation";
import TopBox from "../../components/general/TopBox";
import Dropdown from "../../components/form/Dropdown";
import Container from "../../components/general/Container";
import TaskListItem from "../../components/tasks/TaskListItem";
import AddTaskButton from "../../components/tasks/AddTaskButton";
import SortBy from "../../components/form/SortBy";


const tasks_sample = {
	title: "Lorem ipsum dolor sit amet",
	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
}

const task_colors = [
	Colors.Purple,
	Colors.Yellow,
	Colors.Green,
	Colors.CarrotOrange,
	Colors.DeepSkyBlue
]

export default function TasksListScreen( props ) {

	const ThemeStyles = useThemeStyles();

	const tasks = [];
	for ( let i = 0; i < 10; i++ ) {
		tasks.push({
			...tasks_sample, 
			id : i + 1, 
			color: task_colors[ i % 5 ] 
		});
	}

	const filter_options = [
		{ value: "*", label: useTranslated( Translations.All )},
		{ value: "completed", label: useTranslated( Translations.Completed )},
		{ value: "not_completed", label: useTranslated( Translations.NotCompleted )}
	]

	return (
		<MainWithNavigation>
			<TopBox>
			
				<Dropdown
					init_value="*"
					label={ useTranslated( Translations.FilterSelectTasksStatus )}
					container_style={{ marginBottom: 0 }}
					options={ filter_options }
				/>

			</TopBox>

			<Container>
				<AddTaskButton />
				<ScrollView>

					<SortBy/>

					<View style={{ flex: 1, zIndex: 1 }}>
						{ tasks && !!tasks.length && 
							tasks.map( task => <TaskListItem key={ task.id } {...task }/> )
						}
					</View>

				</ScrollView>
			</Container>
		</MainWithNavigation>
	)
}