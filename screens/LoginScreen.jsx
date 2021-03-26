import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import UniversityLogo from "../components/UniversityLogo";
import LocaleSwitcher from "../components/locale/LocaleSwitcher";
import GeneralStyles from "../constants/GeneralStyles"
import Colors from "../constants/Colors";
import Container from "../components/general/Container";
import Fonts from "../constants/Fonts";

export default function LoginScreen(props) {

    const ThemeStyles = useThemeStyles();

	React.useLayoutEffect(() => {
        props.navigation.setOptions({ 
			headerLeft: () => null,
			headerRight: () => null,
			headerTitle: '',
			headerStyle: { height: 0 }
		});
    }, [ props.navigation ]);

    return (
        <View style={[ ThemeStyles.bg, { flex: 1 }]}>
            <LocaleSwitcher/>

			<Container>
				<UniversityLogo/>

				<TouchableOpacity style={{ width: "100%" }}> 
					<Text style={[ ThemeStyles.blue_text, { fontSize: 20, textAlign: "center" }]}> Zaloguj się </Text> 
				</TouchableOpacity>

				<TouchableOpacity style={[ GeneralStyles.flex_centered, styles.button ]}> 
					<Text style={[ ThemeStyles.blue_text, styles.bold_text ]}> Logowanie za pomocą</Text>
					<Text style={[ ThemeStyles.blue_text, styles.bold_text ]}> Centralnego Punktu Logowania UMK </Text>
				</TouchableOpacity>

				<TouchableOpacity style={[ GeneralStyles.row_centered ]}>
					<Text style={[ styles.text ]}> Jeśli nie masz konta - </Text>
					<Text style={[ ThemeStyles.blue_text, styles.text, { textDecorationLine: "underline" } ]}> zarejestruj się </Text>
				</TouchableOpacity>
			</Container>
        </View>
    );
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.Orange,
		padding: 17,
		borderRadius: 15,
		marginTop: 30,
		marginBottom: 45
	},

	bold_text: { fontFamily: Fonts.ProximaNova.SemiBold, fontSize: 16 },
	text: { fontFamily: Fonts.ProximaNova.Regular, fontSize: 16 }
})