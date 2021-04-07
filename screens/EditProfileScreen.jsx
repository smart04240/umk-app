import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/core";

import useThemeStyles from "../hooks/useThemeStyles";
import useTranslated from "../hooks/useTranslated";
import GeneralStyles from "../constants/GeneralStyles";
import Translations from "../constants/Translations";
import Routes from "../constants/Routes";

import TopBox from "../components/general/TopBox";
import Container from "../components/general/Container";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import Input from "../components/form/Input";
import {useSelector} from "react-redux";
import Button from "../components/form/Button";
import MainWithNavigation from "../components/general/MainWithNavigation";

export default function EditProfileScreen(props) {

    const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
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
						style={{marginBottom: 20}}
						label={useTranslated(Translations.ChangeYouNick)}
						defaultValue={nick_name}
					/>

					<View style={{ marginTop: 50 }}>
						<Button onPress={ () => navigation.navigate( Routes.ProfileEvents )} transparent_bg={ true }>
							{ useTranslated( Translations.YourEvents )}
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