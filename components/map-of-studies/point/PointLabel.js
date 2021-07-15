import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GeneralStyles from '../../../constants/GeneralStyles';
import useThemeStyles from '../../../hooks/useThemeStyles';


const PointLabel = props => {

    const ThemeStyles = useThemeStyles();
	const { label, small_label, label_position } = props;

	const text_align =
		 label_position === "left" 
			? "right" 
			: label_position === "bottom" ? "center" : "left" 


	const text_styles = [
		GeneralStyles.text_regular,
		{ 
			color: ThemeStyles.dark_blue_text,
			textAlign: text_align	
		}
	];


	return (
		<View style={[
			styles.label_box,
			{ 
				backgroundColor: ThemeStyles.main_bg 
			},
		]}>
			<Text style={ text_styles }>
				{ label }
			</Text>

			{ small_label && 
				<Text style={[
					...text_styles,
					{ fontSize: 12 }
				]} >
					{ small_label }
				</Text>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	label_box: {
		width: "100%",
		paddingHorizontal: 3,
		paddingVertical: 3,
	}
})

export default PointLabel;