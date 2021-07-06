import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from "../../constants/Colors";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import MOSConstants from "../../constants/MOSConstants";

import Line from './Line';

const Point = props => {

    const ThemeStyles = useThemeStyles();
	const { label, extra_label, passed, current } = props;

	const label_width = props.label_width || MOSConstants.PointLabel.Width;
	const label_position = props.label_position || "bottom";
	const line_height = props.line_height || 0;
	const absolute_extra_line_height = props.absolute_extra_line_height || 0;

	const total_line_height = 
		line_height || absolute_extra_line_height 
			? MOSConstants.Point.Circle.Size + line_height + absolute_extra_line_height
			: MOSConstants.Point.Circle.Radius;

	return (
		<View style={{
			marginBottom: line_height,
			left: props.left || 0,
		}}>

			<Line
				height={ total_line_height }
				left={ MOSConstants.Point.spaceBetweenCircleAndInnerCircle }
			/>
			

			<View style={[
					styles.circle,
					{
						backgroundColor: current ? "rgba(228, 235, 245, .7)" : "rgba(255, 255, 255, .7)",
						borderColor: current ? Colors.Blue : Colors.BunkerRgba(0.05)
					} 
				]} >
				<View 
					style={[
						styles.inner_circle,
						{ backgroundColor: passed ? Colors.Yellow : "#fff" } 
					]} 
				/>
			</View>

			<View style={[ 
				GeneralStyles.row_ac,
				MOSConstants.PointLabel.getPositionsStyles[ label_position ]( label_width ),
				styles.label_box,
				{ 
					backgroundColor: ThemeStyles.main_bg,
					width: label_width, 
				}
			]}>
				<Text style={[
					GeneralStyles.text_regular,
					GeneralStyles.row_ac,
					MOSConstants.PointLabel.PositionsTextStyles[ label_position ],
					{ color: ThemeStyles.dark_blue_text },
				]}>
					{ label }
				</Text>
			</View>

			{ extra_label && 
				<View style={[
					GeneralStyles.row_ac,
					MOSConstants.PointLabel.getPositionsStyles[ label_position ]( label_width ),
					styles.label_box,
					{ 
						backgroundColor: ThemeStyles.main_bg,
						width: label_width,
						top: line_height + MOSConstants.Point.Circle.Size
					}
				]}>
					<Text style={[
						GeneralStyles.text_regular,
						GeneralStyles.row_ac,
						MOSConstants.PointLabel.PositionsTextStyles[ label_position ],
						{ color: ThemeStyles.dark_blue_text },
					]}>
						{ extra_label }
					</Text>
				</View>
			}
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
	},

	label_box: {
		position: "absolute",
		paddingHorizontal: 2,
		paddingVertical: 3,
		minHeight: MOSConstants.PointLabel.MinHeight
	}
})

export default Point;