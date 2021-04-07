import React, { useState } from 'react';
import { View, Text } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import DropdownText from './DropdownText';

const DropDownTextGroup = props => {

	const ThemeStyles = useThemeStyles();
	const { label, items } = props;

	const [ opened_index, setOpenedIndex ] = useState( null );

	const itemOnPress = index => {
		setOpenedIndex( index === opened_index ? null : index )
	}

	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={{...GeneralStyles.text_regular, marginBottom: 13, color: ThemeStyles.dark_text }}>
				{ label }
			</Text>

			{ items && !!items.length && 
				items.map(( item, index ) => (
					<DropdownText
						key={ index } 
						{...item }
						open={ index === opened_index }
						onPress={ () => itemOnPress( index )}
					/>
				))
			}
		</View>
	)
}


export default DropDownTextGroup;