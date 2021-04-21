import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { getUnreadRemindersAmount } from '../../redux/reducers/remindersReducer';

import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import GeneralStyles from "../../constants/GeneralStyles";
import Fonts from '../../constants/Fonts';
import Routes from '../../constants/Routes';

const RemindersBell = props => {

	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const route = useRoute();

	const reminders_unread_amount = useSelector( state => getUnreadRemindersAmount( state ));
	const reminders_shown_amount = reminders_unread_amount >= 10 ? "9+" : reminders_unread_amount;
	const remind_icon = route.name === Routes.Reminders ? "bell" : "bell-outline";

	return (
		<TouchableOpacity 
			style={[ styles.remind_button ]}
			onPress={ () => navigation.navigate( Routes.Reminders )}
		>
	
			<MaterialCommunityIcons name={ remind_icon } size={ 24 } color={ ThemeStyles.icon_color } />
			
			{ !!reminders_unread_amount && 
				<View style={ styles.reminders_circle }> 
					<Text style={ styles.reminders_amount }> 
						{ reminders_shown_amount } 
					</Text> 
				</View>
			}

		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({

	remind_button: {
		padding: 10,
		position: "relative"
	},

	reminders_circle: { 
		...GeneralStyles.row_centered,
		backgroundColor: Colors.Red,
		position: "absolute",
		right: 2,
		top: 2,
		width: 18,
		height: 18,
		borderRadius: 18 
	},

	reminders_amount: {
		fontSize: 12,
		fontFamily: Fonts.ProximaNova.Regular,
		color: Colors.White
	}
})

export default RemindersBell;