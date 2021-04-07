import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DebouncedInput from "../general/DebouncedInput";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

export default function Input(props) {

	const ThemeStyles = useThemeStyles();
	const text_color = {color: ThemeStyles.dark_text};

	return (
		<View style={{width: "100%"}}>
			{props.label && <Text style={[text_color, GeneralStyles.text_regular, styles.label]}> {props.label} </Text>}
			<DebouncedInput
				{...props}
				style={[
					text_color,
					GeneralStyles.text_regular,
					styles.input,
					{borderColor: ThemeStyles.blue_text},
					props.style,
				]}
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	label: { marginBottom: 8 },
	input: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 7,
		borderStyle: "solid",
		borderWidth: 1
	}
})