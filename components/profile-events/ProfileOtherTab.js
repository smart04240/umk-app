import React from 'react';
import {useSelector} from "react-redux";
import DropDownTextGroup from '../dropdowntext/DropDownTextGroup';
import Container from "../general/Container";

const ProfileOtherTab = props => {
	const {others} = useSelector(state => {return state.zdarzenia});

	return (
		<Container>
			<DropDownTextGroup
				items={ others }
			/>
		</Container>
	)
}


export default ProfileOtherTab;
