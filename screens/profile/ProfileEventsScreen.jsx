import React, {useMemo, useState} from "react";
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";
import useThemeStyles from "../../hooks/useThemeStyles";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ProfileUsosEvents from "../../components/profile-events/ProfileUsosEvents";
import Button from "../../components/form/Button";
import ProfileEventsTab from "../../components/profile-events/ProfileEventsTab";
import ProfileCollegeGraduationTab from "../../components/profile-events/ProfileCollegeGraduationTab";
import ProfileOtherTab from "../../components/profile-events/ProfileOtherTab";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import useTranslator from "../../hooks/useTranslator";
import Swiper from "react-native-screens-swiper";
import Container from "../../components/general/Container";
import Fonts from "../../constants/Fonts";

const ProfileEventsScreen = props => {
	const translate = useTranslator();translate()
	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	const [ active_tab, setActiveTab ] = useState( 0 );
	const TabContent = useMemo(() => [ ProfileEventsTab, ProfileOtherTab, ProfileCollegeGraduationTab ][ active_tab ], [ active_tab ]);

	const tabs = [
		{
			tabLabel: translate( Translations.Events ),
			component: ProfileEventsTab
		},
		{
			tabLabel: translate( Translations.Other ),
			component: ProfileOtherTab
		},
		{
			tabLabel: translate( Translations.CollegeGraduation ),
			component: ProfileCollegeGraduationTab
		}
	];

	const styles = useMemo(() => (
		{
			pillContainer: {
				zIndex: 10,
				backgroundColor: ThemeStyles.main_bg,
			},
			pillLabel: {
				textTransform: 'uppercase',
				...GeneralStyles.text_regular,
				color: ThemeStyles.blue_text,
				textAlign: 'center'
			},
			activeLabel: {
				fontFamily: Fonts.ProximaNova.Bold,
				color: ThemeStyles.blue_text,
				textAlign: 'center'
			},
			borderActive: {
				borderColor: ThemeStyles.blue_text,
			},
		}
	), [ThemeStyles]);

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<Swiper
					data={tabs}
					isStaticPills={true}
					scrollableContainer={true}
					stickyHeaderEnabled={true}
					stickyHeaderIndex={1}
					style={styles}
				>
					<Container>
						<ProfileUsosEvents/>

						<Text style={{ ...GeneralStyles.text_regular, marginBottom: 13, color: ThemeStyles.dark_text }}>
							Dowiedz się więcej o innych zdarzeniach
						</Text>
					</Container>
				</Swiper>

				<View style={{ marginVertical: 20, marginHorizontal: 20}}>
					<Button
						transparent_bg={ true }
						onPress={ () => navigation.navigate( Routes.ProfileEdit )}
					>
						{ translate( Translations.ReturnToProfileEdit )}
					</Button>
				</View>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
};


export default ProfileEventsScreen;
