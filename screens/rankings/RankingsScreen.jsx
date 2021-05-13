import React, {useMemo} from "react";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import useThemeStyles from "../../hooks/useThemeStyles";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import Dropdown from "../../components/form/Dropdown";
import Layout from "../../constants/Layout";
import RankingBox from "../../components/ranking/RankingBox";
import useTranslator from "../../hooks/useTranslator";
import Swiper from "react-native-screens-swiper";
import shadowGenerator from "../../helpers/shadowGenerator";
import Container from "../../components/general/Container";
import WithHeaderConfig from "../../components/layout/WithHeaderConfig";

const ranking_sample = {
	number: 1,
	avatar_source: require("../../assets/images/avatar.jpg"),
	user_nickname: "nick_studenta1234",
	badges: 12,
	points: 254
}

const Faculty = () => {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();

	const rankings = [];
	for ( let i = 0; i < 15; i++) {
		rankings.push({ ...ranking_sample, number: i + 1 })
	}

	return(
		<Container>
			<Dropdown
				label={ translate( Translations.FilterSelectDirection )}
				options_box_style={{ maxHeight: Layout.height * 0.5 }}
				options={[
					{ value: "*", label: "Wszystkie" },
					{ value: 1, label: "Option 1" },
				]}
			/>

			{rankings && !!rankings.length && rankings.map(ranking => <RankingBox key={ranking.number} {...ranking} />)}
		</Container>
	)
}

export default function RankingsScreen() {
	const translate = useTranslator();
	const theme = useThemeStyles();

	const rankings = [];
	for ( let i = 0; i < 15; i++) {
		rankings.push({ ...ranking_sample, number: i + 1 })
	}

	const screens = [
		{
			tabLabel: translate(Translations.Faculty),
			component: Faculty
		},
		{
			tabLabel: translate(Translations.Annual),
			component: Faculty
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
	},[theme]);

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
