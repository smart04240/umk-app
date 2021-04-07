import React, { useState, useLayoutEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native"; 

import useTranslated from "../hooks/useTranslated";
import useThemeStyles from "../hooks/useThemeStyles";
import GeneralStyles from "../constants/GeneralStyles";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Translations from "../constants/Translations";
import Routes from "../constants/Routes";

import Container from "../components/general/Container";
import Main from "../components/general/Main";
import InfoCardsStack from "../components/info-card/InfoCardsStack";

const cards = [
	{
		title: "Witaj!",
		img_source: require("../assets/images/tutorial/1.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		title: "Zbieraj odznaki!",
		img_source: require("../assets/images/tutorial/2.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		title: "Card 3",
		img_source: require("../assets/images/tutorial/1.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	// {
	// 	title: "Card 4",
	// 	img_source: require("../assets/images/tutorial/2.png"),
	// 	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	// },
	// {
	// 	title: "Card 5",
	// 	img_source: require("../assets/images/tutorial/1.png"),
	// 	text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	// }
];

export default function TutorialScreen( props ) {

	const { navigation } = props;
	const ThemeStyles = useThemeStyles();
	const [ card_index, setCardIndex ] = useState( 0 );

	useLayoutEffect(() => {
        props.navigation.setOptions({ 
			headerLeft: () => null,
			headerRight: () => null,
			headerStyle: { backgroundColor: ThemeStyles.main_bg, elevation: 0 },
			headerTitleStyle: { 
				textAlign: "center",
				color: ThemeStyles.blue_text,
				fontSize: 20,
				fontFamily: Fonts.ProximaNova.Regular,
			}
		});
    
	}, [ navigation, ThemeStyles ]);


	const bottom_buttons = [
		{
			label: useTranslated( Translations.SkipIt ),
			onPress: () => navigation.navigate( Routes.Start ),
			style: [
				styles.bottom_button,
				{ color: Colors.BlueRgba(0.5) }
			]
		},
		{
			label: useTranslated( Translations.Next ),
			onPress: card_index + 1 !== cards.length 
				? () => setCardIndex( card_index + 1 )
				: () => navigation.navigate( Routes.Start ),
			style: [ 
				styles.bottom_button,
				{ color: Colors.Blue } 
			]
		}
	];


	return (
		<Main>
			<ScrollView>
				<Container>

					<InfoCardsStack
						cards={ cards } 
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
				</Container>
			</ScrollView>
		</Main>
	)
}

const styles = StyleSheet.create({
	bottom: {
		...GeneralStyles.row_ac, 
		marginTop: 60, 
		marginBottom: 10
	},

	bottom_button: {
		...GeneralStyles.text_regular,
		textDecorationLine: "underline"
	}
})