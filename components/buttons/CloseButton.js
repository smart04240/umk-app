import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons'; 
import useThemeStyles from '../../hooks/useThemeStyles';

const CloseButton = props => {

    const ThemeStyles = useThemeStyles();

	return (
		<TouchableOpacity style={ props.style } onPress={ props.onPress }> 
			<Ionicons name="close" size={ 25 } color={ ThemeStyles.icon_color } />
		</TouchableOpacity>
	)
}


export default CloseButton;