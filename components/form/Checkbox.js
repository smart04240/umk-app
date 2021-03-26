import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import Colors from '../../constants/Colors';
import GeneralStyles from "../../constants/GeneralStyles";
import { isFunction } from '../../helpers/functions';

const Checkbox = props => {

	const { name, init_checked, label, warning, required, onChange } = props;
	const [ checked, setChecked ] = React.useState( init_checked || false );

	React.useEffect(() => {
		if ( isFunction( onChange )) onChange({ name, checked })
	}, [ checked ])

	return (
		<TouchableWithoutFeedback onPress={ () => setChecked( !checked )}>
			<View style={ styles.row }>
				<View style={[ GeneralStyles.row_centered, styles.checkbox, !!checked ? styles.checked : {} ]}>
					{ !!checked && <Ionicons name="checkmark" size={ 14 } color="#fff" /> }
				</View> 

				<View style={{ flexShrink: 1 }}>
					{ label && 
						<Text style={[ GeneralStyles.text_regular ]}> 
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
		borderStyle: "solid",
		borderColor: Colors.Blue
	},

	checked: {
		backgroundColor: Colors.Blue
	}
})


export default Checkbox;