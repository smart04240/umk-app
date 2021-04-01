import Fonts from "./Fonts";

export default {

	text_semibold: {
		fontSize: 16,
		fontFamily: Fonts.ProximaNova.SemiBold
	},

	text_bold: {
		fontSize: 16,
		fontFamily: Fonts.ProximaNova.Bold
	},

	text_regular: {
		fontSize: 16,
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
	}
}