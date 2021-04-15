import React from "react";
import { View, Text } from "react-native";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Layout from "../../constants/Layout";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslated from "../../hooks/useTranslated";

import BadgeCircle from "../../components/badge/BadgeCircle";
import BadgeMainInfo from "../../components/badge/BadgeMainInfo";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import TopBox from "../../components/general/TopBox";
import Button from "../../components/form/Button";
import Checkbox from "../../components/form/Checkbox";


export default function BadgeScreen(props) {	

	const ThemeStyles = useThemeStyles();
	const badge_size = Math.floor( Layout.width * 0.362 );

	const active = true;

	return (
		<MainWithNavigation>
			<TopBox>
				<View style={{ flexDirection: "row", marginBottom: 18 }}>
					<BadgeCircle size={ badge_size > 155 ? 155 : badge_size } />
					<BadgeMainInfo/>
				</View>
			</TopBox>

			<ContainerWithScroll>
				
				<Text style={[ GeneralStyles.text_bold, { color: ThemeStyles.dark_text, marginBottom: 28 } ]}>
					{ useTranslated( Translations.HowToGetIt )}
				</Text>

				<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.dark_text } ]}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
				</Text>


				{ active &&
					<View style={{ marginTop: 60 }}>
						<Button>{ useTranslated( Translations.ExportToPdf )}</Button>
						<Checkbox
							label={ useTranslated( Translations.ExportToPdfAgree )}
							required={ true }
						/>
					</View>
				}

			</ContainerWithScroll>

		</MainWithNavigation>
	)
}