
const getRgbaFunc = ( r, g, b ) => {
	return o => `rgba( ${r}, ${g}, ${b}, ${o})`;
}


export default {

	Black: "#000000",
	BlackRgba: getRgbaFunc( 0, 0, 0 ),

	White: "#ffffff",
	WhiteRgba: getRgbaFunc( 255, 255, 255 ),
	
	AliceBlue: "#FBFCFE",
	
	Blue: "#034EA2",
	BlueRgba: getRgbaFunc( 3, 78, 162 ),

	DeepSkyBlue: "#00AEEF",
	DeepSkyBluRgba: getRgbaFunc( 0, 174, 239 ),

	PigeonPost: "#A8BFD8",
	
	Red: "#D82D2D", //notific
	RedRgba: getRgbaFunc( 237, 29, 36 ),

	Yellow: "#FFCB05",
	YellowRgba: getRgbaFunc( 255, 203, 5 ),
	
	Orange: "#FFD537",
	OrangeRgba: getRgbaFunc( 255, 213, 55 ), 

	CarrotOrange: "#F58220",
	CarrotOrangeRgba: getRgbaFunc( 245, 130, 32 ),

	PrussianBlue: "#002753",
	PrussianBlueRgba: getRgbaFunc( 0, 39, 83 ),

	PayneGrey: "#404041",
	PayneGrayRgba: getRgbaFunc( 64, 64, 65 ), 

	Manatee: "#939496",
	ManateeRgba: getRgbaFunc( 147, 148, 150 ),

	Alizarin: "#ED1D24", //range
	AlizarinRgba: getRgbaFunc( 237, 29, 36 ),

	Green: "#00A651",
	GreenRgba: getRgbaFunc( 0, 166, 81 ),

	Purple: "#A3238F",
	PurpleRgba: getRgbaFunc( 163, 35, 143 ),

	Bunker: "#2C2E30",
	BunkerRgba: getRgbaFunc( 44, 46, 48 )
};

