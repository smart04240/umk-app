import React from 'react';
import { View } from 'react-native';
import {useSelector} from "react-redux";
import Translations from '../../constants/Translations';

import DropDownTextGroup from '../dropdowntext/DropDownTextGroup';
import useTranslator from "../../hooks/useTranslator";

const ProfileUsosEvents = props => {
	const translate = useTranslator();
	const {usosEvents} = useSelector(state => {return state.zdarzenia});

	if ( !usosEvents || !usosEvents.length ) return null;

	return (
		<View style={{ flex: 1 }}>
			<DropDownTextGroup 
				label={ translate( Translations.EventsImportedFromUsos ) }
				items={ usosEvents }
			/>
		</View>
	)
}


export default ProfileUsosEvents;