import React from 'react';
import { View, Text } from 'react-native';

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from '../../constants/Translations';
import useThemeStyles from "../../hooks/useThemeStyles";

import Badge from '../badge/Badge';
import BadgeWithRange from '../badge/BadgeWithRange';
import Container from "../general/Container";
import useTranslator from "../../hooks/useTranslator";

const ProfileInformation = props => {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();

	const index_number = 22222;

	const started_badges = [
		{
			id: 114,
			name: "Odznaka srebrna",
			range_props: {
				label: "zaliczone 3 z 6 przedmiotów!",
				color: "purple",
				hide_value_label: true,
				data: { type: "range", value: 3, total: 6 }
			}
		},
		{
			id: 221,
			name: "Odznaka złota",
			range_props: {
				label: "zaliczone 5 z 6 przedmiotów!",
				color: "purple",
				hide_value_label: true,
				data: { type: "range", value: 5, total: 6 }
			}
		},
		{
			id: 212,
			name: "Odznaka złota",
			range_props: {
				label: "zaliczone 5 z 6 przedmiotów!",
				color: "purple",
				hide_value_label: true,
				data: { type: "range", value: 5, total: 6 }
			}
		},
	];
	const other_badges = [
		{ id: 1, name: "Odznaka złota" },
		{ id: 2, name: "Odkrywca" },
	]

	const title_styles = [ GeneralStyles.text_bold, { color: ThemeStyles.dark_text }];

	return (
		<Container>
			<View style={[ GeneralStyles.row_ac, { marginBottom: 28 } ]}>
				<Text style={ title_styles }> { translate( Translations.IndexNumber )} </Text>
				<Text style={[ GeneralStyles.text_regular, { marginLeft: 65, color: ThemeStyles.dark_text } ]}>
					{ index_number }
				</Text>
			</View>


			{ started_badges && !!started_badges.length &&
				<View>
					<Text style={[ ...title_styles, { marginBottom: 28 } ]}>
						{ translate( Translations.StartedBudges )}
					</Text>

					{ started_badges.map( badge => <BadgeWithRange key={ badge.id} {...badge } />)}
				</View>
			}


			{ other_badges && !!other_badges.length &&
				<View>
					<Text style={[ ...title_styles, { marginBottom: 28 } ]}>
						{ translate( Translations.OtherBudgesToEarn )}
					</Text>

					<View style={[ GeneralStyles.row_wrap, { justifyContent: "space-around" } ]}>
						{ other_badges.map( badge => <Badge key={ badge.id } {...badge } />)}
					</View>
				</View>
			}
		</Container>
	)
}


export default ProfileInformation;
