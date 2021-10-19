import React from "react";
import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Colors from "../../constants/Colors";
import Menu from "../../constants/Menu";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import Main from "../../components/general/Main";
import ScreenWithHeaderTitleOnly from "../../components/layout/ScreenWithHeaderTitleOnly";
import useTranslator from "../../hooks/useTranslator";

export default function StartScreen(props) {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();

	return (
		<ScreenWithHeaderTitleOnly>
			<Main>
				<ContainerWithScroll>
					<View style={[
						GeneralStyles.row_wrap,
						{justifyContent: "space-between"}
					]}>
						{Menu.map(({screen, label, icon, link}, index) => (
							<TouchableOpacity
								key={index}
								style={styles.box}
								onPress={!!link ? () => Linking.openURL(link) : () => props.navigation.navigate(screen)}
							>
								<View style={styles.circle}>
									<MaterialCommunityIcons
										name={icon}
										size={30}
										color={Colors.White}
									/>
								</View>

								<Text style={[
									GeneralStyles.text_regular,
									{
										color: ThemeStyles.blue_text,
										textAlign: "center"
									}
								]}>
									{translate(label)}
								</Text>

							</TouchableOpacity>
						))}
					</View>
				</ContainerWithScroll>
			</Main>
		</ScreenWithHeaderTitleOnly>
	);
};

const styles = StyleSheet.create({
	box: {
		alignItems: "center",
		marginBottom: 40,
		width: "33.33%"
	},
	circle: {
		...GeneralStyles.row_centered,
		backgroundColor: Colors.Blue,
		width: 81,
		height: 81,
		borderRadius: 81 / 2,
		marginBottom: 14
	}
})
