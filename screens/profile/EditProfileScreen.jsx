import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";

import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import Routes from "../../constants/Routes";

import TopBox from "../../components/general/TopBox";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import useTranslator from "../../hooks/useTranslator";

export default function EditProfileScreen(props) {
	const translate = useTranslator();
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
						{ translate( Translations.EditAvatar )}
					</Text>
				</TouchableOpacity>	
			</TopBox> 

			<ContainerWithScroll>
				<Input
					style={{marginBottom: 20}}
					label={translate(Translations.ChangeYouNick)}
					defaultValue={nick_name}
				/>

				<View style={{ marginTop: 50 }}>
					<Button onPress={ () => navigation.navigate( Routes.ProfileEvents )} transparent_bg={ true }>
						{ translate( Translations.YourEvents )}
					</Button>

					<Button>
						{ translate( Translations.SaveChanges )}
					</Button>

					<TouchableOpacity>
						<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.blue_text } ]}>
							{ translate( Translations.DeleteAccount )}
						</Text>
					</TouchableOpacity>
				</View>
			</ContainerWithScroll>
		</MainWithNavigation>
    );
};