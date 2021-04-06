import React from "react";
import { View, ScrollView, Text } from "react-native";

import Container from "../components/general/Container";
import MainWithNavigation from "../components/general/MainWithNavigation";

const ProfileEventsScreen = props => {

	React.useLayoutEffect(() => {
        props.navigation.setOptions({
			headerStyle: { 
				elevation: 5, 
				borderBottomLeftRadius: 20, 
				borderBottomRightRadius: 20, 
			}
		});
    }, [ props.navigation ]);

	const options = [
		{ label: "Urlop okolicznościowy długoterminowy", value: 1 },
		{ label: "Urlop zdrowotny", value: 2 },
		{ label: "Urlop rodzicielski", value: 3 },
		{ label: "Urlop sportowy", value: 4 },
		{ label: "Powtarzanie roku", value: 5 },
		{ label: "Skreślenie z listy studentów", value: 6 },
		{ label: "Wznowienie studiów", value: 7 }
	]

	return (
		<MainWithNavigation>
			<Container>
				<ScrollView>
					
					

				</ScrollView>
			</Container>
		</MainWithNavigation>
	)
}

export default ProfileEventsScreen;