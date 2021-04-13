import React from 'react';
import { View, Text } from "react-native";
import { Switch } from "react-native-gesture-handler";

import Colors from '../../constants/Colors';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';

export default props => {

    const ThemeStyles = useThemeStyles();

	return (
		<View style={[ GeneralStyles.row_ac, props.style || {} ]}>
			<Switch 
				trackColor={{ false: "#D0DCEA", true: "#9DC4F1" }}
				thumbColor={  Colors.Blue }
				{...props }
			/>

			<Text style={[ { color: ThemeStyles.dark_blue_text }, GeneralStyles.text_regular, { marginHorizontal: 5 } ]}> 
				{ props.label }
			</Text>
		</View>
	)
}
