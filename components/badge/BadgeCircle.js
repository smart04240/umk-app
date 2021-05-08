import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../constants/Colors';

const BadgeCircle = props => {

	const width = props.size || 125;
	const height = props.size || 125;

	const sizes = { width, height };

	return (
		<LinearGradient 
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 0 }}
			colors={[ "#034EA2", "#226EC5" ]}
			style={[ styles.circle, sizes ]}
		>

		</LinearGradient>
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