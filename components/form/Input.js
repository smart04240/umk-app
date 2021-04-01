import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

export default props => {

    const ThemeStyles = useThemeStyles();
	const text_color = { color: ThemeStyles.dark_text };

	return (
		<View style={{ width: "100%", marginBottom: 20 }}>
			{ props.label && <Text style={[ text_color, GeneralStyles.text_regular, styles.label ]}> { props.label } </Text> }
			<TextInput
				style={[ 
					text_color,
					GeneralStyles.text_regular, 
					styles.input,
					{ borderColor: ThemeStyles.blue_text }, 
					props.style || {} 
				]}
				{...props }
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