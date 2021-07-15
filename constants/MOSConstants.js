import Layout from "./Layout";

const START_CIRCLE_SIZE = 100;
const POINT_CIRCLE_SIZE = Layout.width * 0.0841 < 30 ? 30 : Math.round( Layout.width * 0.0841 );
const POINT_INNER_CIRCLE_SIZE = POINT_CIRCLE_SIZE * 0.4444;
const LINE_SIZE = POINT_INNER_CIRCLE_SIZE;

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
		}
	}
}