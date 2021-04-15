import React from "react";
import { View } from "react-native";
import GeneralStyles from "../../constants/GeneralStyles";

import MainWithNavigation from "../../components/general/MainWithNavigation";
import Badge from "../../components/badge/Badge";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

export default function ProfileBadges(props) {	

	const badges = [
		{ id: 1, name: "Podróżnik" },
		{ id: 2, not_active: true, name: "Odkrywca" },
		{ id: 3, name: "Bezpieczny student" },
		{ id: 4, name: "Stypendysta" },
		{ id: 5, not_active: true, name: "Odkrywca" },
		{ id: 6, name: "Odkrywca" },
		{ id: 7, name: "Odkrywca" },
		{ id: 8, name: "Odkrywca" },
	];

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>

					<View style={[ 
						GeneralStyles.row_wrap,
						{ justifyContent: "space-around" }
					]}>
						{ badges && !!badges.length &&
							badges.map( badge => <Badge key={ badge.id } {...badge } />)
						}

					</View>

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}