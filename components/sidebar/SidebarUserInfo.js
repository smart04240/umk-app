import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useSelector } from 'react-redux';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';

const SidebarUserInfo = props => {

    const ThemeStyles = useThemeStyles();

    const user = useSelector( state => state.user );
	const nick_name = "nick_studenta123";
	const avatar = require("../../assets/images/avatar.jpg");

	return (
		<View style={[ GeneralStyles.row_ac, { flexShrink: 1 } ]}>

			<View style={ styles.avatar_box }>
				<ImageBackground style={ styles.avatar } source={ avatar } />
			</View>

			<View>	
				<Text style={[ GeneralStyles.text_regular, ThemeStyles.dark_blue_text, { fontSize: 18 } ]}> { nick_name } </Text>
				<TouchableOpacity onPress={ () => console.log('edit profile')}>
					<Text style={[ GeneralStyles.text_regular, ThemeStyles.blue_text ]}> { useTranslated( Translations.EditProfile )} </Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	avatar: {
		width: 77,
		height: 77,
		resizeMode: "cover",
	},

	avatar_box: {
		width: 77,
		height: 77,
		borderRadius: 77,
		marginRight: 11,
		overflow: "hidden"
	}
})


export default SidebarUserInfo;