import React, { useState, useMemo } from "react";
import { ScrollView, View } from "react-native";

import ProfileMain from "../components/profile/ProfileMain";
import Container from "../components/general/Container";
import MainWithNavigation from "../components/general/MainWithNavigation";

import ProfileStatistics from "../components/profile/ProfileStatistics";
import ProfileBadges from "../components/profile/ProfileBadges";
import ProfileInformation from "../components/profile/ProfileInformation";

export default function ProfileScreen(props) {

	const [ active_tab, setActiveTab ] = useState( 0 );
	const TabComponent = useMemo(() => [ ProfileInformation, ProfileStatistics, ProfileBadges ][ active_tab ], [ active_tab ]);

    return (
		<MainWithNavigation>
			
			<ProfileMain 
				active_tab={ active_tab }
				tabClick= { index => setActiveTab( index )}
			/>

			<Container>
				<ScrollView>
					{ TabComponent && <TabComponent/> }
				</ScrollView>
			</Container>

		</MainWithNavigation>
    );
};
