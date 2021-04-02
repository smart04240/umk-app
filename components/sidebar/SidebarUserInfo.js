import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useSelector } from 'react-redux';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import Routes from "../../constants/Routes";
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';

import ProfileAvatar from '../profile/ProfileAvatar';

const SidebarUserInfo = props => {

    const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

    const user = useSelector( state => state.user );
	const nick_name = "nick_studenta123";

	return (
		<View style={[ GeneralStyles.row_ac, { flexShrink: 1 } ]}>

			<ProfileAvatar/>

			<View>	
				<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.dark_blue_text }, { fontSize: 18 } ]}> { nick_name } </Text>
				<TouchableOpacity onPress={ () => navigation.navigate( Routes.ProfileEdit )}>
					<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.blue_text } ]}> { useTranslated( Translations.EditProfile )} </Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}


export default SidebarUserInfo;