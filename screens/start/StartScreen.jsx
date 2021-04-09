import React from "react";
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons  } from '@expo/vector-icons'; 

import useTranslated from "../../hooks/useTranslated";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

import Container from "../../components/general/Container";
import Main from "../../components/general/Main";
import Menu from "../../constants/Menu";

export default function StartScreen(props) {

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
    
	}, [ props.navigation, ThemeStyles ]);


    return (
        <Main>
			<ScrollView>
				<Container>
					<View style={[ 
						GeneralStyles.row_wrap,
						{ justifyContent: "space-between" } 
					]}>
						{ Menu.map(({ screen, label, icon }, index ) => (
							<TouchableOpacity
								key={ index }
								style={ styles.box }
								onPress={ () => props.navigation.navigate( screen )}
							>
								<View style={ styles.circle }>
									<MaterialCommunityIcons
										name={ icon } 
										size={ 30 } 
										color={ Colors.White }
									/>
								</View>

								<Text style={[
									GeneralStyles.text_regular,
									{ 
										color: ThemeStyles.blue_text,
										textAlign: "center" 
									}
								]}> 
									{ useTranslated( label )} 
								</Text>

							</TouchableOpacity>
						))}
					</View>
				</Container>
			</ScrollView>
        </Main>
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
		borderRadius: 81/2,
		marginBottom: 14
	}
})