import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View} from "react-native";

import { ucfirst } from "../../helpers/functions";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";

import UniversityLogo from "../../components/UniversityLogo";
import Input from "../../components/form/Input";
import Checkbox from "../../components/form/Checkbox";
import Button from "../../components/form/Button";
import Main from "../../components/general/Main";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import ScreenWithHiddenHeader from "../../components/layout/ScreenWithHiddenHeader";
import useTranslator from "../../hooks/useTranslator";
import API from "../../helpers/API";
import { useDispatch } from "react-redux";
import Actions from "../../redux/Actions";


export default function RegistrationScreen(props) {
	const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
    const dispatch = useDispatch();

	const [nick, setNick] = useState('');

	const checkboxes = [
		{ 
			name: "regulations",
			label: translate( Translations.RegCheckboxLabel1 ),
			warning: translate( Translations.RegCheckboxWarning1 ),
			required: true
		},
		{ 
			name: "personal_data",
			label: translate( Translations.RegCheckboxLabel2 ),
			required: true
		},
		{ 
			name: "lorem",
			label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	]

	const register = () => {
		API.user.update({
			nick: nick,
		}).then(result => props.navigation.navigate( Routes.Start ));
	};

	const cancelRegister = () => {
		dispatch(Actions.User.Logout());
	};

    return (
		<ScreenWithHiddenHeader>
			<Main style={{ paddingTop: 25 }}>
				<ContainerWithScroll>
					<UniversityLogo/>

					<Text style={[styles.text, {color: ThemeStyles.dark_text}]}>
						{translate(Translations.RegText1)}
					</Text>

					<Text style={[styles.text, {color: ThemeStyles.dark_text}]}>
						{translate(Translations.RegText2)}
					</Text>

					<Input
						style={{marginBottom: 20}}
						label={translate(Translations.EnterNickname)}
						placeholder={translate(Translations.UserName)}
						onChangeText={text => setNick(text)}
					/>

					<View style={styles.checkboxes_container}>
						{checkboxes.map(checkbox => <Checkbox key={checkbox.name} {...checkbox} />)}
					</View>


					<Button onPress={register}> { ucfirst( translate( Translations.Register ))} </Button>

					<TouchableOpacity onPress={cancelRegister}> 
						<Text style={[ { color: ThemeStyles.blue_text }, styles.back ]}>
							{ translate( Translations.Cancel )}
						</Text> 
					</TouchableOpacity>
				</ContainerWithScroll>
			</Main>
		</ScreenWithHiddenHeader>
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