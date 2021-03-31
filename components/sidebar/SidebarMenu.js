import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';


const SidebarMenu = () => {

    const ThemeStyles = useThemeStyles();

	const menu_items = [
		{ label: useTranslated( Translations.Profile ), screen: "profile" },
		{ label: useTranslated( Translations.MapOfStudies ), screen: "" },
		{ label: useTranslated( Translations.Rankings ), screen: "" },
		{ label: useTranslated( Translations.Simulations ), screen: "" },
		{ label: useTranslated( Translations.ToDoList ), screen: "" },
		{ label: useTranslated( Translations.Calendar ), screen: "" },
		{ label: useTranslated( Translations.LocatingNCUFacilities ), screen: "" },
		{ label: "UOWiRO", screen: "" }
	]	

	return (
		<View style={ styles.box }>
			{ menu_items.map(( item, index ) => (
				<TouchableOpacity key={ index } onPress={ () => console.log( item.screen )}>
					<Text style={[ 
						GeneralStyles.text_regular, 
						ThemeStyles.dark_blue_text, 
						styles.menu_item,
						index + 1 === menu_items.length ? { borderBottomWidth: 0 } : {} 
					]}> { item.label } </Text>
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
		borderBottomWidth: 0.5,
		borderColor: Colors.PrussianBlue
	}
});

export default SidebarMenu;