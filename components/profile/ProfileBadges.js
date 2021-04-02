import React from 'react';
import { View } from "react-native";
import GeneralStyles from '../../constants/GeneralStyles';
import Badge from '../badge/Badge';

const ProfileBadges = props => {

	const badges = [
		{ id: 1, active: true, name: "Podróżnik" },
		{ id: 2, active: false, name: "Odkrywca" },
		{ id: 3, active: true, name: "Bezpieczny student" },
		{ id: 4, active: true, name: "Stypendysta" },
	]

	return (
		<View style={[ GeneralStyles.row_wrap, { justifyContent: "space-around" } ]}>
			{ badges.map( badge => <Badge key={ badge.id } {...badge } />)}
		</View>
	)
}


export default ProfileBadges;