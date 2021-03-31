import React from 'react';
import { View, Text } from "react-native";

import useThemeStyles from '../../hooks/useThemeStyles';

const ProfileMain = props => {

    const ThemeStyles = useThemeStyles();

	return (
		<View style={[ ThemeStyles.box ]}>
			<Text> Profile Main </Text>
		</View>
	)
}


export default ProfileMain;