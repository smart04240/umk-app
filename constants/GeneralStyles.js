import Fonts from "./Fonts";
import Layout from "./Layout";

const main_font_size = Layout.width < 420 ? 14 : 16;

export default {

	text_semibold: {
		fontSize: main_font_size,
		fontFamily: Fonts.ProximaNova.SemiBold
	},

	text_bold: {
		fontSize: main_font_size,
		fontFamily: Fonts.ProximaNova.Bold
	},

	text_regular: {
		fontSize: main_font_size,
		fontFamily: Fonts.ProximaNova.Regular
	},

	flex_centered: {
		alignItems: "center", 
		justifyContent: "center" 
	},

	row_wrap: {
		flexDirection: "row",
		flexWrap: "wrap"
	},

	row_ac: {
		flexDirection: "row", 
		alignItems: "center", 
	},

	row_ac_jfe: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end"
	},

	row_centered: {
		flexDirection: "row", 
		alignItems: "center", 
		justifyContent: "center" 
	},

	row_center_around: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	},

	row_center_between: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},

	header_title: {
		fontSize: 20,
		fontFamily: Fonts.ProximaNova.Regular,
	},

	bottom_border_radius: {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},

	header_without_tb: {
		elevation: 5,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	}
}