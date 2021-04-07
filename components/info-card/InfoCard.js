import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image, Easing  } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Layout from '../../constants/Layout';
import useThemeStyles from '../../hooks/useThemeStyles';

const CARD_WIDTH = Layout.width * 0.7733;
const CARD_SCALE = 0.9;
const SCALED_CARD_WIDTH = CARD_WIDTH * CARD_SCALE;

const CONTAINER_WIDTH = Layout.width - Layout.paddingHorizontal * 2;
const ACTIVE_CARD_LEFT = ( CONTAINER_WIDTH - CARD_WIDTH ) / 2; 

const InfoCard = props => {

	const { title, text, img_source, active, item_index, total_amount } = props;
	const ThemeStyles = useThemeStyles();

	const animatedValue = useRef( new Animated.Value(0)).current;

	const STEP = ( CONTAINER_WIDTH - SCALED_CARD_WIDTH ) / total_amount;
	const START_LEFT = STEP * item_index;
	const END_LEFT = item_index !== 0 && item_index + 1 !== total_amount
		? ACTIVE_CARD_LEFT
		: START_LEFT;

	const handleAnimation = on => {
        Animated.timing( animatedValue, {
            toValue: !!on ? 1 : 0,
            duration: 500,
			useNativeDriver: true,
            easing: Easing.ease
        }).start()
    }

	useEffect(() => handleAnimation( !!active ), [ active ]);

	return (
		<Animated.View style={[ 
			styles.card,
			{ 
				backgroundColor: ThemeStyles.box_bg,

				zIndex: animatedValue.interpolate({
					inputRange: [ 0, 1 ],
					outputRange: [ 5, 100 ],
				}),

			 	transform: [
					{
						translateX: animatedValue.interpolate({
							inputRange: [ 0, 1 ],
							outputRange: [ START_LEFT, END_LEFT ],
						})
					},
					{
						scale: animatedValue.interpolate({
							inputRange: [ 0, 1 ],
							outputRange: [ CARD_SCALE, 1 ],	
						})
					}
				]
			}
		]}>
			
			{ img_source && 
				<View style={ styles.img_wrap }>
					<Image 
						style={ styles.img } 
						source={ img_source } 
					/>
				</View>
			}

			<Text style={[
				GeneralStyles.text_regular,
				styles.title,
				{ color: ThemeStyles.dark_blue_text }
			]}>
				{ title }
			</Text>

			<Text style={[
				GeneralStyles.text_regular,
				{ color: ThemeStyles.dark_blue_text }
			]}>
				{ text }
			</Text>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	card: {
		position: "absolute",
		borderRadius: 20,
		borderWidth: 0.5,
		borderColor: `rgba(0, 0, 0, .5)`,
		justifyContent: "center",
		elevation: 8,
		width: CARD_WIDTH,
		minHeight: Layout.height * 0.7,
		paddingHorizontal: 25,
		paddingBottom: 30,
		paddingTop: 30
	},

	img_wrap: {
		paddingHorizontal: 40,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 60,
	},

	img: {
		maxWidth: "100%", 
		resizeMode: "contain"
	},

	title: {
		fontSize: 20, 
		marginBottom: 20
	}
})

export default InfoCard;