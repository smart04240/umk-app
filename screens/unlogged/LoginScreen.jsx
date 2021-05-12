import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Colors from "../../constants/Colors";

import UniversityLogo from "../../components/UniversityLogo";
import LocaleSwitcherBox from "../../components/locale/LocaleSwitcherBox";
import Container from "../../components/general/Container";
import Translations from "../../constants/Translations";
import Main from "../../components/general/Main";
import Routes from "../../constants/Routes";
import ScreenWithHiddenHeader from "../../components/layout/ScreenWithHiddenHeader";
import API from "../../helpers/API";
import {useDispatch} from "react-redux";
import Actions from "../../redux/Actions";
import useTranslator from "../../hooks/useTranslator";

export default function LoginScreen(props) {
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();
    const translate = useTranslator();
	const blue_text = { color: ThemeStyles.blue_text };

	const login = () => API.post('/auth/login').then(result => dispatch(Actions.User.Login(result.data.data)));

    return (
		<ScreenWithHiddenHeader>
			<Main>
				<LocaleSwitcherBox/>

				<Container>
					<UniversityLogo/>

					<TouchableOpacity style={{ width: "100%" }} onPress={login}>
						<Text style={[ blue_text,  GeneralStyles.text_regular, { fontSize: 20, textAlign: "center" }]}> 
							{ translate( Translations.SignIn )}
						</Text> 
					</TouchableOpacity>

					<TouchableOpacity style={[ styles.button ]} onPress={login}>
						<Text style={[ blue_text, GeneralStyles.text_semibold, { textAlign: "center" } ]}>
							{ translate( Translations.LoginInUsingNCU )}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={ () => props.navigation.navigate( Routes.Registration )} style={[ GeneralStyles.row_centered ]}>
						<Text style={[ { color: ThemeStyles.dark_text }, GeneralStyles.text_regular ]}> 
							{ translate( Translations.IfYouDontHaveAcc )}
						</Text>
						<Text style={[ blue_text, GeneralStyles.text_regular, { textDecorationLine: "underline" } ]}> 
							{ translate( Translations.Register )}
						</Text>
					</TouchableOpacity>
				</Container>
			</Main>
		</ScreenWithHiddenHeader>
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
