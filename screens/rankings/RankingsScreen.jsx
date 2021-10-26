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
import Container from "../../components/general/Container";
import WithHeaderConfig from "../../components/layout/WithHeaderConfig";

import Annual from "./Annual";

const Faculty = (data) => {
	let number = 0;

	return (
		<Container>
			{data && !!data.length && data.map((item, i) => {
				number = data[i - 1]?.points === item?.points ? number : number + 1;
				return <RankingBox key={i} {...{ ...item, number }} />
			})}
		</Container>
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
				},
				pillsOverflow: {
					overflow: 'hidden',
					height: 80
				}
			}
		)
	}, [theme]);
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
					stickyHeaderIndex={0}
				/>
			</WithHeaderConfig>
		</MainWithNavigation>
	)
}

export default RankingsScreen;
