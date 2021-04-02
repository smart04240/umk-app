import React from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons  } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/core';

import Layout from '../../constants/Layout';
import Routes from "../../constants/Routes";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';

const BottomNavigation = props => {

	const ThemeStyles = useThemeStyles();
	const route = useRoute();

	const isButtonActive = name => route.name.split(".")[0] === name;

	const buttons = [
		{
			icon: "account-outline", 
			icon_active: "account",
			active: isButtonActive("profile"), 
			screen: Routes.Profile 
		},
		{ 
			icon: "map-outline", 
			icon_active: "map",
			active: isButtonActive("map"), 
			screen: "profile" 
		},
		{ 
			icon: "medal-outline", 
			icon_active: "medal",
			active: isButtonActive("statistics"), 
			screen: "profile" 
		},
		{ 
			icon: "comment-question-outline", 
			icon_active: "comment-question",
			active: isButtonActive("questions"), 
			screen: "profile" 
		},
		{ 
			icon: "calendar-blank-outline", 
			icon_active: "calendar-blank",
			active: isButtonActive("calendar"), 
			screen: "profile" 
		}
	];

	return (
		<View style={[ GeneralStyles.row_center_between, styles.nav, { backgroundColor: ThemeStyles.box_bg } ]}>
			
			{ buttons.map(( button, index ) => {
			
				const icon = button.active ? button.icon_active : button.icon;

				return (
					<TouchableOpacity key={ index } onPress={ () => navigation.navigate( button.screen )}>
						<MaterialCommunityIcons name={ icon } size={ 25} color={ ThemeStyles.icon_color } />
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	nav: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 16,
		paddingBottom: 19,
		paddingHorizontal: Layout.paddingHorizontal,
		elevation: 100,
		zIndex: 100
	}
})


export default BottomNavigation;