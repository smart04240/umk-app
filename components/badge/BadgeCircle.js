import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const BadgeCircle = props => {

	const width = props.size || 125;
	const height = props.size || 125;

	const sizes = { width, height };

	return (
		<View style={[ styles.circle, sizes ]}>
		</View>
	)
}

const styles = StyleSheet.create({
	circle: {
		width: 125,
		height: 125,
		borderRadius: 125,
		marginBottom: 24,
		backgroundColor: Colors.Blue
	}
})


export default BadgeCircle;