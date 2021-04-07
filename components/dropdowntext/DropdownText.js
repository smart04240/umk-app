import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import useThemeStyles from '../../hooks/useThemeStyles';
import GeneralStyles from "../../constants/GeneralStyles";
import Colors from '../../constants/Colors';

const DropdownText = props => {

	const ThemeStyles = useThemeStyles();

	const { label, text, eye, open, onPress } = props;
	
	const box_border_style = !eye
		? { borderColor: open ? Colors.Blue : ThemeStyles.blue_text }
		: { borderRadius: 20, borderColor: Colors.PayneGrayRgba(0.05) }

	const box_bg_style = !eye 
		? { backgroundColor: open ? Colors.Blue : Colors.BlueRgba(0) }
		: { backgroundColor: open ? Colors.Blue : ThemeStyles.box_bg }	

	return (
		<View style={{ marginBottom: 10 }}>
			<TouchableOpacity 
				onPress={ onPress } 
				style={[ 
					styles.box,
					box_border_style,
					box_bg_style
				]}
			> 
				<Text style={[ 
					GeneralStyles.text_regular,
					{ marginRight: 10 },
					{ color: open ? "#fff" : ThemeStyles.blue_text }
				]}>
					{ label }
				</Text>

				{ eye && 
					<View style={[
						styles.eye_box,
						{ borderColor: open ? Colors.White : ThemeStyles.blue_text },
						 
					]}>
						<MaterialCommunityIcons 
							name="eye-outline" 
							size={ 22 } 
							color={ open ? Colors.White : ThemeStyles.icon_color } 
						/>
					</View>
				}
			</TouchableOpacity>

			{ open && 
				<View style={{ marginTop: 18, marginBottom: 10 }}>
					<Text style={[ 
						GeneralStyles.text_regular, 
						{ color: ThemeStyles.dark_text } 
					]}>
						{ text }
					</Text>
				</View>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		...GeneralStyles.row_ac,
		borderRadius: 7,
		borderWidth: 1,
		paddingHorizontal: 14,
		paddingVertical: 10
	},

	eye_box: {
		...GeneralStyles.row_centered,
		marginLeft: "auto",
		width: 32,
		height: 32,
		borderRadius: 32,
		borderWidth: 1
	}
});

export default DropdownText;