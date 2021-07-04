import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/core';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Routes from '../../constants/Routes';
import Actions from "../../redux/Actions";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import BadgeImage from './BadgeImage';
import Translations from '../../constants/Translations';
import useTranslator from "../../hooks/useTranslator";

const Badge = props => {
	const dispatch = useDispatch();
	const translate = useTranslator();
	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();
	const { badge, active, promoted } = props;
	if (!badge?.id) return null;
	const handlePress = () => {
		dispatch(Actions.Badges.Selected({ ...badge, active: promoted ? false : active }));
		navigation.navigate(Routes.ProfileBadge);
	}

	return (
		<TouchableWithoutFeedback>
			<View
				style={[
					{ marginBottom: 35, opacity: active ? 1 : 0.35, justifyContent: 'center', alignItems: 'center' },
					props.badgeContainerStyle
				]}
			>
				<BadgeImage image_uri={badge.image} />
				<Text style={[GeneralStyles.text_regular, { textAlign: "center", color: ThemeStyles.dark_text }]}>
					{translate(badge.name)}
				</Text>
				<Text
					onPress={handlePress}
					style={[
						GeneralStyles.text_regular,
						{ textAlign: "center", fontSize: 12, color: ThemeStyles.blue_text, textTransform: "lowercase" }
					]}>
					{translate(Translations.FindOutMore)}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Badge;
