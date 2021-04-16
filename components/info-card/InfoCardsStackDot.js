import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';
import useThemeStyles from '../../hooks/useThemeStyles';

const InfoCardsStackDot = props => {

	const ThemeStyles = useThemeStyles();
	const { active } = props;
	const animated_value = useRef( new Animated.Value(0)).current;

	const handleAnimation = value => {
		Animated.timing( animated_value, {
            toValue: value ? 1 : 0,
            duration: 500,
			useNativeDriver: true,
            easing: Easing.ease
        }).start()
	}

	useEffect(() => handleAnimation( active ), [ active ]);

	return (
		<Animated.View 
			style={[
				styles.dot,
				{ backgroundColor: ThemeStyles.blue_rgba(1) },
				{
					opacity: animated_value.interpolate({
						inputRange: [ 0, 1 ],
						outputRange: [ 0.2, 1 ]
					}),

					transform: [
						{
							scaleX: animated_value.interpolate({
								inputRange: [ 0, 1 ],
								outputRange: [ 1, 0.72 ]
							}) 
						}
					] 
				}
			]}
		/>
	)
}

const styles = StyleSheet.create({
	dot: {
		borderRadius: 5,
		height: 7,
		width: 18,
		marginHorizontal: 4,
	}
})

export default InfoCardsStackDot;