import React from 'react';
import {View} from "react-native";
import Badge from '../badge/Badge';
import Container from "../general/Container";

const ProfileBadges = props => {

	const rows = [
		{
			badges: [
				{ id: 1, name: "Podróżnik" },
				{ id: 2, not_active: false, name: "Odkrywca" },
			],
		},
		{
			badges: [
				{ id: 3, name: "Bezpieczny student" },
				{ id: 4, name: "Stypendysta" },
			],
		},
		{
			badges: [
				{ id: 5, name: "Bezpieczny student" },
				{ id: 6, name: "Stypendysta" },
			],
		},
		{
			badges: [
				{ id: 7, name: "Bezpieczny student" },
				{ id: 8, name: "Stypendysta" },
			],
		},
	]

	return (
		<Container>
			{rows.map((row, index) => {
				return(
					<View style={[{justifyContent: "space-around", flexDirection: 'row', flex: 1}]} key={index}>
						{row.badges.map((badge) => (
							<Badge
								key={badge.id}
								badgeContainerStyle={{
									flex: 0.5
								}}
								{...badge}
							/>
						))}
					</View>
				)
			})}
		</Container>
	)
}


export default ProfileBadges;
