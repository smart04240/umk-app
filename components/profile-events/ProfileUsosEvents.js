import React from 'react';
import { View } from 'react-native';
import Translations from '../../constants/Translations';

import DropDownTextGroup from '../dropdowntext/DropDownTextGroup';
import useTranslator from "../../hooks/useTranslator";

const ProfileUsosEvents = props => {
	const translate = useTranslator();
	const usos_events = [
		{ 
			label: "Urlop (2020/2021)",
			eye: true,
			text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, natus! Praesentium nesciunt aperiam accusantium corporis consectetur ipsam officia, natus voluptatum reprehenderit explicabo magni placeat numquam doloremque vitae dolore ipsum animi."
		},
		{ 
			label: "Powtarzanie roku (2019/2020)",
			eye: true,
			text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, sequi sunt. Nisi quibusdam et officiis omnis quis eos velit asperiores ducimus ratione facilis ipsum quod, a recusandae quidem nihil dolore."
		}
	];

	if ( !usos_events || !usos_events.length ) return null;

	return (
		<View style={{ flex: 1 }}>
			<DropDownTextGroup 
				label={ translate( Translations.EventsImportedFromUsos ) }
				items={ usos_events }
			/>
		</View>
	)
}


export default ProfileUsosEvents;