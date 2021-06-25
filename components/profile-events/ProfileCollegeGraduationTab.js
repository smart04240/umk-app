import React from 'react';
import {useSelector} from "react-redux";
import DropDownTextGroup from '../dropdowntext/DropDownTextGroup';
import Container from "../general/Container";

const ProfileCollegeGraduationTab = props => {
	const {graduation} = useSelector(state => {return state.zdarzenia});

	return (
		<Container>
			<DropDownTextGroup
				items={ graduation }
			/>
		</Container>
	)
}


export default ProfileCollegeGraduationTab;
