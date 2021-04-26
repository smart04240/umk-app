import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import GeneralStyles from '../../constants/GeneralStyles';
import Routes from "../../constants/Routes";
import useThemeStyles from '../../hooks/useThemeStyles';

import Range from '../form/Range';

const ProfileStatistics = props => {

	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	const statistics = [
		{
			heading: null,
			items: [
				{
					label: "Zdobyte odznaki",
					color: "orange",
					data: { type: "percent", value: "70%" },
					link: { screen: Routes.ProfileBadges, label: "Zobacz wszystkie odznaki" }
				}
			]
		},
		{
			heading: "Kierunek Filozofia:",
			items: [
				{
					label: "Zaliczone semestry",
					color: "purple",
					data: { type: "range", value: 3, total: 6 }
				},
				{
					label: "Zaliczone kursy",
					data: { type: "percent", value: "75%" }
				}
			]
		},
		{
			heading: "Kierunek Psychologia:",
			items: [
				{
					label: "Zaliczone semestry",
					color: "green",
					data: { type: "range", value: 1, total: 6 }
				},
				{
					label: "Zaliczone kursy",
					color: "red",
					data: { type: "percent", value: "15%" }
				}
			]
		}
	]

	return (
		<View>
			
			{ statistics.map(({ heading, items }, index ) => (
				<View key={ index } style={{ marginBottom: 7 }}>
					{ heading && 
						<Text style={[ GeneralStyles.text_bold, { color: ThemeStyles.dark_text, marginBottom: 22 } ]}>
							{ heading }
						</Text>
					}

					{ items && !!items.length && 
						items.map(( range, index ) => (
							<View key={ index }> 
								<Range {...range } />
								{ range?.link && 
									<TouchableOpacity style={{ top: -10 }} onPress={ () => navigation.navigate( range.link.screen )}>
										<Text style={[ GeneralStyles.text_bold, { color: ThemeStyles.blue_text, textAlign: "right" } ]}>
											{ range.link.label }
										</Text>
									</TouchableOpacity>
								}
							</View>
						))
					}
				</View>
			)) }

		</View>
	)
}


export default ProfileStatistics;
