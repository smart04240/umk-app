import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/core';

import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import GeneralStyles from "../../constants/GeneralStyles";
import Fonts from '../../constants/Fonts';
import Actions from "../../redux/Actions";

import Sidebar from '../sidebar/Sidebar';
import Layout from '../../constants/Layout';
import Routes from '../../constants/Routes';
import { useDispatch } from 'react-redux';

const HeaderRight = props => {

	const dispatch = useDispatch();
	const notification_amount = 10;

    const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const route = useRoute();
	
	const openSidebar = () => dispatch( Actions.Sidebar.Open());

	const remind_icon = route.name === Routes.Reminders ? "bell" : "bell-outline";

	return (
		<>
			<View style={[ GeneralStyles.row_ac ]}>

				<TouchableOpacity 
					style={[ styles.remind_button ]}
					onPress={ () => navigation.navigate( Routes.Reminders )}
				>
			
					<MaterialCommunityIcons name={ remind_icon } size={ 24 } color={ ThemeStyles.icon_color } />
					
					{ notification_amount && 
						<View style={ styles.notification }> 
							<Text style={ styles.notification_text }> 
								{ notification_amount >= 10 ? "9+" : notification_amount } 
							</Text> 
						</View>
					}

				</TouchableOpacity>

				<TouchableOpacity onPress={ openSidebar } style={[ styles.menu_button ]}>
					<MaterialCommunityIcons name="menu" size={ 28 } color={ ThemeStyles.icon_color } />
				</TouchableOpacity>
			</View>

			{/* <Sidebar getOpenMethod={ m => setSidebarOpen( m )} /> */}
		</>
	)
}

const styles = StyleSheet.create({
	button: { padding: 10 },

	remind_button: {
		padding: 10,
		position: "relative"
	},

	menu_button: {
		padding: 10,
		marginLeft: 14, 
		marginRight: Layout.paddingHorizontal - 10
	},

	notification: { 
		...GeneralStyles.row_centered,
		backgroundColor: Colors.Red,
		position: "absolute",
		right: 2,
		top: 2,
		width: 18,
		height: 18,
		borderRadius: 18 
	},

	notification_text: {
		fontSize: 12,
		fontFamily: Fonts.ProximaNova.Regular,
		color: Colors.White
	}
})


export default HeaderRight;