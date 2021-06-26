import React from 'react';
import {useSelector} from "react-redux";
import Translations from '../../constants/Translations';
import DropDownTextGroup from '../dropdowntext/DropDownTextGroup';
import useTranslator from "../../hooks/useTranslator";
import Container from "../general/Container";

const ProfileEventsTab = props => {
	const translate = useTranslator();
	const {affectList, notAffectList} = useSelector(state => {return state.zdarzenia});

	return (
		<Container>
			<DropDownTextGroup
				label={ translate( Translations.ListOfEventsAffectLengthStudy ) + ":" }
				items={ affectList }
			/>

			<DropDownTextGroup
				label={ translate( Translations.ListOfEventsNotAffectLengthStudy ) + ":" }
				items={ notAffectList }
			/>
		</Container>
	)
}


export default ProfileEventsTab;
