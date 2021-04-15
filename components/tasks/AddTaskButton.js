import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import GeneralStyles from '../../constants/GeneralStyles';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Routes from '../../constants/Routes';

const AddTaskButton = props => {

	const navigation = useNavigation();
	const navigate = () => navigation.navigate( Routes.TaskEdit );

	return (
		<TouchableOpacity 
			style={[ 
				styles.circle,
				props.circle_style || {} 
			]}
			onPress={ navigate }
		>
			<MaterialCommunityIcons 
				name="playlist-plus" 
				size={ 22 } 
				color={ Colors.White } 
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	circle: {
		...GeneralStyles.row_centered,
		position: "absolute",
		bottom: 70,
		left: Layout.paddingHorizontal,
		zIndex: 5,
		elevation: 5,
		width: 51,
		height: 51,
		borderRadius: 51/2,
		backgroundColor: Colors.Blue
	}
})

export default AddTaskButton;