import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/core';
import { View, Text } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import Actions from "../../redux/Actions";
import API from "../../helpers/API";
import GeneralStyles from '../../constants/GeneralStyles';
import Routes from "../../constants/Routes";
import useThemeStyles from '../../hooks/useThemeStyles';

import Range from '../form/Range';
import Container from "../general/Container";

const ProfileStatistics = props => {
	const dispatch = useDispatch();
	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	const [statistics, setStatistics] = useState([
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
	])

	useEffect(() => {
		API.badges.All().then(response => {
			let data = response.data.data;
			dispatch(Actions.Badges.All(data?.badges));
			setStatistics(prev => {
				let _prev = [...prev];
				_prev[0].items[0].data.value = `${data?.percentage ?? 0}%`;
				return _prev;
			});
		});
	}, []);

	return (
		<Container>
			{statistics.map(({ heading, items }, index) => (
				<View key={index} style={{ marginBottom: 7 }}>
					{heading &&
						<Text style={[GeneralStyles.text_bold, { color: ThemeStyles.dark_text, marginBottom: 22 }]}>
							{heading}
						</Text>
					}

					{items && !!items.length &&
						items.map((range, index) => (
							<View key={index}>
								<Range {...range} />
								{range?.link &&
									<TouchableOpacity style={{ top: -10 }} onPress={() => navigation.navigate(range.link.screen)}>
										<Text style={[GeneralStyles.text_bold, { color: ThemeStyles.blue_text, textAlign: "right" }]}>
											{range.link.label}
										</Text>
									</TouchableOpacity>
								}
							</View>
						))
					}
				</View>
			))}

		</Container>
	)
}


export default ProfileStatistics;
