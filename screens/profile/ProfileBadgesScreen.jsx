import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

import MainWithNavigation from "../../components/general/MainWithNavigation";
import Badge from "../../components/badge/Badge";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";

export default function ProfileBadges(props) {	

	const theme = useSelector( state => state.theme );
	const ThemeStyles = useThemeStyles();

	useLayoutEffect(() => {
        props.navigation.setOptions({
			headerStyle: [ 
				theme === "light" ? GeneralStyles.header_without_tb : {},
				{ backgroundColor: ThemeStyles.box_bg } 
			]
		});
    }, [ props.navigation, ThemeStyles ]);

	const badges = [
		{ id: 1, name: "Podróżnik" },
		{ id: 2, not_active: true, name: "Odkrywca" },
		{ id: 3, name: "Bezpieczny student" },
		{ id: 4, name: "Stypendysta" },
		{ id: 5, not_active: true, name: "Odkrywca" },
		{ id: 6, name: "Odkrywca" },
		{ id: 7, name: "Odkrywca" },
		{ id: 8, name: "Odkrywca" },
	]

	return (
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
	)
}