import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import {  } from "react-native-gesture-handler";
import { useNavigation, useRoute } from '@react-navigation/core';

import useTranslated from "../../hooks/useTranslated";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Menu from "../../constants/Menu";


const SidebarMenu = () => {

    const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<View style={ styles.box }>
			{ Menu.map(( item, index ) => (
				<TouchableOpacity key={ index } onPress={ () => item.screen ? navigation.navigate( item.screen ) : null }>
					<Text style={[
						styles.menu_item,
						{ color: ThemeStyles.dark_blue_text, borderColor: ThemeStyles.dark_blue_text }, 
						item.screen === route.name ? GeneralStyles.text_bold : GeneralStyles.text_regular, 
						index + 1 === Menu.length ? { borderBottomWidth: 0 } : {} 
					]}> { useTranslated( item.label )} </Text>
				</TouchableOpacity>
			))}
		</View>
	)
}


const styles = StyleSheet.create({
	box: { flex: 1, paddingRight: 30, marginBottom: 25 },
	menu_item: {
		paddingLeft: 15,
		paddingVertical: 15,
		borderBottomWidth: 0.5
	}
});

export default SidebarMenu;