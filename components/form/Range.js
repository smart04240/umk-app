import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import Colors from '../../constants/Colors';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';


const Range = props => {

	const ThemeStyles = useThemeStyles();
	const { data, label, color, hide_value_label } = props;

	if ( !data || !data.type ) return null;
	const { type, value, total } = data;

	let value_label = '';
	let slider_width = 0;

	switch ( type ) {
		case "percent": 
			slider_width = value;
			value_label = value; 
		break;

		case "range":
			slider_width = (( value / total ) * 100 ) + "%";
			value_label = `${value}/${total}`; 
		break;	

		default: return null;
	}

	let slider_box_bg = Colors.BlueRgba(0.2);
	let slider_bg = Colors.Blue;
	
	switch ( color ) {
		case "orange":
			slider_box_bg = Colors.OrangeRgba(0.2);
			slider_bg = Colors.Orange;
		break;

		case "purple":
			slider_box_bg = Colors.PurpleRgba(0.2);
			slider_bg = Colors.Purple;
		break;

		case "green":
			slider_box_bg = Colors.GreenRgba(0.2);
			slider_bg = Colors.Green;
		break;

		case "red":
			slider_box_bg = Colors.AlizarinRgba(0.2);
			slider_bg = Colors.Red;
		break;
	}

	return (
		<View style={{ marginBottom: 23 }}>
			<View style={[ GeneralStyles.row_center_between, { marginBottom: 10 } ]}>
				{ label && 
					<Text style={[ 
						GeneralStyles.text_regular, 
						{ color: ThemeStyles.dark_text },
						props.label_style || {}
					]}>
						{ label }
					</Text>
				}

				{( !hide_value_label && !!value_label ) &&
					<Text style={[ 
						GeneralStyles.text_regular, 
						{ color: ThemeStyles.dark_text, fontSize: 14 } 
					]}> { value_label } </Text>
				}

			</View>
			<View style={[ styles.slider_box, { backgroundColor: slider_box_bg } ]}>
				<View style={[ styles.slider, { backgroundColor: slider_bg, width: slider_width } ]}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	slider: {
		position: "absolute",
		left: 0,
		top: 0,
		height: 10,
		borderRadius: 5
	},

	slider_box: {
		borderRadius: 5,
		height: 10,
		width: "100%"
	}
})


export default Range;