import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';

import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Routes from '../../constants/Routes';
import shadowGenerator from "../../helpers/shadowGenerator";

export const categories = [
	{
		value: 1,
		color: Colors.Yellow,
	},
	{
		value: 2,
		color: Colors.Purple,
	},
	{
		value: 3,
		color: Colors.Green,
	},
	{
		value: 4,
		color: Colors.CarrotOrange,
	},
	{
		value: 5,
		color: Colors.DeepSkyBlue,
	},
];

const TaskListItem = props => {
	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const itemCategory = categories.find(category => category.value === parseInt(props.category));

	const actions = [
		{icon: "eye-outline", onPress: () => navigation.navigate(Routes.TaskSingle, props)},
		{icon: "pencil-outline", onPress: () => navigation.navigate(Routes.TaskEdit, props)},
	];

	return (
		<View style={[
			styles.box,
			{backgroundColor: ThemeStyles.box_bg},
			{borderLeftColor: itemCategory.color || Colors.Purple},
			props.box_style || {}
		]}>
			<View style={styles.content}>
				<Text style={[
					GeneralStyles.text_bold,
					{color: ThemeStyles.dark_text},
					{marginBottom: 5}
				]}>
					{props.title}
				</Text>
				<Text style={[
					{
						maxHeight: 70
					},
					GeneralStyles.text_regular,
					{color: ThemeStyles.dark_text}
				]}>
					{props.description?.substring(0, 60)}
				</Text>
			</View>
			<View style={styles.actions}>
				{actions.map((action, index) => (
					<TouchableOpacity
						key={index}
						style={[
							GeneralStyles.circle_with_icon,
							{borderColor: ThemeStyles.blue_text}
						]}
						onPress={action.onPress}
					>
						<MaterialCommunityIcons
							name={action.icon}
							size={22}
							color={ThemeStyles.icon_color}
						/>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		width: "100%",
		minHeight: 100,
		maxHeight: 121,
		flexDirection: "row",
		marginBottom: 14,
		borderRadius: 15,
		paddingTop: 14,
		paddingBottom: 10,
		paddingHorizontal: 12,
		borderLeftWidth: 14,
		...shadowGenerator(1)
	},
	content: {
		flexShrink: 1,
		flexGrow: 1
	},
	actions: {
		marginLeft: 20,
		justifyContent: "space-between"
	}
})

export default TaskListItem;
