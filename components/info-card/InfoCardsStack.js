import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Layout from '../../constants/Layout';
import Translations from '../../constants/Translations';
import GeneralStyles from '../../constants/GeneralStyles';

import InfoCard from './InfoCard';
import InfoCardsStackDots from './InfoCardsStackDots';
import useThemeStyles from '../../hooks/useThemeStyles';
import SwipeAbleWrap from '../general/SwipeAbleWrap';
import useTranslator from '../../hooks/useTranslator';

const animation_duration = 500;

const InfoCardsStack = props => {

	const ThemeStyles = useThemeStyles();
	const translate = useTranslator();
	const { cards, onSkipPress, onFinishPress } = props;
	const [ card_index, setCardIndex ] = useState( 0 );

	const toNextCard = () => {
		setCardIndex( card_index + 1 )		
	};

	const toPrevCard = () => {
		setCardIndex( 0 );
	}

	const nextAction = card_index + 1 !== cards.length ? toNextCard : onFinishPress;

	const bottom_buttons = useMemo(() => {	
		return [
			{
				label: translate( Translations.SkipIt ),
				onPress: onSkipPress,
				style: [
					styles.bottom_button,
					{ color: ThemeStyles.blue_rgba(0.5) }
				]
			},
			{
				label: translate( Translations.Next ),
				onPress: nextAction,
				style: [ 
					styles.bottom_button,
					{ color: ThemeStyles.blue_rgba(1) } 
				]
			}
		]
	}, [ translate ]);

	return (
		<View style={{ width: "100%" }}>
			<SwipeAbleWrap 
				style={ styles.stack }
				onSwipeLeft={ nextAction }
			>
				{ !!cards && !!cards.length && 
					cards.map(( card, index ) => 
						<InfoCard 
							key={ index } 
							{...card }
							animation_duration={ animation_duration }
							item_index={ index }
							active_index={ card_index }
							total_amount={ cards.length }
							active={ card_index === index } 
						/> 
					)
				}
			</SwipeAbleWrap>

			<InfoCardsStackDots 
				total_amount={ cards.length } 
				active_index={ card_index } 
			/>

			<View style={ styles.bottom }>
				
				{ bottom_buttons.map(( button, index ) => (
					<TouchableOpacity 
						key={ index }
						style={ index === 1 ? { marginLeft: "auto" } : null }
						onPress={ button.onPress }
					>
						<Text style={ button.style }> 
							{ button.label }
						</Text>
					</TouchableOpacity>
				) )}

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	stack: { width: "100%", height: Layout.height * 0.65 },
	bottom: {
		...GeneralStyles.row_ac, 
		marginTop: 50, 
		marginBottom: 10
	},

	bottom_button: {
		...GeneralStyles.text_regular,
		textDecorationLine: "underline"
	}
})

export default InfoCardsStack;