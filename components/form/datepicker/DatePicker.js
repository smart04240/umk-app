import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import useThemeStyles from '../../../hooks/useThemeStyles';
import GeneralStyles from "../../../constants/GeneralStyles";
import { isFunction, isObject } from '../../../helpers/functions';
import { getLocalDateAndTimeFromISOString } from '../../../helpers/date';
import Translations from '../../../constants/Translations';
import useTranslator from '../../../hooks/useTranslator';

import DatePickerCalendar from './DatePickerCalendar';

const DatePicker = props => {

	const ThemeStyles = useThemeStyles();
	const translate = useTranslator();

	const { name, init_value, placeholder, onChange } = props;
	const calendar_styles = isObject( props.calendar_styles ) ? props.calendar_styles : {};
	const [ open, setOpen ] = useState( false );
	const [ value, setValue ] = useState( init_value || null );

	const value_label = useMemo(() =>  {

		let result = placeholder || translate( Translations.Date )

		if ( value ) { 
			const date_time = getLocalDateAndTimeFromISOString( value );
			if ( date_time?.date ) result = date_time.date;
		} 

		return result;
			
	}, [ value ]);

	useEffect(() => { 
		isFunction( onChange ) && onChange({ name, value })
	}, [ value ]);

	return (
		<View style={[
			styles.container,
			props.container_style || {} 
		]}>
			<TouchableWithoutFeedback onPress={ () => setOpen( !open )}>
				<View style={[
					styles.input,
					{ borderColor: ThemeStyles.blue_text },
					props.input_style || {}
				]}>

					<Text style={[
						GeneralStyles.text_regular,
						{ color: ThemeStyles.dark_text, marginRight: "auto" },
						props.value_label_style || {}
					]}>
						{ value_label }
					</Text>

					{ !!value &&
						<TouchableOpacity 
							style={{ paddingHorizontal: 8 }}
							onPress={ e => { 
								e.stopPropagation();
								setValue( null );
								setOpen( false );
							}}
						>
							<MaterialCommunityIcons 
								name="close" 
								size={ 23 } 
								color={ ThemeStyles.icon_color }
							/>
						</TouchableOpacity>
					}

					<MaterialCommunityIcons 
						name="calendar-range" 
						size={ 23 } 
						color={ ThemeStyles.icon_color } 
					/>
				</View>
			</TouchableWithoutFeedback>
			
			{ open && 
				<DatePickerCalendar 
					{ ...calendar_styles } 
					init_iso_date={ value }
					onChange={ v => setValue( v )}
				/>
			}
			
		</View>
	)
}


const styles = StyleSheet.create({

	container: {
		width: "100%",
		marginBottom: 8
	},

	input: {
		...GeneralStyles.row_ac,
		borderRadius: 7,
		borderStyle: "solid",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
	}
})


export default DatePicker;