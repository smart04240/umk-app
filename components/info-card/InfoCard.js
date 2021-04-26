import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, View, Text, StyleSheet, Image, Easing  } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Layout from '../../constants/Layout';
import useThemeStyles from '../../hooks/useThemeStyles';

const MEDIUM_SCALE = 0.9;

const CONTAINER_WIDTH = Layout.width - ( Layout.paddingHorizontal * 2 );
const CARD_WIDTH = Math.round( CONTAINER_WIDTH * 0.866 );
const MEDIUM_CARD_WIDTH = Math.round( CARD_WIDTH * MEDIUM_SCALE );

const MEDIUM_CARD_X = ( CARD_WIDTH - MEDIUM_CARD_WIDTH ) / 2;
const CENTERED_CARD_LEFT = ( CONTAINER_WIDTH - CARD_WIDTH ) / 2;


const CARD_OPTIONS = {
	"FIRST": {
		inputRange: [
			0, // hidden on left
			1, // medium on left
			2  // big first
		],

		scale_output: [ 0.5, MEDIUM_SCALE, 1 ],
		elevation_output: [ 0, 3, 4 ],
		zIndex_output: [ 0, 1, 3 ],

		translateX_output: [
			0 - MEDIUM_CARD_X,
			0 - MEDIUM_CARD_X,
			CENTERED_CARD_LEFT,
		]
	},

	"MEDIUM": {
		inputRange: [
			0, // hidden on left
			1, // medium on left
			2, // center
			3, // medium on right
			4, // hidden on right
		],

		scale_output: [ 0.5, MEDIUM_SCALE, 1, MEDIUM_SCALE, 0.5 ],
		elevation_output: [ 0, 3, 4, 3, 0 ],
		zIndex_output: [ 0, 1, 3, 1, 0 ],

		translateX_output: [
			0 - MEDIUM_CARD_X,
			0 - MEDIUM_CARD_X,
			CENTERED_CARD_LEFT,
			CONTAINER_WIDTH - CARD_WIDTH + MEDIUM_CARD_X,
			CONTAINER_WIDTH - CARD_WIDTH + MEDIUM_CARD_X
		]
	},

	"LAST": {
		inputRange: [
			0, // hidden on right
			1, // medium on right
			2, // big last
		],

		scale_output: [ 0.5, MEDIUM_SCALE, 1 ],
		elevation_output: [ 0, 3, 4 ],
		zIndex_output: [ 0, 1, 3 ],

		translateX_output: [
			CONTAINER_WIDTH - CARD_WIDTH + MEDIUM_CARD_X,
			CONTAINER_WIDTH - CARD_WIDTH + MEDIUM_CARD_X,
			CENTERED_CARD_LEFT
		]
	}
}

const InfoCard = props => {

	const ThemeStyles = useThemeStyles();
	const { title, text, img_source, active, active_index, animation_duration, item_index, last_card_index } = props;

	const card_type = useMemo(() => (
		item_index === 0
			? "FIRST"
			: item_index === last_card_index ? "LAST": "MEDIUM"
	), []);

	const card_options = useMemo(() => card_type ? CARD_OPTIONS[ card_type ] : {}, [ card_type ]);
	const { inputRange, translateX_output, zIndex_output, elevation_output, scale_output } = card_options;

	const FIRST_CARD_ACTIVE = active_index === 0;
	const LAST_CARD_ACTIVE = last_card_index === active_index;

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

		let value;

		switch ( card_type ) {
			case "FIRST":
				value = FIRST_CARD_ACTIVE
					? 2
					: 2 - active_index <= 0 ? 0 : 2 - active_index
			break;

			case "MEDIUM":

				if ( active_index === item_index ) {
					value = 2;
				} else {

					const difference = Math.abs( item_index - active_index );
					if ( active_index > item_index ) {
						value = 2 - difference <= 0 ? 0 : 2 - difference;
					} else {
						value = 2 + difference >= 4 ? 4 : 2 + difference
					}
				}

			break;

			case "LAST":
				value = LAST_CARD_ACTIVE
					? 2
					: active_index + 1 === last_card_index ? 1 : 0
			break;
		}

		handleAnimation( value );

	}, [ active_index ]);


	if ( !card_type ) return null;

	return (
		<Animated.View style={[
			styles.card,
			{
				backgroundColor: ThemeStyles.box_bg,

				zIndex: animated_value.interpolate({
					inputRange,
					outputRange: zIndex_output,
				}),

				elevation: animated_value.interpolate({
					inputRange,
					outputRange: elevation_output
				}),

			 	transform: [
					{
						translateX: animated_value.interpolate({
							inputRange,
							outputRange: translateX_output
						})
					},
					{
						scale: animated_value.interpolate({
							inputRange,
							outputRange: scale_output
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
		paddingTop: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
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
