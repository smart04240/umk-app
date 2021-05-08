import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import GeneralStyles from '../../constants/GeneralStyles';
import MOSConstants from '../../constants/MOSConstants';

const FinishCircle = () => (
	<View style={ styles.circle }>
		<Text style={ styles.text }>
			ZDOBYCIE DYPLOMU
		</Text>
	</View>
)

const styles = StyleSheet.create({
	circle: {
		...GeneralStyles.row_centered,
		top: -1,
		width: MOSConstants.StartCircle.Size,
		height: MOSConstants.StartCircle.Size,
		borderRadius: MOSConstants.StartCircle.Radius,
		backgroundColor: "#fff",
		padding: 5,
		borderColor: Colors.BunkerRgba(0.05),
		borderWidth: 1
	},

	text: {
		...GeneralStyles.text_regular,
		textAlign: "center",
		color: Colors.Blue,
		textTransform: "uppercase"
	}
});

export default FinishCircle;