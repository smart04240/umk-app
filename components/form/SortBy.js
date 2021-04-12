import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';

import Dropdown from './Dropdown';

const SortBy = props => {

	const ThemeStyles = useThemeStyles();

	const options = [
		{ value: "date_asc", label: useTranslated( Translations.DateAsc )},
		{ value: "date_desc", label: useTranslated( Translations.DateDesc )},
		{ value: "A-Z", label: useTranslated( Translations.NameAZ )},
		{ value: "Z-A", label: useTranslated( Translations.NameZA )}
	]

	return (
		<View style={[
			styles.container,
			props.container_style || {}
		]}>
			<Text style={[
				GeneralStyles.text_regular,
				{ color: ThemeStyles.dark_blue_text }
			]}> Sortuj według </Text>

			<Dropdown
				init_value="date_asc"
				options={ options }
				container_style={ styles.dropdown_container }
				box_style={ styles.dropdown_box }
				options_box_style={{ maxHeight: 400 }}
				value_label_style={[
					styles.dropdown_value_label,
					{ color: ThemeStyles.dark_blue_text }
				]}
				onChange={ props.onChange }
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		...GeneralStyles.row_ac,
		width: "100%",
		marginBottom: 14,
		zIndex: 10
	},

	dropdown_container: {
		marginBottom: 0,
		marginLeft: 20,
		flexGrow: 1,
	},

	dropdown_box: {
		borderWidth: 0,
		zIndex: 10,
		paddingHorizontal: 0,
		paddingVertical: 0
	},

	dropdown_value_label: {
		flex: 0,
		marginLeft: "auto"
	}
});


export default SortBy;