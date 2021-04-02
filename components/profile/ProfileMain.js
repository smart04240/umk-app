import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import Layout from "../../constants/Layout";
import Routes from "../../constants/Routes";

import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';
import Button from '../form/Button';
import TopBox from '../general/TopBox';
import ProfileAvatar from './ProfileAvatar';
import ProfileMainInfo from './ProfileMainInfo';

const ProfileMain = props => {

	const navigation = useNavigation();
    const ThemeStyles = useThemeStyles();
	
	const { active_tab, tabClick } = props;
	const avatar_size = Math.floor( Layout.width * 0.308 );

	const tabs = [ 
		useTranslated( Translations.Information ), 
		useTranslated( Translations.Statistics ), 
		useTranslated( Translations.Badges ) 
	];


	return (
		<TopBox>
			
			<View style={{ flexDirection: "row", marginBottom: 18 }}>
				
				<View style={{ marinRight: 10 }}>
					<ProfileAvatar size={ avatar_size > 132 ? 132 : avatar_size }/>
				</View>

				<ProfileMainInfo />
			</View>

			<Button onPress={ () => navigation.navigate( Routes.ProfileEdit )} transparent_bg={ true }>
				{ useTranslated( Translations.EditProfile )}
			</Button>
			

			<View style={[ GeneralStyles.row_center_between, { marginTop: 19 } ]}>
				{ tabs.map(( text, index ) => {
				
					const text_color = index === active_tab ? ThemeStyles.blue_text : ThemeStyles.blue_rgba(0.5); 
					const text_font = index === active_tab ? GeneralStyles.text_bold : GeneralStyles.text_regular;
				
					return (
						<TouchableOpacity key={ index } onPress={ () => tabClick( index )}>
							<Text style={[ text_font, { color: text_color, textTransform: "uppercase" } ]}>
								{ text }
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</TopBox>
	)
}


export default ProfileMain;