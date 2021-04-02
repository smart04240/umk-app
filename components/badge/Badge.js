import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Routes from '../../constants/Routes';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import BadgeCircle from './BadgeCircle';
import useTranslated from '../../hooks/useTranslated';
import Translations from '../../constants/Translations';

const Badge = props => {

	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();

	const { id, name, active } = props;
	if ( !id || !name ) return null;

	return (
		<TouchableWithoutFeedback onPress={ () => active ? navigation.navigate( Routes.ProfileBadge, { id }) : null }>
			<View style={{ marginBottom: 35, opacity: active ? 1 : 0.35 }}>

				<BadgeCircle/>

				<Text style={[ GeneralStyles.text_regular, { textAlign: "center", color: ThemeStyles.dark_text } ]}>
					{ name }
				</Text>

				<Text style={[ 
					GeneralStyles.text_regular, 
					{ textAlign: "center", fontSize: 12, color: ThemeStyles.blue_text, textTransform: "lowercase" } 
				]}>
					{ useTranslated( Translations.FindOutMore )}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Badge;