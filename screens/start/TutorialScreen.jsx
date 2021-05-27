import React from "react";
import Routes from "../../constants/Routes";
import Container from "../../components/general/Container";
import Main from "../../components/general/Main";
import InfoCardsStack from "../../components/info-card/InfoCardsStack";
import ScreenWithHeaderTitleOnly from "../../components/layout/ScreenWithHeaderTitleOnly";
import {useDispatch} from "react-redux";
import Actions from "../../redux/Actions";

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

export default function TutorialScreen(props) {
	const dispatch = useDispatch();

	const toStartScreen = () => {
		// remove Tutorial screen from history so that user could not go back to it
		props.navigation.reset({index: 0, routes: [{name: Routes.Start}]});
		dispatch(Actions.Tutorial.Passed());
	};

	return (
		<ScreenWithHeaderTitleOnly>
			<Main>
				<Container>
					<InfoCardsStack
						cards={cards}
						onSkipPress={toStartScreen}
						onFinishPress={toStartScreen}
					/>
				</Container>
			</Main>
		</ScreenWithHeaderTitleOnly>
	)
}

