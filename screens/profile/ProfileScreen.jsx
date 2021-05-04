import React, { useState, useMemo } from "react";
import ProfileMain from "../../components/profile/ProfileMain";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ProfileStatistics from "../../components/profile/ProfileStatistics";
import ProfileBadges from "../../components/profile/ProfileBadges";
import ProfileInformation from "../../components/profile/ProfileInformation";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";
import shadowGenerator from "../../helpers/shadowGenerator";
import Swiper from "react-native-screens-swiper/components/Swiper";
import GeneralStyles from "../../constants/GeneralStyles";


export default function ProfileScreen(props) {
	const theme = useThemeStyles();

	const screens = [
		{
			tabLabel: useTranslated(Translations.Information),
			component: ProfileInformation
		},
		{
			tabLabel: useTranslated(Translations.Statistics),
			component: ProfileStatistics
		},
		{
			tabLabel: useTranslated(Translations.Badges),
			component: ProfileBadges
		},
	];

	const styles = useMemo(() => {
		return (
			{
				pillContainer: {
					backgroundColor: theme.box_bg,
					borderBottomRightRadius: 15,
					borderBottomLeftRadius: 15,
					...shadowGenerator(5),
				},
				borderActive: {
					borderColor: theme.blue_text
				},
				pillLabel: {
					...GeneralStyles.text_regular,
					textTransform: "uppercase",
					color: theme.blue_text
				},
				activeLabel: {
					...GeneralStyles.text_bold,
					textTransform: "uppercase",
					color: theme.blue_text
				}
			}
		)
	},[theme]);

	return (
		<MainWithNavigation>
			<Swiper
				data={screens}
				style={styles}
				scrollableContainer={true}
				stickyHeaderEnabled={true}
				isStaticPills={true}
			>
				<ProfileMain/>
			</Swiper>
		</MainWithNavigation>
	);
};
