import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';

import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import { isFunction } from '../../helpers/functions';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';
import Colors from '../../constants/Colors';

const Dropdown = props => {

	const ThemeStyles = useThemeStyles();

	const { init_value, label, name, options, onChange } = props;
	const placeholder = props.placeholder || useTranslated( Translations.ChooseOneOption );

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
		<View style={[ 
			{ marginBottom: 8 }, 
			props.container_style || {} 
		]}>
			
			{ label && 
				<Text style={[
					GeneralStyles.text_regular,
					{ color: ThemeStyles.dark_text, marginBottom: 8 }
				]}>
					{ label }
				</Text>
			}
			
			<View style={[ 
				styles.box, 
				open ? styles.box_open : {}, 
				{ borderColor: ThemeStyles.blue_text },
				props.box_style || {} 
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
					styles.options_box, 
					{ 
						borderColor: ThemeStyles.blue_text,
						backgroundColor: ThemeStyles.box_bg
					},
					props.options_box_style || {}
				]}>	
					<ScrollView>
						{ options.map( opt => (
							<TouchableWithoutFeedback 
								key={ opt.value } 
								onPress={ () => onOptionPress( opt.value )}
							>
								<Text style={[ 
									GeneralStyles.text_regular, 
									styles.option_text,
									{ color: ThemeStyles.blue_text },
									props.option_text_style || {}
								]}> 
									{ opt.label } 
								</Text>
							</TouchableWithoutFeedback>
						)) }
					</ScrollView>
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
		borderBottomColor: Colors.BlueRgba(0)
	},

	value_label: { flexWrap: "wrap", flex: 1 },

	options_box: {
		maxHeight: 120,
		position: "absolute",
		left: 0,
		top: "100%",
		width: "100%",
		paddingHorizontal: 15,
		paddingVertical: 10,
		backgroundColor: "#fff",
		zIndex: 10,
		elevation: 1,
		borderWidth: 1,
		borderTopWidth: 0.4,
		borderBottomLeftRadius: 7,
		borderBottomRightRadius: 7,
	},

	option_text: { paddingVertical: 5 }
})


export default Dropdown;