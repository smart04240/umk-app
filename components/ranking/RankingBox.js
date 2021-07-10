import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';
import RoundedImage from '../general/RoundedImage';
import shadowGenerator from "../../helpers/shadowGenerator";
import useTranslator from "../../hooks/useTranslator";

const RankingBox = props => {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const { id, number, avatar, nick_name, badges_count, points } = props;
	const user = useSelector(state => state.user);
	const sampleAvatar = require("../../assets/images/avatar.jpg");
	const dark_blue_regular = {
		...GeneralStyles.text_regular,
		color: ThemeStyles.dark_blue_text,
	}

	const num_style = {
		...dark_blue_regular,
		fontSize: 28
	};

	return (
		<View style={[
			GeneralStyles.row_ac,
			{ backgroundColor: ThemeStyles.box_bg },
			styles.box,
			props.box_style || {}
		]}>

			<Text style={[
				num_style,
				{ marginRight: 12 }
			]}>{number}</Text>

			{/* { avatar && */}
			<RoundedImage
				size={55}
				box_style={{ marginLeft: 5 }}
				img_source={avatar ? avatar : sampleAvatar}
			/>
			{/* } */}

			<View>
				<Text style={dark_blue_regular}>
					{nick_name} {user.id === id ? ' (You)' : ''}
				</Text>

				<Text style={[
					GeneralStyles.text_regular,
					{ color: ThemeStyles.dark_blue_rgba(0.5), fontSize: 14 }
				]}>
					{badges_count ? badges_count : 0} {translate(Translations.Num__Badges)}
				</Text>
			</View>


			<View style={{ marginLeft: "auto", justifyContent: "center" }}>
				<Text style={num_style}>{ points ? points : 0 }</Text>
				<Text style={[
					dark_blue_regular,
					{ fontSize: 11 }
				]}>{translate(Translations.Num__Points)}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	box: {
		width: "100%",
		...shadowGenerator(1),
		borderRadius: 15,
		marginBottom: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
	}
})


export default RankingBox;
