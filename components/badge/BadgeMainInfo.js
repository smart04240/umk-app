import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';

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
			heading: { pl: 'Ile studentów ma odznakę', en: 'How many students have a badge' },
			item: [{ value: ``, label: '' }],
		},
		{
			heading: { pl: 'Punkty za odznakę', en: 'Badge points' },
			item: { value: `${badge?.points}` }
		}
	]);
	useEffect(() => {
		let params = { badge_id: badge.id, is_subtype: false };
		if (badge?.badge_id) params = { ...params, is_subtype: true }

		API.badges.getEarnedPercentage(params).then(response => {
			let data = response.data.data;
			setInfo(prev => {
				let _prev = [...prev];
				_prev[0].item = data;
				return _prev;
			});
		});
	}, []);

	const itemJsx = (item, i) => (
		<View key={i} style={[GeneralStyles.row_wrap]} >
			<Text style={[styles.font_family, styles.big, text_color]}>
				{i > -1
					? <>{parseInt(item?.value) > 100 ? 100 : Math.floor(parseInt(item?.value))}%</>
					: item?.value
				}
			</Text>
			<Text style={[styles.font_family, styles.small, text_color, { flex: 1, marginLeft: 10 }]}> {item?.label} </Text>
		</View>
	);

	return (
		<View style={{ flex: 0.5, flexGrow: 1, paddingLeft: 20 }}>

			<Text style={[styles.font_family, styles.big, text_color, { marginBottom: 19 }]}>
				{translate(badge.name)}
			</Text>


			<View>
				{info.map(({ heading, item }, index) => (
					<View key={index} style={{ marginBottom: 10 }}>

						<Text style={[styles.font_family, styles.small, text_color]}>
							{translate(heading)}
						</Text>

						{Array.isArray(item)
							? item.map((_item, i) => itemJsx(_item, i))
							: itemJsx(item)
						}
					</View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({

	font_family: { fontFamily: Fonts.ProximaNova.Regular },

	big: { fontSize: 20 },

	small: { fontSize: 14 },
});

export default BadgeMainInfo;