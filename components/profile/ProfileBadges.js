import React from 'react';
import { View } from "react-native";
import GeneralStyles from '../../constants/GeneralStyles';
import Badge from '../badge/Badge';
import Container from "../general/Container";

const ProfileBadges = props => {

	const badges = [
		{ id: 1, name: "Podróżnik" },
		{ id: 2, not_active: false, name: "Odkrywca" },
		{ id: 3, name: "Bezpieczny student" },
		{ id: 4, name: "Stypendysta" },
	]

	return (
		<Container>
			<View style={[ GeneralStyles.row_wrap, { justifyContent: "space-around" } ]}>
				{ badges.map( badge => <Badge key={ badge.id } {...badge } />)}
			</View>
		</Container>
	)
}


export default ProfileBadges;
