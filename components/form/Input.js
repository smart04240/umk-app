import React from "react";
import {StyleSheet, Text, View} from "react-native";
import DebouncedInput from "./DebouncedInput";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import Colors from "../../constants/Colors";

export default function Input(props) {

	const ThemeStyles = useThemeStyles();
	const text_color = { color: ThemeStyles.dark_text };

	return (
		<View style={{ width: "100%" }}>
			
			{ props.label && 
				<Text style={[ 
					text_color, 
					GeneralStyles.text_regular, 
					styles.label 
				]}>
					{ props.label }
				</Text>
			}

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

			{ !!props.error_message && 
				<Text style={[
					GeneralStyles.text_regular,
					{ color: Colors.Red, marginBottom: 7 }
				]}>
					{ props.error_message }
				</Text>
			}
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