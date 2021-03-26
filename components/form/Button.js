import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import GeneralStyles from "../../constants/GeneralStyles";

export default props => {
	
	const { transparent_bg } = props;
	const button_style = transparent_bg ? { ...styles.button, backgroundColor: Colors.BlueRgba("0") } : styles.button; 
	const text_style = transparent_bg ? styles.text_trs : styles.text; 

	return (
		<TouchableOpacity onPress={ props.onPress }>
			<View style={[ GeneralStyles.row_centered, button_style ]}>
				<Text style={[ GeneralStyles.text_regular, text_style ]}> { props.children } </Text>
			</View>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	text: { color: Colors.White },
	text_trs: { color: Colors.Blue },

	button: {
		marginBottom: 12,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: Colors.Blue,
		padding: 15,
		backgroundColor: Colors.Blue
	}
})