import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { View } from "react-native";
import Actions from "../../redux/Actions";
import API from "../../helpers/API";
import Badge from '../badge/Badge';
import Container from "../general/Container";
import GeneralStyles from "../../constants/GeneralStyles";

const ProfileBadges = props => {
	const dispatch = useDispatch();
	const [rows, setRows] = useState([]);
	// Load badges the student has earned
	useEffect(() => {
		API.badges.getEarned().then(response => {
			const badges = response.data.data.badge_list;
			setRows(badges);
			dispatch(Actions.Badges.Earned(badges));
		});
	}, []);
	
	return (
		<Container>
			<View style={[GeneralStyles.row_wrap, { justifyContent: 'space-between' }]}>
				{rows.map(badge =>
					<Badge
						key={badge?.id}
						badge={{ ...badge.badge }}
						active={true}
						earned={true} />
				)}
			</View>
		</Container>
	)
}


export default ProfileBadges;
