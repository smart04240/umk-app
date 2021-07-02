import React from 'react';
import {useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/core';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Routes from '../../constants/Routes';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import BadgeImage from './BadgeImage';
import Translations from '../../constants/Translations';
import useTranslator from "../../hooks/useTranslator";

const Badge = props => {
	const translate = useTranslator();
	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();
	const locale = useSelector(state => state.app.locale);
	const {badge, not_active} = props;
	if (!badge?.id) return null;

	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate(Routes.ProfileBadge, {id: badge.id})}
		>
			<View
				style={[
					{marginBottom: 35, opacity: not_active ? 0.35 : 1, justifyContent: 'center', alignItems: 'center'},
					props.badgeContainerStyle
				]}
			>
				<BadgeImage image_uri={badge.image} />
				<Text style={[GeneralStyles.text_regular, {textAlign: "center", color: ThemeStyles.dark_text}]}>
					{translate(badge.name)}
				</Text>
				<Text style={[
					GeneralStyles.text_regular,
					{textAlign: "center", fontSize: 12, color: ThemeStyles.blue_text, textTransform: "lowercase"}
				]}>
					{translate(Translations.FindOutMore)}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Badge;
