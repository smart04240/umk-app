import React from 'react';
import { View, StyleSheet } from "react-native";
import GeneralStyles from '../../../constants/GeneralStyles';
import MOSConstants from '../../../constants/MOSConstants';

import Colors from "../../../constants/Colors";
import useThemeStyles from '../../../hooks/useThemeStyles';

const PointCircle = props => {

    const ThemeStyles = useThemeStyles();
	const { passed, current } = props;

	return (
		<>
			<View style={[
				styles.circle,
				{
					backgroundColor: current ? "rgba(228, 235, 245, .7)" : "rgba(255, 255, 255, .7)",
					borderColor: current ? Colors.Blue : Colors.BunkerRgba(0.05)
				} 
			]}>

			<View 
				style={[
					styles.inner_circle,
					{ backgroundColor: passed ? Colors.Yellow : "#fff" } 
				]} 
			/>
			</View>
		</>
	)
}


const styles = StyleSheet.create({

	circle: {
		...GeneralStyles.row_centered,
		width: MOSConstants.Point.Circle.Size,
		height: MOSConstants.Point.Circle.Size,
		borderRadius: MOSConstants.Point.Circle.Radius,
		backgroundColor: "rgba(255, 255, 255, .7)",
		borderColor: Colors.BunkerRgba(0.05),
		borderWidth: 1
	},
	
	inner_circle: {
		width: MOSConstants.Point.InnerCircle.Size,
		height: MOSConstants.Point.InnerCircle.Size,
		borderRadius: MOSConstants.Point.InnerCircle.Radius,
		borderColor: Colors.Yellow,
		borderWidth: 1
	}
})

export default PointCircle;