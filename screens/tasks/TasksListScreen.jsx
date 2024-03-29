import React, {useMemo} from "react";
import { ScrollView, View, Text } from "react-native";
import Translations from "../../constants/Translations";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import TopBox from "../../components/general/TopBox";
import Dropdown from "../../components/form/Dropdown";
import TaskListItem from "../../components/tasks/TaskListItem";
import FloatAddButton from "../../components/tasks/FloatAddButton";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import {useSelector} from "react-redux";
import {ToDosSelectors} from "../../redux/selectors/todosSelectors";
import Routes from "../../constants/Routes";
import {useNavigation} from "@react-navigation/core";
import useTranslator from "../../hooks/useTranslator";

export default function TasksListScreen(props) {
	const todos = useSelector(state => ToDosSelectors.All(state));
	const translate = useTranslator();
	const navigation = useNavigation();
	const [filterOption, setFilterOption] = React.useState('');

	const filter_options = [
		{ value: "*", label: translate( Translations.All )},
		{ value: "completed", label: translate( Translations.Completed )},
		{ value: "not_completed", label: translate( Translations.NotCompleted )}
	];

	const filterItems = useMemo(() => {
		if (filterOption === filter_options[1].value) {
			return todos.filter(todo => todo?.completed);
		} else if (filterOption === filter_options[2].value){
			return todos.filter(todo => !todo?.completed);
		}

		return todos;
	},[filterOption, todos]);

	return (
		<MainWithNavigation>
			<FloatAddButton onPress={() => navigation.navigate(Routes.TaskEdit)}/>
			<TopBox>
				<Dropdown
					init_value="*"
					onChange={option => setFilterOption(option.value)}
					label={translate(Translations.FilterSelectTasksStatus)}
					container_style={{marginBottom: 0}}
					options={filter_options}
				/>
			</TopBox>
			<ContainerWithScroll>
				<View style={{flex: 1, zIndex: 1}}>
					{filterItems && !!filterItems.length && filterItems.map((task, index) => (
						<TaskListItem key={index} {...task}/>
					))}
				</View>
			</ContainerWithScroll>
		</MainWithNavigation>
	)
}
