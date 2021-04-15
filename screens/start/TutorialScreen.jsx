import React from "react";

import useThemeStyles from "../../hooks/useThemeStyles";
import Fonts from "../../constants/Fonts";
import Routes from "../../constants/Routes";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import Main from "../../components/general/Main";
import InfoCardsStack from "../../components/info-card/InfoCardsStack";

const cards = [
	{
		title: "Witaj!",
		img_source: require("../../assets/images/tutorial/1.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		title: "Zbieraj odznaki!",
		img_source: require("../../assets/images/tutorial/2.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		title: "Card 3",
		img_source: require("../../assets/images/tutorial/1.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		title: "Card 4",
		img_source: require("../../assets/images/tutorial/2.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
	{
		title: "Card 5",
		img_source: require("../../assets/images/tutorial/1.png"),
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	}
];

export default function TutorialScreen( props ) {

	const { navigation } = props;
	const ThemeStyles = useThemeStyles();

	React.useLayoutEffect(() => {
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


	const toStartScreen = () => navigation.navigate( Routes.Start );

	return (
		<Main>
			<ContainerWithScroll>

				<InfoCardsStack 
					cards={ cards }
					onSkipPress={ toStartScreen  }
					onFinishPress={ toStartScreen }
				/>

			</ContainerWithScroll>
		</Main>
	)
}

