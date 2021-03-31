import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5  } from '@expo/vector-icons';
import { isFunction } from '../../helpers/functions';

import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import GeneralStyles from "../../constants/GeneralStyles";
import Fonts from '../../constants/Fonts';

import Sidebar from '../navigation/Sidebar';

const HeaderRight = props => {

	const [ sidebarOpen, setSidebarOpen ] = useState( null );
	const notification_amount = 10;
    const ThemeStyles = useThemeStyles();

	
	const openSidebar = () => {
		if ( isFunction( sidebarOpen.open )) sidebarOpen.open()
	};

	return (
		<>
			<View style={ styles.container }>

				<TouchableOpacity style={[ styles.button, { position: "relative" } ]}>
			
					<FontAwesome5 name="bell" size={ 25 } color={ ThemeStyles.icon_color } />
					
					{ notification_amount && 
						<View style={ styles.notification }> 
							<Text style={ styles.notification_text }> 
								{ notification_amount >= 10 ? "9+" : notification_amount } 
							</Text> 
						</View>
					}

				</TouchableOpacity>

				<TouchableOpacity onPress={ openSidebar } style={[ styles.button, { marginHorizontal: 14, } ]}>
					<FontAwesome name="navicon" size={ 25 } color={ ThemeStyles.icon_color } />
				</TouchableOpacity>
			</View>

			<Sidebar getOpenMethod={ m => setSidebarOpen( m )} />
		</>
	)
}

const styles = StyleSheet.create({
	container: {...GeneralStyles.row_ac, marginRight: "auto" },
	button: { padding: 10 },
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