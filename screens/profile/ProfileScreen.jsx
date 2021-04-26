import React, { useState, useMemo } from "react";
import {ScrollView, View} from 'react-native';
import ProfileMain from "../../components/profile/ProfileMain";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ProfileStatistics from "../../components/profile/ProfileStatistics";
import ProfileBadges from "../../components/profile/ProfileBadges";
import ProfileInformation from "../../components/profile/ProfileInformation";
import useThemeStyles from "../../hooks/useThemeStyles";
import Tabs from "../../components/general/Tabs";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";


export default function ProfileScreen(props) {
	const theme = useThemeStyles();
	const [active_tab, setActiveTab] = useState(null);
	const TabComponent = useMemo(() => [ ProfileInformation, ProfileStatistics, ProfileBadges ][ active_tab ], [ active_tab ]);

	const tabs = [
		useTranslated( Translations.Information ),
		useTranslated( Translations.Statistics ),
		useTranslated( Translations.Badges )
	];

	return (
		<MainWithNavigation>
			<ScrollView
				stickyHeaderIndices={[1]}
				style={{
					flex: 1,
				}}
			>
				<ProfileMain/>
				<View style={{overflow: 'hidden'}}>
					<View
						style={{
							height: 50,
							backgroundColor: theme.main_bg,
							paddingHorizontal: 10,
							borderBottomRightRadius: 15,
							borderBottomLeftRadius: 15,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							marginBottom: 20,
							shadowOpacity: 0.25,
							shadowRadius: 3.84,

							elevation: 5,
						}}
					>
						<Tabs
							style={{ marginTop: 15 }}
							tabs={ tabs }
							onTabChangeCallback={index => setActiveTab(index)}
						/>
					</View>
				</View>

				<View
					style={{
						paddingHorizontal: 10,
					}}
				>
					{ TabComponent && <TabComponent/> }
				</View>
			</ScrollView>
		</MainWithNavigation>
	);
};
