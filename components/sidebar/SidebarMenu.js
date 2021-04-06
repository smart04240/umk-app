import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from '@react-navigation/core';

import useTranslated from "../../hooks/useTranslated";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Routes from '../../constants/Routes';
import Translations from "../../constants/Translations";


const SidebarMenu = () => {

    const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const route = useRoute();

	const menu_items = [
		{ label: useTranslated( Translations.Profile ), screen: Routes.Profile },
		{ label: useTranslated( Translations.MapOfStudies ), screen: "" },
		{ label: useTranslated( Translations.Rankings ), screen: "" },
		{ label: useTranslated( Translations.Simulations ), screen: "" },
		{ label: useTranslated( Translations.ToDoList ), screen: "" },
		{ label: useTranslated( Translations.Calendar ), screen: "" },
		{ label: useTranslated( Translations.LocatingNCUFacilities ), screen: "" },
		{ label: "UOWiRO", screen: "" }
	];


	return (
		<View style={ styles.box }>
			{ menu_items.map(( item, index ) => (
				<TouchableOpacity key={ index } onPress={ () => item.screen ? navigation.navigate( item.screen ) : null }>
					<Text style={[
						styles.menu_item,
						{ color: ThemeStyles.dark_blue_text, borderColor: ThemeStyles.dark_blue_text }, 
						item.screen === route.name ? GeneralStyles.text_bold : GeneralStyles.text_regular, 
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
		borderBottomWidth: 0.5
	}
});

export default SidebarMenu;