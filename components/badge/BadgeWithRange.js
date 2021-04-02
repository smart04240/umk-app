import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Routes from '../../constants/Routes';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';

import BadgeCircle from './BadgeCircle';
import Range from "../form/Range";

const BadgeWithRange = props => {

	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();

	const { id, name, range_props } = props;

	return (
		<TouchableWithoutFeedback onPress={ () => navigation.navigate( Routes.ProfileBadge, { id }) }>
			<View style={{ width: "100%", flexDirection: "row", marginBottom: 30 }}>

				<BadgeCircle size={ 120 }/>

				<View style={{ paddingTop: 20, marginLeft: 16, flexGrow: 1, flexShrink: 1 }}>
					<Text style={[ 
						GeneralStyles.text_regular, 
						{ color: ThemeStyles.dark_text } ]}>
						{ name }
					</Text>

					<Text style={[ 
						GeneralStyles.text_regular, 
						{ fontSize: 12, marginBottom: 20, color: ThemeStyles.blue_text, textTransform: "lowercase" } 
					]}>
						{ useTranslated( Translations.FindOutMore )}
					</Text>

					<Range {...range_props }/>
				</View>

			</View>
		</TouchableWithoutFeedback>
	)
}


export default BadgeWithRange;