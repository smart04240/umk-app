import React from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import GeneralStyles from "../../constants/GeneralStyles";

import MainWithNavigation from "../../components/general/MainWithNavigation";
import Badge from "../../components/badge/Badge";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

export default function ProfileBadges(props) {
	const badges = useSelector(state => state.badges.all);

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>

					<View style={[
						GeneralStyles.row_wrap,
						{ justifyContent: "space-around" }
					]}>
						{badges && !!badges.length &&
							badges.map((badge, i) => <Badge key={i} badge={badge} active={badge?.active} />)
						}

					</View>

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}