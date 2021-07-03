import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Routes from '../../constants/Routes';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';

import BadgeImage from './BadgeImage';
import Range from "../form/Range";
import useTranslator from "../../hooks/useTranslator";

const BadgeWithRange = props => {
	const translate = useTranslator();
	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();

	const { id, name, range_props } = props;

	return (
		<TouchableWithoutFeedback onPress={ () => navigation.navigate( Routes.ProfileBadge, { id }) }>
			<View style={{ width: "100%", flexDirection: "row", marginBottom: 30 }}>

				<BadgeImage size={ 120 }/>

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
						{ translate( Translations.FindOutMore )}
					</Text>

					<Range {...range_props }/>
				</View>

			</View>
		</TouchableWithoutFeedback>
	)
}


export default BadgeWithRange;