import React, { useState, useMemo } from "react";

import ProfileMain from "../../components/profile/ProfileMain";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";

import ProfileStatistics from "../../components/profile/ProfileStatistics";
import ProfileBadges from "../../components/profile/ProfileBadges";
import ProfileInformation from "../../components/profile/ProfileInformation";

export default function ProfileScreen(props) {

	const [ active_tab, setActiveTab ] = useState( null );
	const TabComponent = useMemo(() => [ ProfileInformation, ProfileStatistics, ProfileBadges ][ active_tab ], [ active_tab ]);

    return (
		<MainWithNavigation>
			
			<ProfileMain 
				active_tab={ active_tab }
				onTabChangeCallback= { index => setActiveTab( index )}
			/>

			<ContainerWithScroll>
				{ TabComponent && <TabComponent/> }
			</ContainerWithScroll>
			
		</MainWithNavigation>
    );
};
