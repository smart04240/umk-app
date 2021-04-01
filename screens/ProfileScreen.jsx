import React from "react";
import { Text, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import GeneralStyles from "../constants/GeneralStyles";

import ProfileMain from "../components/profile/ProfileMain";
import Container from "../components/general/Container";

export default function ProfileScreen(props) {

	const [ active_tab, setActiveTab ] = React.useState( 0 );
    const ThemeStyles = useThemeStyles();

    return (
		<View style={{ backgroundColor: ThemeStyles.main_bg, flex: 1 }}>
			
			<ProfileMain 
				active_tab={ active_tab }
				tabClick= { index => setActiveTab( index )}
			/>

			<Container>
				<ScrollView>
					<Text> 
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae corporis, odit magni fugit odio quis alias nostrum, praesentium cumque neque expedita iusto saepe amet distinctio vitae adipisci, nihil porro ad.

						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio cumque ratione veniam expedita tempora cum error quod est maxime. Impedit architecto nulla sapiente excepturi nisi magnam quis tempore soluta nostrum. 
					</Text>

					<Text> 
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae corporis, odit magni fugit odio quis alias nostrum, praesentium cumque neque expedita iusto saepe amet distinctio vitae adipisci, nihil porro ad.

						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio cumque ratione veniam expedita tempora cum error quod est maxime. Impedit architecto nulla sapiente excepturi nisi magnam quis tempore soluta nostrum. 
					</Text>
				</ScrollView>
			</Container>
		</View>
    );
};

const styles = StyleSheet.create({
})