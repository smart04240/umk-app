import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import * as Print from 'expo-print';

import { baseURL } from '../../helpers/API';

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
	const locale = useSelector(state => state.app.locale);
	const user = useSelector(state => state.user);
	const badge = useSelector(state => state.badges.selected);
	const [checked, setChecked] = useState(false);
	const [warningText, setWarningText] = useState(null);
	const badge_size = Math.floor(Layout.width * 0.362);

	useEffect(() => {
		if (!warningText) return;
		setWarningText(translate(Translations.Required))
	}, [locale]);

	const handlePress = async () => {
		if (!checked) {
			setWarningText(translate(Translations.Required));
			return;
		}

		const title = { pl: 'ZDOBYTA ODZNAKA', en: 'BADGE EARNED' };
		const avatar = user?.avatar_url || require("../../assets/images/avatar.jpg");
		const appLogoUrl = `${baseURL}/logo/app_logo_${locale}.png`;
		const umkLogoUrl = `${baseURL}/logo/umk_logo_${locale}.png`;

		let filePath = await Print.printAsync({
			html: `<div style="width: 100%; height: 100%;  font-family: 'Aileron', sans-serif;">
						<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
							<img src="${avatar}" style="width: 100px; border-radius: 50%" />
							<h1 style="font-size: 60px; color: #034ea2; margin-top: 20px; margin-bottom: 100px; font-weight: normal;">${user?.user_name}</h1>
							<p style="font-size: 28px; color: #034ea2; margin: 0; margin-bottom: -30px; text-transform: uppercase">${translate(title)}</p>

							<h1 style="font-size: 80px; color: #034ea2; letter-spacing: 30px; text-transform: uppercase; font-weight: normal; margin-bottom: 50px; width: 90%; white-space: wrap">${translate(badge?.name)}</h1>

							<p style="font-size: 26px; width: 80%; margin-bottom: 100px; text-align: center;">${translate(badge?.description)}</p>

							<div style="display: flex; justify-content: space-between; align-items: center">
								<img src="${appLogoUrl}" style="width: 100%;" />
								<img src="${badge?.image}" style="width: 150px; margin-right: 30px; margin-left: 30px; border-radius: 50%" />
								<img src="${umkLogoUrl}" style="width: 100%;" />
							</div>
						</div>
					</div>`,
			width: 612,
			base64: false
		});

		alert('PDF Generated', filePath);
	}

	return (
		<MainWithNavigation>
			<TopBox>
				<View style={{ flexDirection: "row", marginBottom: 18 }}>
					<BadgeImage size={badge_size > 155 ? 155 : badge_size} image_uri={badge.image} />
					<BadgeMainInfo />
				</View>
			</TopBox>

			<ContainerWithScroll>

				<Text style={[GeneralStyles.text_bold, { color: ThemeStyles.dark_text, marginBottom: 28 }]}>
					{translate(Translations.HowToGetIt)}
				</Text>

				<Text style={[GeneralStyles.text_regular, { color: ThemeStyles.dark_text }]}>
					{translate(badge?.description)}
				</Text>

				{badge?.active &&
					<View style={{ marginTop: 60 }}>
						<Button onPress={handlePress}>{translate(Translations.ExportToPdf)}</Button>
						<Checkbox
							label={translate(Translations.ExportToPdfAgree)}
							required={true}
							warning={warningText}
							onChange={({ name, value }) => { setChecked(value) }}
						/>
					</View>
				}

			</ContainerWithScroll>

		</MainWithNavigation>
	)
}