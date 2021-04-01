import React from "react";
import { Text, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import useTranslated from "../hooks/useTranslated";
import GeneralStyles from "../constants/GeneralStyles"
import Colors from "../constants/Colors";
import { ucfirst } from "../helpers/functions";

import UniversityLogo from "../components/UniversityLogo";
import Container from "../components/general/Container";
import Input from "../components/form/Input";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";
import Translations from "../constants/Translations";


export default function LoginScreen(props) {

    const ThemeStyles = useThemeStyles();

	React.useLayoutEffect(() => {
        props.navigation.setOptions({ 
			headerLeft: () => null,
			headerRight: () => null,
			headerTitle: '',
			headerStyle: { height: 25 }
		});
    }, [ props.navigation ]);


	const checkboxes = [
		{ 
			name: "regulations",
			label: useTranslated( Translations.RegCheckboxLabel1 ),
			warning: useTranslated( Translations.RegCheckboxWarning1 ),
			required: true
		},
		{ 
			name: "personal_data",
			label: useTranslated( Translations.RegCheckboxLabel2 ),
			required: true
		},
		{ 
			name: "lorem",
			label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	]

    return (
		<View style={{ backgroundColor: ThemeStyles.main_bg, flex: 1 }}>
			<ScrollView>
				<Container>
					<UniversityLogo/>

					<Text style={[ styles.text, { color: ThemeStyles.dark_text } ]}>
						{ useTranslated( Translations.RegText1 )}
					</Text>

					<Text style={[ styles.text, { color: ThemeStyles.dark_text } ]}>
						{ useTranslated( Translations.RegText2 )}
					</Text>

					<Input 
						label={ useTranslated( Translations.EnterNickname )}
						placeholder={ useTranslated( Translations.UserName )}
					/>

					<View style={ styles.checkboxes_container }>
						{ checkboxes.map( checkbox => <Checkbox key={ checkbox.name } {...checkbox } /> )}
					</View>


					<Button> { ucfirst( useTranslated( Translations.Register ))} </Button>

					<TouchableOpacity onPress={ () => props.navigation.navigate("login") }> 
						<Text style={[ { color: ThemeStyles.blue_text }, styles.back ]}>
							{ useTranslated( Translations.Cancel )}
						</Text> 
					</TouchableOpacity>
				</Container>
			</ScrollView>
		</View>
    );
};

const styles = StyleSheet.create({
	text: { ...GeneralStyles.text_regular, textAlign: "center", marginBottom: 28 },
	back: { ...GeneralStyles.text_regular, textAlign: "right", textDecorationLine: "underline" },
	checkboxes_container: {
		marginTop: 30,
		marginBottom: 50,
		maxWidth: "100%",
		width: "100%"
	}
})