import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

import useThemeStyles from '../../hooks/useThemeStyles';
import GeneralStyles from '../../constants/GeneralStyles';
import shadowGenerator from "../../helpers/shadowGenerator";

const ScreenWithRoundedHeader = props => {
	const theme = useSelector( state => state.app.theme );
	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();

	React.useLayoutEffect(() => {
			navigation.setOptions({
				headerStyle: [
					theme === "light" ? GeneralStyles.header_without_tb : {},
					{ backgroundColor: ThemeStyles.box_bg },
					{...shadowGenerator(5)}
				],
			});
	}, [ navigation, ThemeStyles ]);

	return (
		<View style={{ flex: 1 }}>
			{ props.children }
		</View>
	)
}


export default ScreenWithRoundedHeader;
