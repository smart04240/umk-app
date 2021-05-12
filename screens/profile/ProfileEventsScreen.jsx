import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";

import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";

import useThemeStyles from "../../hooks/useThemeStyles";

import Container from "../../components/general/Container";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import Tabs from "../../components/general/Tabs";
import ProfileUsosEvents from "../../components/profile-events/ProfileUsosEvents";
import Button from "../../components/form/Button";
import ProfileEventsTab from "../../components/profile-events/ProfileEventsTab";
import ProfileCollegeGraduationTab from "../../components/profile-events/ProfileCollegeGraduationTab";
import ProfileOtherTab from "../../components/profile-events/ProfileOtherTab";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import useTranslator from "../../hooks/useTranslator";

const ProfileEventsScreen = props => {
	const translate = useTranslator();translate()
	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	const [ active_tab, setActiveTab ] = useState( 0 );
	const TabContent = useMemo(() => [ ProfileEventsTab, ProfileOtherTab, ProfileCollegeGraduationTab ][ active_tab ], [ active_tab ]);

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>

					<ProfileUsosEvents/>

					<Text style={{ ...GeneralStyles.text_regular, marginBottom: 13, color: ThemeStyles.dark_text }}>
						Dowiedz się więcej o innych zdarzeniach
					</Text>

					<Tabs
						style={{ marginBottom: 25 }}
						tabs={[ 
							translate( Translations.Events ),
							translate( Translations.Other ),
							translate( Translations.CollegeGraduation )
						]}
						onTabChangeCallback={ index => setActiveTab( index )}
					/>

					<TabContent/>
					
					<View style={{ marginTop: 60 }}>
						<Button 
							transparent_bg={ true } 
							onPress={ () => navigation.navigate( Routes.ProfileEdit )}
						>
							{ translate( Translations.ReturnToProfileEdit )}
						</Button>
					</View>

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}


export default ProfileEventsScreen;