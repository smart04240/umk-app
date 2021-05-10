import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from "../../constants/Colors";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import MOSConstants from "../../constants/MOSConstants";

import Line from './Line';

const Point = props => {

    const ThemeStyles = useThemeStyles();
	const { label, passed, label_position } = props;

	const to_next_bottom_point = props.to_next_bottom_point || 0;
	const extra_vertical_line_height = props.extra_vertical_line_height || 0;

	const horizontal_line_height = 
		to_next_bottom_point || extra_vertical_line_height 
			? MOSConstants.Point.Circle.Size + to_next_bottom_point + extra_vertical_line_height
			: MOSConstants.Point.Circle.Radius;

	return (
		<View style={{
			marginBottom: to_next_bottom_point || 0,
			left: props.left || 0
		}}>

			<Line
				height={ horizontal_line_height }
				left={ ( MOSConstants.Point.Circle.Size - MOSConstants.Point.InnerCircle.Size ) / 2 }
			/>
			

			<View style={ styles.circle }>
				<View 
					style={[
						styles.inner_circle,
						{ backgroundColor: passed ? Colors.Yellow : "#fff" } 
					]} 
				/>
			</View>

			<View style={[ 
				GeneralStyles.row_ac,
				MOSConstants.PointLabel.PositionsStyles[ label_position || "bottom" ],
				{ 
					position: "absolute",
					paddingHorizontal: 2,
					backgroundColor: ThemeStyles.main_bg,
					width: MOSConstants.PointLabel.Width, 
					minHeight: MOSConstants.PointLabel.MinHeight,
				}
			]}>
				<Text style={[
					GeneralStyles.text_regular,
					GeneralStyles.row_ac,
					MOSConstants.PointLabel.PositionsTextStyles[ label_position || "bottom" ],
					{ color: ThemeStyles.dark_blue_text },
				]}>
					{ label }
				</Text>
			</View>
		</View>
		
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

export default Point;