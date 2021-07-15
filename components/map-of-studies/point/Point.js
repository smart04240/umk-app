import React, { useMemo } from 'react';
import { View } from 'react-native';

import MOSConstants from "../../../constants/MOSConstants";

import Line from '../Line';
import PointCircle from './PointCircle';
import PointLabel from './PointLabel';

const Point = props => {

	const label_position = props.label_position || "bottom";
	const bottom_margin = props.bottom_margin || 0;
	const main_direction = label_position === "bottom" ? "column" : "row";
	

	const Circle = useMemo(() => <PointCircle passed={ props.passed } current={ props.current } />, []);
	const Label = useMemo(() => 
		<PointLabel 
			label={ props.label } 
			small_label={ props.small_label }
			label_position={ label_position } 
		/>
	, []);

	return (
		<View style={{
			width: "100%",
		}}>

			{ !props.hide_line && 
				<Line style={{
						height: !bottom_margin ? MOSConstants.Point.InnerCircle.Size : "100%",
						top: 0,
						left: "50%",
						marginLeft: -MOSConstants.Line.Size / 2,
					}}
				/>
			}

			<View style={{
				width: "100%",		
				marginBottom: bottom_margin,
				flexDirection: main_direction,
				alignItems: "center"
			}}>
				{ main_direction === "column" &&
					<>
						{ Circle }
						{ Label }
					</>
				}

				{ main_direction === "row" &&
					<>
						<View style={{ flex: 1 }}>
							{ label_position === "left" && Label }
						</View>
				
						{ Circle }
					
						<View style={{ flex: 1 }}>
							{ label_position === "right" && Label }
						</View>
					</>
				}
			</View>

		</View>
	)
}



export default Point;