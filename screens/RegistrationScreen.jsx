import React from "react";
import { Text, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import GeneralStyles from "../constants/GeneralStyles"
import Colors from "../constants/Colors";

import UniversityLogo from "../components/UniversityLogo";
import Container from "../components/general/Container";
import Input from "../components/form/Input";
import Checkbox from "../components/form/Checkbox";
import Button from "../components/form/Button";


const checkboxes = [
	{ 
		name: "regulations",
		label: "Oświadczam, iż zapoznałem się z treścią Regulaminu.",
		warning: "Zaakceptowanie powyższej zgody jest obowiązkowe podczas rejestracji w aplikacji!",
		required: true
	},
	{ 
		name: "personal_data",
		label: "Zgoda na przetwarzanie danych osobowych adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea commodo consequat.",
		required: true
	},
	{ 
		name: "lorem",
		label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
]

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

    return (
		<View style={[ ThemeStyles.bg, { flex: 1 }]}>
			<ScrollView>
				<Container>
					<UniversityLogo/>

					<Text style={[ styles.text, ThemeStyles.dark_text ]}>
						Rejestracja możliwa tylko dla studentów {`\n`}
						Wydziału Filozofii i Nauk Społecznych
						Uniwersytetu Mikołaja Kopernika w Toruniu
					</Text>

					<Text style={[ styles.text, ThemeStyles.dark_text ]}>
						W celu zarejestrowania podaj swój nick
						i zaakceptuj zgody.
					</Text>

					<Input 
						label="Podaj swój nick"
						placeholder="Nazwa użytkownika"
					/>

					<View style={ styles.checkboxes_container }>
						{ checkboxes.map( checkbox => <Checkbox key={ checkbox.name } {...checkbox } /> )}
					</View>


					<Button> Zarejestruj się </Button>

					<TouchableOpacity onPress={ () => props.navigation.navigate("login") }> 
						<Text style={ styles.back }> Anuluj </Text> 
					</TouchableOpacity>
				</Container>
			</ScrollView>
		</View>
    );
};

const styles = StyleSheet.create({
	text: { ...GeneralStyles.text_regular, textAlign: "center", marginBottom: 28 },
	back: { ...GeneralStyles.text_regular, color: Colors.Blue, textAlign: "right", textDecorationLine: "underline" },
	checkboxes_container: {
		marginTop: 30,
		marginBottom: 50,
		maxWidth: "100%",
		width: "100%"
	}
})