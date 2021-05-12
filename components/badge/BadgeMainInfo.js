import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Fonts from '../../constants/Fonts';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';

const BadgeMainInfo = props => {

	const ThemeStyles = useThemeStyles();

	const name = "Odkrywca";
	const text_color = { color: ThemeStyles.dark_blue_text };

	const info = [
		{
			heading: "Ile studentów ma odznakę",
			items: [
				{ value: "11%", label: "na kierunku Psychologia" },
				{ value: "28%", label: "na kierunku Filozofia" },

			]
		},
		{
			heading: "Punkty za odznakę",
			items: [
				{ value: "20" }
			]
		}
	]

	return (
		<View style={{ flexGrow: 1, paddingLeft: 20 }}>

			 <Text style={[ styles.font_family, styles.big, text_color, { marginBottom: 19 } ]}>
				{ name }
			</Text>

			
			<View>
				{ info.map(({ heading, items }, index ) => (
					<View key={ index }>
						
						<Text style={[ styles.font_family, styles.small, text_color ]}>
							{ heading }
						</Text>

						{ items && !!items.length &&
							items.map(({ value, label }, index ) => (
								<View key={ index } style={[ GeneralStyles.row_wrap, { alignItems: "flex-end" } ]}>
									<Text style={[ styles.font_family, styles.big, text_color ]}>
										{ value } 
									</Text> 
									<Text style={[ styles.font_family, styles.small, text_color ]}> { label } </Text>
								</View>
							))
							
						}
					</View>
				)) }
			</View> 
		</View>
	)
}

const styles = StyleSheet.create({

	font_family: { fontFamily: Fonts.ProximaNova.Regular },

	big: { fontSize: 20 },

	small: { fontSize: 14 }
});

export default BadgeMainInfo;