import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

import Colors from "../../constants/Colors";
import GeneralStyles from "../../constants/GeneralStyles";

export default props => (
	<View style={{ width: "100%", marginBottom: 20 }}>
		{ props.label && <Text style={[ GeneralStyles.text_regular, styles.label ]}> { props.label } </Text> }
		<TextInput
			style={[ GeneralStyles.text_regular, styles.input, props.style || {} ]}
			{...props }
		/>
	</View>
);


const styles = StyleSheet.create({
	label: { marginBottom: 8 },
	input: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderColor: Colors.Blue,
		borderRadius: 7,
		borderStyle: "solid",
		borderWidth: 1,
		color: Colors.Bunker
	}
})