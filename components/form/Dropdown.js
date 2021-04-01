import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import GeneralStyles from '../../constants/GeneralStyles';
import { isFunction } from '../../helpers/functions';
import useThemeStyles from '../../hooks/useThemeStyles';
import { FontAwesome } from '@expo/vector-icons';

const Dropdown = props => {

	const ThemeStyles = useThemeStyles();

	const { init_value, name, options, onChange } = props;
	const placeholder = props.placeholder || "Choose one option";

	const [ value, setValue ] = useState( init_value || null ); 
	const [ open, setOpen ] = useState( false );

	const value_label = useMemo(() => (
		options && !!options.length && !!value
			? options.find( item => item.value === value )?.label || placeholder
			: placeholder
	), [ value ]);

	const icon_name = useMemo(() => open ? "angle-up" : "angle-down", [ open ]);

	
	useEffect(() => {
		if ( isFunction( onChange )) 
			onChange({ name, value });
	}, [ value ]);


	const onOptionPress = value => {
		setValue( value );
		setOpen( false );
	}

	return (
		<View style={[ { marginBottom: 8 }, props.container_style || {} ]}>

			<View style={[ 
				styles.box, 
				open ? styles.box_open : {}, 
				{ borderColor: ThemeStyles.blue_text },
				props.box_styles || {} 
			]}>

				<TouchableWithoutFeedback onPress={ () => setOpen( !open )}>
					<View style={[ GeneralStyles.row_center_between] }>

						<Text style={[ 
							GeneralStyles.text_regular, 
							styles.value_label, 
							{ color: ThemeStyles.dark_text } 
						]}>
							{ value_label }
						</Text>

						<FontAwesome 
							style={{ marginLeft: 8 }} 
							name={ icon_name } 
							size={ 24 } 
							color={ ThemeStyles.icon_color } 
						/>
					</View> 
				</TouchableWithoutFeedback>

			</View>

			{( options && !!options.length && !!open ) &&
				<View style={[ 
					styles.options, 
					{ 
						borderColor: ThemeStyles.blue_text,
						backgroundColor: ThemeStyles.box_bg
					} 
				]}>
					{ options.map( opt => (
						<TouchableWithoutFeedback 
							key={ opt.value } 
							onPress={ () => onOptionPress( opt.value )}
						>
							<Text style={[ 
								GeneralStyles.text_regular, 
								styles.option_text,
								{ color: ThemeStyles.blue_text } 
							]}> 
								{ opt.label } 
							</Text>
						</TouchableWithoutFeedback>
					)) }
				</View>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 7,
		borderStyle: "solid",
		borderWidth: 1
	},

	box_open: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},

	value_label: { flexWrap: "wrap", flex: 1 },

	options: {
		position: "absolute",
		left: 0,
		top: "100%",
		width: "100%",
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: "#fff",
		zIndex: 10,
		borderWidth: 1,
		borderBottomLeftRadius: 7,
		borderBottomRightRadius: 7,
	},

	option_text: {
		paddingVertical: 6,
	}
})


export default Dropdown;