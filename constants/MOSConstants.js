import Layout from "./Layout";

const START_CIRCLE_SIZE = 100;
const POINT_CIRCLE_SIZE = Layout.width * 0.0841 < 30 ? 30 : Math.round( Layout.width * 0.0841 );
const POINT_INNER_CIRCLE_SIZE = POINT_CIRCLE_SIZE * 0.4444;
const LINE_SIZE = POINT_INNER_CIRCLE_SIZE;
const POINT_POSITION_CENTER_LEFT_VALUE = Layout.container_width / 2 - POINT_CIRCLE_SIZE / 2;
const POINT_LABEL_WIDTH = POINT_POSITION_CENTER_LEFT_VALUE - POINT_CIRCLE_SIZE;


export default {

	StartCircle: {
		Size: START_CIRCLE_SIZE,
		Radius: START_CIRCLE_SIZE / 2,
		Left:  Layout.container_width / 2 - START_CIRCLE_SIZE / 2
	},	

	Line: {
		Size: LINE_SIZE
	},

	DropdownCircle: {
		Size: POINT_CIRCLE_SIZE,
		Radius: ( POINT_CIRCLE_SIZE ) / 2
	},

	Point: {
		Circle: {
			Size: POINT_CIRCLE_SIZE,
			Radius: POINT_CIRCLE_SIZE / 2
		},

		InnerCircle: {
			Size: POINT_INNER_CIRCLE_SIZE,
			Radius: POINT_INNER_CIRCLE_SIZE / 2
		},

		// Point center absolute left value
		PositionsLeftValue: {
			"left": 0,
			"right": Layout.container_width - POINT_CIRCLE_SIZE,
			"center": POINT_POSITION_CENTER_LEFT_VALUE,
			"center_left": Layout.container_width / 4 - POINT_CIRCLE_SIZE / 2,
			"center_right": Layout.container_width / 4 * 3 - POINT_CIRCLE_SIZE / 2 
		}
	},

	PointLabel: {
		Width: POINT_LABEL_WIDTH,
		MinHeight: POINT_CIRCLE_SIZE,
		PositionsTextStyles: {
			"bottom": { textAlign: "center" },
			"left": { textAlign: "right" },
			"right": { textAlign: "left" }
		},
		PositionsStyles: {
			"bottom": {
				top: POINT_CIRCLE_SIZE,
				left: POINT_CIRCLE_SIZE / 2 - POINT_LABEL_WIDTH / 2,
				justifyContent: "center"
			},
		
			"left": {
				top: 0,
				left: -POINT_LABEL_WIDTH,
				justifyContent: "flex-end"
			},
		
			"right": {
				top: 0,
				left: POINT_CIRCLE_SIZE
			}
		}
	},
}