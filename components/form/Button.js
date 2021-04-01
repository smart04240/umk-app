import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

export default props => {

	const ThemeStyles = useThemeStyles();
	
	const { transparent_bg } = props;
	const extra_button_style = transparent_bg ? { backgroundColor: Colors.BlueRgba("0"), borderColor: ThemeStyles.blue_text } : {}; 
	const text_style = transparent_bg ? { color: ThemeStyles.blue_text } : styles.text; 

	return (
		<TouchableOpacity onPress={ props.onPress }>
			<View style={[ GeneralStyles.row_centered, styles.button, extra_button_style ]}>
				<Text style={[ GeneralStyles.text_regular, text_style ]}> { props.children } </Text>
			</View>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	text: { color: Colors.White },

	button: {
		marginBottom: 12,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: Colors.Blue,
		padding: 15,
		backgroundColor: Colors.Blue
	}
})