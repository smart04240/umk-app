import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import useThemeStyles from '../../hooks/useThemeStyles';
import GeneralStyles from '../../constants/GeneralStyles';

const ScreenWithHeaderTitleOnly = props => {

	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	React.useLayoutEffect(() => {
        navigation.setOptions({ 
			headerLeft: () => null,
			headerRight: () => null,
			headerStyle: {
				backgroundColor: ThemeStyles.main_bg,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			headerTitleStyle: { 
				...GeneralStyles.header_title,
				color: ThemeStyles.blue_text,
				textAlign: "center"
			}
		});
    
	}, [ navigation, ThemeStyles ]);

	return (
		<View style={{ flex: 1 }}>
			{ props.children }
		</View>
	)
}


export default ScreenWithHeaderTitleOnly;