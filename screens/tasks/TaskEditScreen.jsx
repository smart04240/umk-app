import React, {useMemo, useReducer} from "react";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import {EventTaskEditForm} from "../../components/general/EventTaskEditForm";
import 'react-native-get-random-values';
import {v4 as uuidv4} from "uuid";
import Routes from "../../constants/Routes";
import {useNavigation} from "@react-navigation/core";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import {useDispatch, useSelector} from "react-redux";
import Actions from "../../redux/Actions";
import {ToDosSelectors} from "../../redux/selectors/todosSelectors";

const generateTodo = () => {
	return {
		id: uuidv4(),
		title: '',
		description: '',
		place: '',
		category: '',
		files: [],
		completed: false
	}
}

export default function TaskEditScreen(props) {
	const id = props?.route?.params?.id;
	const navigation = useNavigation();
	const translate = useTranslator();
	const dispatch = useDispatch();
	const todo = useSelector(state => ToDosSelectors.byId(state, id));
	const [data, setData] = React.useState(!!todo ? todo : generateTodo());

	const canSave = useMemo(() => {
		return !!data?.description?.length && !!data?.title?.length && !!data?.category && !!data?.place
	},[data]);

	const onChange = (name, value) => {
		setData({
			...data,
			[name] : value
		});
	};

	const title = useMemo(() => {
		return !!id ? translate(Translations.EditTheTask) : translate(Translations.AddANewTask)
	}, [id]);

	const save = () => {
		dispatch(Actions.ToDos.upsertOne({
			...data
		}));
		navigation.navigate(Routes.Tasks);
	};

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>
					<EventTaskEditForm
						formTitle={title}
						title={data?.title}
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
					/>
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}
