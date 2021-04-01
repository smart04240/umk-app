import React from 'react';
import { View } from 'react-native';
import useThemeStyles from '../../hooks/useThemeStyles';

export default props => {

    const ThemeStyles = useThemeStyles();

	return (
		<View style={{ backgroundColor: ThemeStyles.main_bg, flex: 1 }} >
			{ props.children }
		</View>
	)
}