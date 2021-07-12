import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import API from '../../helpers/API';
import Fonts from '../../constants/Fonts';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslator from '../../hooks/useTranslator';

const BadgeMainInfo = props => {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const badge = useSelector(state => state.badges.selected);
	const text_color = { color: ThemeStyles.dark_blue_text };
	const [info, setInfo] = useState([
		{
			heading: 'Ile studentów ma odznakę',
			item: { value: ``, label: '' },
		},
		{
			heading: 'Punkty za odznakę',
			item: { value: `${badge?.points}` }
		}
	]);
	useEffect(() => {
		let facultyUSOS = null;
		// badge?.conditions.forEach(condition => {
		// 	if(condition.condition_id === 1) {
		// 		facultyUSOS = condition.value;
		// 		return;
		// 	}
		// });

		if(!facultyUSOS) {
			setInfo(prev => {
				let _prev = [...prev];
				_prev[0].item = { label: `na kierunku`, value: `100%` };
				return _prev;
			});
			return;
		}

		// API.badges.getEarnedPercentage(facultyUSOS, badge.id).then(response => {
		// 	let data = response.data.data;
		// 	setInfo(prev => {
		// 		let _prev = [...prev];
		// 		_prev[0].item = { label: `na kierunku ${data.name}`, value: `${data.value}%` };
		// 		return _prev;
		// 	});
		// });
	}, []);

	return (
		<View style={{ flexGrow: 1, paddingLeft: 20 }}>

			<Text style={[styles.font_family, styles.big, text_color, { marginBottom: 19 }]}>
				{translate(badge.name)}
			</Text>


			<View>
				{info.map(({ heading, item }, index) => (
					<View key={index}>

						<Text style={[styles.font_family, styles.small, text_color]}>
							{heading}
						</Text>

						<View style={[GeneralStyles.row_wrap, { alignItems: "flex-end" }]}>
							<Text style={[styles.font_family, styles.big, text_color]}>
								{item?.value}
							</Text>
							<Text style={[styles.font_family, styles.small, text_color]}> {item?.label} </Text>
						</View>
					</View>
				))}
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