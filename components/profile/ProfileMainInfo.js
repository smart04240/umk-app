import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import Fonts from '../../constants/Fonts';
import Translations from '../../constants/Translations';

import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';

import Dropdown from "../form/Dropdown";

const ProfileMainInfo = props => {

    const ThemeStyles = useThemeStyles();
	const user = useSelector( state => state.user );

	const nick_name = "nick_studenta123";
	const ECTS = "59%";
	const to_end = "13 miesięcy";

	const info = [
		{ label: useTranslated( Translations.ECTSEarned ), value: ECTS },
		{ label: useTranslated( Translations.EndOfStudies ), value: to_end }
	];


	const options = [
		{ value: 1, label: "Filozofia" },
		{ value: 2, label: "Filozofia Filo" }, 
		{ value: 3, label: "Filozofia Filozofia Filozofia" }, 
		{ value: 4, label: "Filoz" }, 
	]

	return (
		<View style={{ flexGrow: 1 }}>
			<Text style={[ styles.font_family, styles.big, { color: ThemeStyles.dark_blue_text } ]}> { nick_name } </Text>

			<Dropdown
				name="position"
				options={ options }
			/>

			<View>
				{ info.map(( item, index ) => (
					<View key={ index }>
						<Text style={[ styles.font_family, styles.small, { color: ThemeStyles.dark_blue_text } ]}> { item.label } </Text>
						<Text style={[ styles.font_family, styles.medium, { color: ThemeStyles.dark_blue_text } ]} > { item.value } </Text>
					</View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	font_family: { fontFamily: Fonts.ProximaNova.Regular },

	big: { fontSize: 20, marginBottom: 19 },

	medium: { fontSize: 18 },

	small: { fontSize: 14 }
});


export default ProfileMainInfo;