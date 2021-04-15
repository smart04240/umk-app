import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { addZeroIfNeeded, isFunction } from '../../../helpers/functions';

import GeneralStyles from '../../../constants/GeneralStyles';
import useThemeStyles from '../../../hooks/useThemeStyles';


const 
	hours_arr = [], 
	minutes_arr = [];

for ( let i = 0; i <= 59; i++ ) {
	const val = String( addZeroIfNeeded( i ));
	if ( val < 24 ) hours_arr.push( val );
	minutes_arr.push( val );
}

const boxes = {
	"hours": hours_arr,
	"minutes": minutes_arr
}

const TimePickerTimeBox = props => {

	const ThemeStyles = useThemeStyles();
	const { value, name, onNumPress } = props;
	const numbers = boxes[ name ];

	return (
		<View>
			<ScrollView
				showsHorizontalScrollIndicator={ false }
				showsVerticalScrollIndicator={ false }
			>
				{ numbers && !!numbers.length &&
					numbers.map( num => {
					
					const num_opacity = value[ name ] === num ? 1: 0.5;

					return (
						<TouchableOpacity 
							key={ num }
							onPress={ () => isFunction( onNumPress) && onNumPress( name, num )}
						>
							<Text style={[
								styles.number,
								{ color: ThemeStyles.blue_rgba( num_opacity )} 
							]}> 
								{ num } 
							</Text>
						</TouchableOpacity>
					)} 
				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	number: {
		...GeneralStyles.text_regular,
		fontSize: 32
	}
})


export default TimePickerTimeBox;