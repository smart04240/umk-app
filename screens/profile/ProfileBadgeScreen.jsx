import React, {useState} from "react";
import {useSelector} from "react-redux";
import { View, Text } from "react-native";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Layout from "../../constants/Layout";
import useThemeStyles from "../../hooks/useThemeStyles";

import BadgeImage from "../../components/badge/BadgeImage";
import BadgeMainInfo from "../../components/badge/BadgeMainInfo";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import TopBox from "../../components/general/TopBox";
import Button from "../../components/form/Button";
import Checkbox from "../../components/form/Checkbox";
import useTranslator from "../../hooks/useTranslator";


export default function BadgeScreen(props) {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const badge = useSelector(state => state.badges.selected);
	const [checked, setChecked]	= useState(false);
	const badge_size = Math.floor( Layout.width * 0.362 );

	const handlePress = () => {
		if(!checked) return;
		
	}
	
	return (
		<MainWithNavigation>
			<TopBox>
				<View style={{ flexDirection: "row", marginBottom: 18 }}>
					<BadgeImage size={ badge_size > 155 ? 155 : badge_size } image_uri={badge.image} />
					<BadgeMainInfo/>
				</View>
			</TopBox>

			<ContainerWithScroll>
				
				<Text style={[ GeneralStyles.text_bold, { color: ThemeStyles.dark_text, marginBottom: 28 } ]}>
					{ translate( Translations.HowToGetIt )}
				</Text>

				<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.dark_text } ]}>
					{translate(badge?.description)}
				</Text>

				{ badge?.active &&
					<View style={{ marginTop: 60 }}>
						<Button onPress={handlePress}>{ translate( Translations.ExportToPdf )}</Button>
						<Checkbox
							label={ translate( Translations.ExportToPdfAgree )}
							required={ true }
							onChange={({name, value}) => {setChecked(value)}}
						/>
					</View>
				}

			</ContainerWithScroll>

		</MainWithNavigation>
	)
}