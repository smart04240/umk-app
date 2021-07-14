import React from 'react';
import { useDispatch } from "react-redux";
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Routes from '../../constants/Routes';
import Actions from "../../redux/Actions";
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';

import BadgeImage from './BadgeImage';
import Range from "../form/Range";
import useTranslator from "../../hooks/useTranslator";

const BadgeWithRange = ({ badge }) => {
	const dispatch = useDispatch();
	const translate = useTranslator();
	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();

	const total = badge.conditions_count;
	const value = Math.floor((badge.progress / 100) * total);

	const range_props = {
		label: `zaliczone ${value} z ${total} przedmiotów!`,
		color: "purple",
		hide_value_label: true,
		data: { type: "range", value, total }
	}
	const handlePress = () => {
		dispatch(Actions.Badges.Selected(badge));
		navigation.navigate(Routes.ProfileBadge);
	}

	return (

		<View style={{ width: "100%", flexDirection: "row", marginBottom: 30 }}>

			<BadgeImage image_uri={badge.image} size={120} />

			<View style={{ paddingTop: 20, marginLeft: 16, flexGrow: 1, flexShrink: 1 }}>
				<Text style={[
					GeneralStyles.text_regular,
					{ color: ThemeStyles.dark_text }]}>
					{translate(badge.name)}
				</Text>

				<TouchableWithoutFeedback onPress={handlePress}>
					<Text style={[
						GeneralStyles.text_regular,
						{ fontSize: 12, marginBottom: 20, color: ThemeStyles.blue_text, textTransform: "lowercase" }
					]}>
						{translate(Translations.FindOutMore)}
					</Text>
				</TouchableWithoutFeedback>

				<Range {...range_props} />
			</View>

		</View>
	)
}


export default BadgeWithRange;