import Colors from "./Colors";

export default {

	Light: {
		dark_text: Colors.Bunker,
		dark_blue_text: Colors.PrussianBlue,
		blue_text: Colors.Blue,
		main_bg: Colors.AliceBlue,
		box_bg: Colors.White,
		icon_color: Colors.Blue,
		timelineNowLine: Colors.Black,
		blue_rgba: o => Colors.BlueRgba(o),
		dark_blue_rgba: o => Colors.PrussianBlueRgba(o),
		blue_overlay_rgba: o => Colors.BlueRgba(o)
	},

	Dark: {
		dark_text: Colors.White,
		dark_blue_text: Colors.White,
		blue_text: Colors.White,
		main_bg: Colors.Bunker,
		box_bg: Colors.PayneGrey,
		icon_color: Colors.White,
		timelineNowLine: Colors.White,
		blue_rgba: o => Colors.WhiteRgba(o),
		dark_blue_rgba: o => Colors.WhiteRgba(o),
		blue_overlay_rgba: o => Colors.BlackRgba(o)
	}
};
