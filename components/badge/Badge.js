import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Routes from '../../constants/Routes';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import BadgeCircle from './BadgeCircle';
import Translations from '../../constants/Translations';
import useTranslator from "../../hooks/useTranslator";

const Badge = props => {
	const translate = useTranslator();
	const navigation = useNavigation();
	const ThemeStyles = useThemeStyles();

	const {id, name, not_active} = props;
	if (!id || !name) return null;

	return (
		<TouchableWithoutFeedback
			onPress={() => navigation.navigate(Routes.ProfileBadge, {id})}
		>
			<View
				style={[
					{marginBottom: 35, opacity: not_active ? 0.35 : 1, justifyContent: 'center', alignItems: 'center'},
					props.badgeContainerStyle
				]}
			>
				<BadgeCircle/>
				<Text style={[GeneralStyles.text_regular, {textAlign: "center", color: ThemeStyles.dark_text}]}>
					{name}
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
