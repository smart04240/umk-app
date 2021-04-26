import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View } from "react-native";
import Translations from '../../constants/Translations';
import Layout from "../../constants/Layout";
import Routes from "../../constants/Routes";

import useTranslated from '../../hooks/useTranslated';
import Button from '../form/Button';
import TopBox from '../general/TopBox';
import ProfileAvatar from './ProfileAvatar';
import ProfileMainInfo from './ProfileMainInfo';
import Tabs from '../general/Tabs';

const ProfileMain = props => {

	const navigation = useNavigation();
	const avatar_size = Math.floor( Layout.width * 0.308 );


	return (
		<View style={{padding: 15}}>

			<View style={{ flexDirection: "row", marginBottom: 18 }}>

				<View style={{ marinRight: 10 }}>
					<ProfileAvatar size={ avatar_size > 132 ? 132 : avatar_size }/>
				</View>

				<ProfileMainInfo />
			</View>

			<Button onPress={ () => navigation.navigate( Routes.ProfileEdit )} transparent_bg={ true }>
				{ useTranslated( Translations.EditProfile )}
			</Button>
		</View>
	)
}


export default ProfileMain;
