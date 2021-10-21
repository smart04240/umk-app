import React from 'react';
import { Image, View, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import Fonts from '../../constants/Fonts';
import LocaleSwitcher from './LocaleSwitcher';
import Layout, {unibrowIOSDevices} from '../../constants/Layout';

const flags = {
	"en": require("../../assets/images/flags/pl.png"),
	"pl": require("../../assets/images/flags/en.png")
}

const LocaleSwitcherBox = () => {
	const locale = useSelector( state => state.app.locale );
    const ThemeStyles = useThemeStyles();
	const topOffset = unibrowIOSDevices && {paddingTop: 50};

	return (
		<View style={[ { backgroundColor: ThemeStyles.box_bg }, GeneralStyles.row_ac, styles.box, topOffset]}>
			<LocaleSwitcher/>
			<Image style={ styles.img } source={ flags[ locale ] }/>
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		paddingHorizontal: Layout.paddingHorizontal,
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


export default LocaleSwitcherBox;
