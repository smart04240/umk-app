import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Colors from '../../constants/Colors';

const BadgeCircle = props => {

	const size = props.size || 125;
	const sizes_style = { width: size , height: size , borderRadius: size / 2 };

	return (
		<LinearGradient 
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 0 }}
			colors={[ "#034EA2", "#226EC5" ]}
			style={[ styles.circle, sizes_style ]}
		>

		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	circle: {
		marginBottom: 24,
		backgroundColor: Colors.Blue
	}
})


export default BadgeCircle;