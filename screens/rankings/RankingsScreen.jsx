import React from "react";
import { View, Text } from "react-native";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import useThemeStyles from "../../hooks/useThemeStyles";

import MainWithNavigation from "../../components/general/MainWithNavigation";
import Tabs from "../../components/general/Tabs";
import TopBox from "../../components/general/TopBox";
import Dropdown from "../../components/form/Dropdown";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import Layout from "../../constants/Layout";
import RankingBox from "../../components/ranking/RankingBox";
import useTranslator from "../../hooks/useTranslator";

const ranking_sample = {
	number: 1,
	avatar_source: require("../../assets/images/avatar.jpg"),
	user_nickname: "nick_studenta1234",
	badges: 12,
	points: 254 
}

export default function RankingsScreen() {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();

	const rankings = [];
	for ( let i = 0; i < 15; i++) {
		rankings.push({ ...ranking_sample, number: i + 1 })
	}

	return (
		<MainWithNavigation>

			<TopBox>
				<Text style={[ 
					GeneralStyles.text_regular,
					{ color: ThemeStyles.dark_blue_text, marginBottom: 25 } 
				]}>
					{ translate( Translations.ChooseARanking )}
				</Text>

				<Tabs
					style={{ justifyContent: "space-around" }}
					tabs={[ translate( Translations.Faculty ), translate( Translations.Annual ) ]}
				/>
			</TopBox>

			<ContainerWithScroll>

				<Dropdown
					label={ translate( Translations.FilterSelectDirection )}
					options_box_style={{ maxHeight: Layout.height * 0.5 }}
					options={[
						{ value: "*", label: "Wszystkie" },
						{ value: 1, label: "Option 1" },
					]}
				/>

				<View style={{ marginTop: 20 }}>
					{ rankings && !!rankings.length &&
						rankings.map( ranking => <RankingBox key={ ranking.number } {...ranking } />)
					}
				</View>

			</ContainerWithScroll>
		</MainWithNavigation>
	)
}