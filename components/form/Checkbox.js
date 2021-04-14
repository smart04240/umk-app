import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import useThemeStyles from '../../hooks/useThemeStyles';

import Colors from '../../constants/Colors';
import GeneralStyles from "../../constants/GeneralStyles";
import { isFunction } from '../../helpers/functions';

const Checkbox = props => {

    const ThemeStyles = useThemeStyles();
	const { name, init_checked, label, warning, required, onChange } = props;
	const [ checked, setChecked ] = useState( init_checked || false );	

	useEffect(() => {
		isFunction( onChange ) && onChange({ name, value: checked })
	}, [ checked ])

	return (
		<TouchableWithoutFeedback onPress={ () => setChecked( !checked )}>
			<View style={[ 
				styles.row,
				props.row_style || {} 
			]}>
				<View style={[ 
					GeneralStyles.row_centered, 
					styles.checkbox, 
					{ borderColor: ThemeStyles.blue_text }, 
					!!checked ? styles.checked : {} 
				]}>
					{ !!checked && <Ionicons name="checkmark" size={ 14 } color="#fff" /> }
				</View> 

				<View style={{ flexShrink: 1 }}>
					{ label && 
						<Text style={[ { color: ThemeStyles.dark_text }, GeneralStyles.text_regular ]}> 
							{ label } 
							{ !!required && <Text style={[ GeneralStyles.text_regular, styles.red ]}> * </Text> }
						</Text> 
					}

					{ warning && 
						<Text style={[ GeneralStyles.text_regular, styles.red ]}> 
							{ warning } 
						</Text>
					}
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}


const styles = StyleSheet.create({
	row: {
		marginBottom: 10,
		flexDirection: "row",
		maxWidth: "100%",
	},

	red: { color: Colors.Red },

	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 5,
		borderWidth: 1,
		marginRight: 18,
		borderStyle: "solid"
	},

	checked: {
		backgroundColor: Colors.Blue
	}
})


export default Checkbox;