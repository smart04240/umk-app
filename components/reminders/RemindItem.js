import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Actions from "../../redux/Actions";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';

const RemindItem = props => {

	const ThemeStyles = useThemeStyles();
	const dispatch = useDispatch();

	const { id, title, when, read } = props;

	const eyePress = () => {
		!read
			? dispatch( Actions.Reminders.MarkAsRead( id ))
			: null
	}

	return (
		<View style={[
			styles.container
		]}>
			<View style={[
				styles.content
			]}>
				<Text style={[
					read ? GeneralStyles.text_regular : GeneralStyles.text_bold,
					{ color: ThemeStyles.dark_text },
					{ marginBottom: 3 }
				]}> 
					{ title }
				</Text>

				<Text style={[
					GeneralStyles.text_regular,
					{ color: read ? ThemeStyles.dark_text : ThemeStyles.blue_text },
					{ opacity: read ? 0.5 : 1 }
				]}>
					{ when }
				</Text>
			</View>

			<TouchableWithoutFeedback onPress={ eyePress }>
				<View style={[
					GeneralStyles.circle_with_icon,
					{ marginTop: 11, marginLeft: 20 },
					{ borderColor: read ? Colors.Manatee : ThemeStyles.blue_text }
				]}>
					<MaterialCommunityIcons
						name="eye-outline" 
						size={ 22 } 
						color={ read ? Colors.Manatee : ThemeStyles.icon_color } 
					/>
				</View>
			</TouchableWithoutFeedback>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 26,
		flexDirection: "row"
	},

	content: {
		flexShrink: 1 
	}
})


export default RemindItem;