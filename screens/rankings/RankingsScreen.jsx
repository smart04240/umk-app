import React, { useMemo, useState, useEffect } from "react";
import API from "../../helpers/API";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import useThemeStyles from "../../hooks/useThemeStyles";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import RankingBox from "../../components/ranking/RankingBox";
import useTranslator from "../../hooks/useTranslator";
import Swiper from "react-native-screens-swiper";
import shadowGenerator from "../../helpers/shadowGenerator";
import WithHeaderConfig from "../../components/layout/WithHeaderConfig";

import Annual from "./Annual";
import {View} from "react-native";
import Fonts from "../../constants/Fonts";

const Faculty = (data) => {
	let number = 0;

	return (
		<View style={{flex: 1, paddingHorizontal: 20}}>
			{data && !!data.length && data.map((item, i) => {
				number = data[i - 1]?.points === item?.points ? number : number + 1;
				return <RankingBox key={i} {...{ ...item, number }} />
			})}
		</View>
	)
}

const RankingsScreen = () => {
	const translate = useTranslator();
	const theme = useThemeStyles();

	const screens = [
		{
			tabLabel: translate(Translations.Faculty),
			component: () => Faculty(data?.faculty)
		},
		{
			tabLabel: translate(Translations.Annual),
			component: () => Annual(data?.annual)
		},
	];

	const styles = useMemo(() => ({
		pillsOverflow: {
			overflow: 'hidden',
			height: 70
		},
		pillContainer: {
			...shadowGenerator(5),
			...GeneralStyles.bottom_border_radius,
			zIndex: 10,
			paddingHorizontal: 12,
			backgroundColor: theme.box_bg,
		},
		staticPillsContainer: {
			height: 35,
		},
		pillButton: {
			paddingHorizontal: 0,
		},
		pillLabel: {
			textAlign: 'center',
			textTransform: 'uppercase',
			flexDirection: 'row',
			flexWrap: 'wrap',
			...GeneralStyles.text_regular,
			color: theme.blue_text,
		},
		activeLabel: {
			fontFamily: Fonts.ProximaNova.Bold,
			color: theme.blue_text,
		},
		borderActive: {
			borderColor: theme.blue_text,
		},
	}), [theme]);
	const [data, setData] = useState(null);

	useEffect(() => {
		API.ranking.All().then(response => {
			setData(response.data.data);
		});
	}, []);

	return (
		<MainWithNavigation>
			<WithHeaderConfig borderless={true}>
				<Swiper
					data={screens}
					style={styles}
					scrollableContainer={true}
					stickyHeaderEnabled={true}
					isStaticPills={true}
				/>
			</WithHeaderConfig>
		</MainWithNavigation>
	)
}

export default RankingsScreen;
