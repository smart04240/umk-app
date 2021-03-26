import React from 'react';
import { Image, Text, Switch, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import Actions from "../../redux/Actions";
import Colors from "../../constants/Colors";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslated from "../../hooks/useTranslated";
import Translations from '../../constants/Translations';
import Fonts from '../../constants/Fonts';

const flags = {
	"en": require("../../assets/images/flags/pl.png"),
	"pl": require("../../assets/images/flags/en.png")
}

const LocaleSwitcher = () => {

	const dispatch = useDispatch();
	const locale = useSelector( state => state.locale );
    const ThemeStyles = useThemeStyles();

	return (
		<View style={[ ThemeStyles.box, GeneralStyles.row_ac, styles.box ]}>
			<Switch 
				trackColor={{ false: "#D0DCEA", true: "#D0DCEA" }}
				thumbColor={ Colors.Blue }
				onValueChange={ () => dispatch( Actions.Locale.Toggle()) }
        		value={ locale === "en" }
			/>

			<Text style={[ ThemeStyles.text, styles.text ]}> 
				{ useTranslated( Translations.switchLanguage )} 
			</Text>

			<Image style={ styles.img } source={ flags[ locale ] }/>
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		paddingHorizontal: 22,
		paddingTop: 35,
		paddingBottom: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,

		shadowColor: "#002753",
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 6,
	},

	text: { fontFamily: Fonts.ProximaNova.Regular, fontSize: 16, marginHorizontal: 5 },

	img: { marginLeft: "auto" }
})


export default LocaleSwitcher;