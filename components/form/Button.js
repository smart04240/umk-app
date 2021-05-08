import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

export default props => {
	const ThemeStyles = useThemeStyles();
	const { transparent_bg } = props;
	const extra_button_style = transparent_bg ? { backgroundColor: Colors.BlueRgba("0"), borderColor: ThemeStyles.blue_text } : {};
	const text_style = props.isDangerButton ? {color: Colors.Red}  : transparent_bg ? { color: ThemeStyles.blue_text } : styles.text;

	return (
		<TouchableOpacity
			disabled={props.disabled}
			style={[
				GeneralStyles.row_centered,
				styles.button,
				extra_button_style,
				props?.disabled ? {borderColor: Colors.Manatee} : {},
				props?.isDangerButton && {borderColor: Colors.Red},
				props.style || {}
			]}
			onPress={props.onPress}
		>
			<Text style={[ GeneralStyles.text_regular, text_style ]}>
				{props.children}
			</Text>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	text: {
		color: Colors.White
	},
	button: {
		marginBottom: 12,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: Colors.Blue,
		paddingVertical: 11,
		paddingHorizontal: 13,
		backgroundColor: Colors.Blue
	}
})
