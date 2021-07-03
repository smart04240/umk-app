import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import { View } from "react-native";
import Actions from "../../redux/Actions";
import API from "../../helpers/API";
import Badge from '../badge/Badge';
import Container from "../general/Container";

const ProfileBadges = props => {
	const dispatch = useDispatch();
	const [rows, setRows] = useState([]);
	// Load badges the student has earned
	useEffect(() => {
		API.badges.getEarned().then(response => {
			const badges = response.data.data.badge_list;
			formatBadgesList(badges);
			dispatch(Actions.Badges.Earned(badges));
		});
	}, []);

	const formatBadgesList = (badges) => {
		let _rows = [];
		for(let i = 0; i <= badges.length; i+=2) {
			let item = {
				badges: []
			}
			if(badges[i]) item.badges.push(badges[i]);
			if(badges[i+1]) item.badges.push(badges[i+1]);
			_rows.push(item);
		}
		setRows(_rows);
	}
	return (
		<Container>
			{rows.map((row, index) => {
				return(
					<View style={[{alignItems: 'flex-start', flexDirection: 'row'}]} key={index}>
						{row.badges.map((badge) => (
							<Badge
								key={badge.id}
								badgeContainerStyle={{
									flex: 0.5
								}}
								badge={{...badge.badge, progress: JSON.parse(badge.progress)}}
								active={true}
							/>
						))}
					</View>
				)
			})}
		</Container>
	)
}


export default ProfileBadges;
