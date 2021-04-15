import React from "react";
import Routes from "../../constants/Routes";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import Main from "../../components/general/Main";
import InfoCardsStack from "../../components/info-card/InfoCardsStack";
import ScreenWithHeaderTitleOnly from "../../components/layout/ScreenWithHeaderTitleOnly";

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

	const toStartScreen = () => props.navigation.navigate( Routes.Start );

	return (
		<ScreenWithHeaderTitleOnly>
			<Main>
				<ContainerWithScroll>

					<InfoCardsStack 
						cards={ cards }
						onSkipPress={ toStartScreen  }
						onFinishPress={ toStartScreen }
					/>

				</ContainerWithScroll>
			</Main>
		</ScreenWithHeaderTitleOnly>
	)
}

