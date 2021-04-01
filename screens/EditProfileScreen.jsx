import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import useThemeStyles from "../hooks/useThemeStyles";
import useTranslated from "../hooks/useTranslated";
import GeneralStyles from "../constants/GeneralStyles";
import Translations from "../constants/Translations";

import TopBox from "../components/general/TopBox";
import Container from "../components/general/Container";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Input from "../components/form/Input";
import { useSelector } from "react-redux";
import Button from "../components/form/Button";
import MainWithNavigation from "../components/general/MainWithNavigation";

export default function EditProfileScreen(props) {

    const ThemeStyles = useThemeStyles();
	const user = useSelector( state => state );

	const nick_name = "nick_studenta123";

    return (
		<MainWithNavigation>
			
			<TopBox style={{ alignItems: "center" }}>
				<ProfileAvatar size={ 132 }/>
				
				<TouchableOpacity>
					<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.blue_text, marginTop: 20 } ]}> 
						{ useTranslated( Translations.EditAvatar )} 
					</Text>
				</TouchableOpacity>	
			</TopBox> 

			<Container>
				<ScrollView>
					<Input
						label={ useTranslated( Translations.ChangeYouNick )}
						defaultValue={ nick_name }
					/>

					<View style={{ marginTop: 50 }}>
						<Button transparent_bg={ true }>
							{ useTranslated( Translations.AddRandomEvent )}
						</Button>

						<Button>
							{ useTranslated( Translations.SaveChanges )}
						</Button>

						<TouchableOpacity>
							<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.blue_text } ]}>
								{ useTranslated( Translations.DeleteAccount )}
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</Container>
		</MainWithNavigation>
    );
};