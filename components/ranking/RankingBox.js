import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslated from '../../hooks/useTranslated';
import RoundedImage from '../general/RoundedImage';
import shadowGenerator from "../../helpers/shadowGenerator";

const RankingBox = props => {
	const ThemeStyles = useThemeStyles();
	const { number, avatar_source, user_nickname, badges, points } = props;

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
			]}>{ number }</Text>

			{ avatar_source &&
				<RoundedImage
					size={ 55 }
					box_style={{ marginLeft: 5 }}
					img_source={ avatar_source }
				/>
			}

			<View>
				<Text style={ dark_blue_regular }>{ user_nickname }</Text>

				{ badges &&
					<Text style={[
						GeneralStyles.text_regular,
						{ color: ThemeStyles.dark_blue_rgba(0.5), fontSize: 14 }
					]}>
						{ badges } { useTranslated( Translations.Num__Badges )}
					</Text>
				}
			</View>


			{ points &&
				<View style={{ marginLeft: "auto", justifyContent: "center" }}>
					<Text style={ num_style }>{ points }</Text>
					<Text style={[
						dark_blue_regular,
						{ fontSize: 11 }
					]}>{ useTranslated( Translations.Num__Points )}</Text>
				</View>
			}
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
