import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Layout from "../../constants/Layout";
import GeneralStyles from '../../constants/GeneralStyles';
import MOSConstants from '../../constants/MOSConstants';
import Translations from '../../constants/Translations';
import useTranslator from '../../hooks/useTranslator';

const FinishCircle = props => {
	
	const translate = useTranslator();

	return (
		<View style={ styles.circle }>
			<Text style={ styles.text }>
				{ translate( props.mish ? Translations.MISHEndYear : Translations.ObtainingADiploma)}
			</Text>
		</View>
	)
}

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
		textTransform: "uppercase",
		position: "absolute",
		paddingHorizontal: 10,
		width: Layout.width,
		marginLeft: -Layout.width / 2 
	}
});

export default FinishCircle;