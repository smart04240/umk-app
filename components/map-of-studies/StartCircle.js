import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import MOSConstants from "../../constants/MOSConstants";

import Line from './Line';
import useTranslator from "../../hooks/useTranslator";

const StartCircle = props => {
	const translate = useTranslator();
	return (
		<LinearGradient
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 0 }}
			colors={[ "#034EA2", "#226EC5" ]}
			style={[
				styles.circle,
				{ marginBottom: props.line_height }
			]}
		>
			<Text style={ styles.text }>
				{ translate( Translations.BeginningOfStudies )}
			</Text>

			<Line
				top={ MOSConstants.StartCircle.Size }
				left={ MOSConstants.StartCircle.Radius - MOSConstants.Line.Size / 2  }
				height={ props.line_height }
			/>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({

	circle: {
		...GeneralStyles.row_centered,
		width: MOSConstants.StartCircle.Size,
		height: MOSConstants.StartCircle.Size,
		borderRadius: MOSConstants.StartCircle.Radius,
		padding: 5
	},

	text: {
		...GeneralStyles.text_regular,
		textAlign: "center",
		color: "#fff",
		textTransform: "uppercase"
	}
});

export default StartCircle;