import React from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons  } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

import Layout from '../../constants/Layout';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';

const BottomNavigation = props => {

	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	const buttons = [
		{ icon: "account", screen: "profile" },
		{ icon: "map-outline", screen: "profile" },
		{ icon: "medal-outline", screen: "profile" },
		{ icon: "comment-question-outline", screen: "profile" },
		{ icon: "calendar-blank", screen: "profile" }
	];

	return (
		<View style={[ GeneralStyles.row_center_between, styles.nav, { backgroundColor: ThemeStyles.box_bg } ]}>
			
			{ buttons.map(( button, index ) => (
				<TouchableOpacity key={ index } onPress={ () => navigation.navigate( button.screen )}>
					<MaterialCommunityIcons name={ button.icon } size={ 25} color={ ThemeStyles.icon_color } />
				</TouchableOpacity>
			)) }
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
		elevation: 99,
		zIndex: 99
	}
})


export default BottomNavigation;