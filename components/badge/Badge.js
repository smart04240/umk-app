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

	const { id, name, not_active } = props;
	if ( !id || !name ) return null;

	return (
		<TouchableWithoutFeedback onPress={ () => !not_active ? navigation.navigate( Routes.ProfileBadge, { id }) : null }>
			<View style={{ marginBottom: 35, opacity: not_active ? 0.35 : 1 }}>

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