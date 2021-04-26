import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View } from "react-native";
import Translations from '../../constants/Translations';
import Layout from "../../constants/Layout";
import Routes from "../../constants/Routes";
import useTranslated from '../../hooks/useTranslated';
import Button from '../form/Button';
import ProfileAvatar from './ProfileAvatar';
import ProfileMainInfo from './ProfileMainInfo';
import WithHeaderConfig from "../layout/WithHeaderConfig";

const ProfileMain = props => {
	const navigation = useNavigation();
	const avatar_size = Math.floor( Layout.width * 0.308 );

	return (
		<WithHeaderConfig borderless={true}>
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
		</WithHeaderConfig>
	)
}


export default ProfileMain;
