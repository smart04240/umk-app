import React from 'react';
import { View } from 'react-native';
import useThemeStyles from '../../hooks/useThemeStyles';

import BottomNavigation from '../navigation/BottomNavigation';


const MainWithNavigation = props => {
	const ThemeStyles = useThemeStyles();

	return (
		<View style={[ { backgroundColor: ThemeStyles.main_bg, flex: 1, paddingBottom: 50 }, props.style || {} ]} >
			{ props.children }

			<BottomNavigation/>
		</View>
	)
}


export default MainWithNavigation;
