import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import UniversityLogo from "../components/UniversityLogo";
import LocaleSwitcher from "../components/locale/LocaleSwitcher";
import GeneralStyles from "../constants/GeneralStyles"
import Colors from "../constants/Colors";
import Container from "../components/general/Container";
import useTranslated from "../hooks/useTranslated";
import Translations from "../constants/Translations";

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
					<Text style={[ ThemeStyles.blue_text,  GeneralStyles.text_regular, { fontSize: 20, textAlign: "center" }]}> 
						{ useTranslated( Translations.SignIn )} 
					</Text> 
				</TouchableOpacity>

				<TouchableOpacity style={[ styles.button ]}> 
					<Text style={[ ThemeStyles.blue_text, GeneralStyles.text_semibold, { textAlign: "center" } ]}>
						{ useTranslated( Translations.LoginInUsingNCU )}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={ () => props.navigation.navigate("registration") } style={[ GeneralStyles.row_centered ]}>
					<Text style={[ GeneralStyles.text_regular ]}> 
						{ useTranslated( Translations.IfYouDontHaveAcc )}
					</Text>
					<Text style={[ ThemeStyles.blue_text, GeneralStyles.text_regular, { textDecorationLine: "underline" } ]}> 
						{ useTranslated( Translations.Register )} 
					</Text>
				</TouchableOpacity>
			</Container>
        </View>
    );
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.Orange,
		paddingVertical: 17,
		paddingHorizontal: 15,
		borderRadius: 15,
		marginTop: 30,
		marginBottom: 45
	}
})