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
				trackColor={{ false: "#D0DCEA", true: "#D0DCEA" }}
				thumbColor={ Colors.Blue }
				{...props }
			/>

			<Text style={[ ThemeStyles.dark_blue_text, GeneralStyles.text_regular, { marginHorizontal: 5 } ]}> 
				{ props.label }
			</Text>
		</View>
	)
}
