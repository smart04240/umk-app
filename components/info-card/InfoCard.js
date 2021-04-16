import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Image, Easing  } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Layout from '../../constants/Layout';
import useThemeStyles from '../../hooks/useThemeStyles';

const MEDIUM_SCALE = 0.9;
const SMALL_SCALE = 0.8;

const CONTAINER_WIDTH = Layout.width - ( Layout.paddingHorizontal * 2 );
const CARD_WIDTH = Math.round( CONTAINER_WIDTH * 0.866 );
const MEDIUM_CARD_WIDTH = Math.round( CARD_WIDTH * MEDIUM_SCALE );
const SMALL_CARD_WIDTH = Math.round( CARD_WIDTH * SMALL_SCALE );

const MEDIUM_CARD_X = ( CARD_WIDTH - MEDIUM_CARD_WIDTH ) / 2;
const SMALL_CARD_X = ( CARD_WIDTH - SMALL_CARD_WIDTH ) / 2;
const CENTERED_CARD_LEFT = ( CONTAINER_WIDTH - CARD_WIDTH ) / 2;

const CARDS_X = {
	FIRST: [
		0 - SMALL_CARD_X,								// small
		0 - MEDIUM_CARD_X,  							// medium
		0,												// big,
		0												// ...
	],

	MEDIUM: [
		0,												// ...
		CENTERED_CARD_LEFT + MEDIUM_CARD_X,				// on right
		CENTERED_CARD_LEFT,								// big
		CENTERED_CARD_LEFT - MEDIUM_CARD_X,				// on left
	],

	LAST: [
		CONTAINER_WIDTH - CARD_WIDTH + SMALL_CARD_X,	// small
		CONTAINER_WIDTH - CARD_WIDTH + MEDIUM_CARD_X,	// medium
		CONTAINER_WIDTH - CARD_WIDTH,					// big
		0												// ...
	]
}

const InfoCard = props => {

	const ThemeStyles = useThemeStyles();
	const { title, text, img_source, active, active_index, animation_duration, item_index, total_amount } = props;

	const LAST_INDEX = total_amount - 1;
	const IS_FIRST_CARD = item_index === 0;
	const IS_LAST_CARD = item_index === LAST_INDEX;
	const IS_MEDIUM_CARD = !IS_FIRST_CARD && !IS_LAST_CARD;

	const FIRST_CARD_ACTIVE = active_index === 0;
	const LAST_CARD_ACTIVE = LAST_INDEX === active_index;

	const CARD_TYPE = IS_FIRST_CARD ? "FIRST" : IS_LAST_CARD ? "LAST" : "MEDIUM";
	const [ left0, left1, left2, left3 ] = CARDS_X[ CARD_TYPE ];	

	const animated_value = useRef( new Animated.Value(0)).current;

	const handleAnimation = value => {
        Animated.timing( animated_value, {
            toValue: value,
            duration: animation_duration || 500,
			useNativeDriver: true,
            easing: Easing.ease
        }).start()
    }

	useEffect(() => {

		let value = 1;

		if ( active ) value = 2;
		else if ( IS_FIRST_CARD && LAST_CARD_ACTIVE ) value = 0;
		else if ( IS_LAST_CARD && FIRST_CARD_ACTIVE ) value = 0;
		else if ( IS_MEDIUM_CARD ) {
			if ( LAST_CARD_ACTIVE && item_index + 1 === LAST_INDEX ) value = 3;
			else if ( FIRST_CARD_ACTIVE && item_index === 1 ) value = 1;
			else value = 4;
		}

		handleAnimation( value );

	}, [ active_index ]);

	return (
		<Animated.View style={[ 
			styles.card,
			{ 
				backgroundColor: ThemeStyles.box_bg,

				zIndex: animated_value.interpolate({
					inputRange: [ 0, 1, 2, 3, 4 ],
					outputRange: [ 7, 8, 9, 8, 0 ],
				}),

				elevation: animated_value.interpolate({
					inputRange: [ 0, 1, 2, 3, 4 ],
					outputRange: [ 2, 3, 4, 3, 0 ]
				}),

			 	transform: [
					{
						translateX: animated_value.interpolate({
							inputRange: [ 0, 1, 2, 3, 4 ],
							outputRange: [ left0, left1, left2, left3, 0 ]
						})
					},
					{
						scale: animated_value.interpolate({
							inputRange: [ 0, 1, 2, 3, 4 ],
							outputRange: [ SMALL_SCALE, MEDIUM_SCALE, 1, MEDIUM_SCALE, 0 ]	
						}),
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
		justifyContent: "center",
		width: CARD_WIDTH,
		height: Layout.height * 0.65,
		maxHeight: 505,
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