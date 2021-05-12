import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Layout from "../../../constants/Layout";
import Translations from "../../../constants/Translations";
import GeneralStyles from "../../../constants/GeneralStyles";
import Colors from '../../../constants/Colors';

import useThemeStyles from '../../../hooks/useThemeStyles';

import { now_month, now_year, getFullDateISO, getDaysAmountInMonth, isDate } from "../../../helpers/date";
import { isFunction } from '../../../helpers/functions';
import useTranslator from "../../../hooks/useTranslator";

const month_keys = [ "1_month", "2_month", "3_month", "4_month", "5_month", "6_month", "7_month", "8_month", "9_month", "10_month", "11_month", "12_month" ];
const days_keys = [ "1_day", "2_day", "3_day", "4_day", "5_day", "6_day", "7_day" ];


const CALENDAR_WIDTH = Layout.width - Layout.paddingHorizontal * 2;
const BODY_PADDING = 10;
const BODY_WIDTH = CALENDAR_WIDTH - BODY_PADDING * 2;

const DAY_MARGIN = 4;
const DAY_WITH = ( BODY_WIDTH / 7 ) - ( DAY_MARGIN * 2 );

const DatePickerCalendar = props => {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const { init_iso_date, onChange } = props;

	const init_date = init_iso_date ? new Date( init_iso_date ) : null;
	const init_month = isDate( init_date ) ? init_date.getMonth() + 1 : null;
	const init_year = isDate( init_date ) ? init_date.getFullYear() : null;

	const [ month, setMonth ] = useState( +init_month || +now_month );
	const [ year, setYear ] = useState( +init_year || +now_year );
	const [ selected_date, setSelectedDate ] = useState( init_iso_date || null );

	useEffect(() => isFunction( onChange ) && onChange( selected_date ), [ selected_date ]);

	const days_amount = useMemo(() => ( getDaysAmountInMonth( year, month )), [ month, year ]);

	const shift = useMemo(() => {

		const first_day = new Date(`${year}/${month}/01`).getDay();
		return first_day === 0 ? 6 : first_day - 1;

	}, [ month, year ]);


	const getShiftValue = () => DAY_WITH * shift + DAY_MARGIN * 2 * shift + DAY_MARGIN;


	const numbers = useMemo(() => {

		const days = [];
		for ( let i = 1; i <= days_amount; i++ ) {

			const date_iso = getFullDateISO( year, month, i );
			const date = i;

			days.push({ date_iso, date });
		};

		return days;

	}, [ days_amount ])


	const changeDate = action => {

		let new_month, new_year;

		switch ( action ) {
			case "prev":
				new_month = month === 1 ? 12 : month - 1;
				new_year = new_month === 12 ? year - 1 : year;
			break;

			case "next":
				new_month = month === 12 ? 1 : month + 1;
				new_year = new_month === 1 ? year + 1: year;
			break;

			default: return
		}

		setMonth( new_month );
		setYear( new_year );
	};

	return (
		<View style={[
			styles.container,
			props.container || {}
		]}>
			<View style={[
				styles.head,
				props.head_style || {}
			]}>

				<TouchableOpacity onPress={ () => changeDate( "prev" )}>
					<MaterialCommunityIcons name="arrow-left" size={ 20 } color={ Colors.White } />
				</TouchableOpacity>

				<Text style={[
					GeneralStyles.text_regular,
					styles.month_year
				]}> { translate( Translations[ month_keys[ month - 1 ]] )} { year } </Text>

				<TouchableOpacity onPress={ () => changeDate( "next" )}>
					<MaterialCommunityIcons name="arrow-right" size={ 20 } color={ Colors.White } />
				</TouchableOpacity>

			</View>

			<View style={[
				styles.body,
				{ backgroundColor: ThemeStyles.box_bg },
				props.body_style || {}
			]}>

				<View style={ styles.days }>
					{ days_keys && !!days_keys.length &&
						days_keys.map( day => (
							<Text
								key={ day }
								style={[
									styles.day,
									{ color: ThemeStyles.blue_text }
								]}
							>
								{ translate( Translations[ day ])}
							</Text>
						))
					}
				</View>


				<View style={ styles.numbers }>
					{ numbers && !!numbers.length &&
						numbers.map(({ date_iso, date }, index ) => (
							<TouchableOpacity
								key={ date_iso }
								style={[
									styles.number_wrap,
									index === 0 ? { marginLeft: getShiftValue()} : {},
									selected_date === date_iso ? { backgroundColor: ThemeStyles.blue_rgba(0.5)} : {}
								]}
								onPress={ () => setSelectedDate( date_iso )}
							>
								<Text style={[
									GeneralStyles.text_regular,
									styles.number_text,
									{ color: ThemeStyles.dark_blue_text }
								]}>
									{ date }
								</Text>
							</TouchableOpacity>
						))
					}
				</View>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: "100%",
		left: 0,
		elevation: 5,
		zIndex: 99,
		width: CALENDAR_WIDTH
	},

	head: {
		...GeneralStyles.row_center_between,
		borderTopLeftRadius: 7,
		borderTopRightRadius: 7,
		padding: 15,
		backgroundColor: Colors.Blue
	},

	month_year: {
		fontSize: 20,
		color: Colors.White,
		textAlign: "center"
	},

	body: {
		borderBottomLeftRadius: 7,
		borderBottomRightRadius: 7,
		elevation: 1,
		padding: BODY_PADDING
	},

	days: {
		...GeneralStyles.row_ac,
		marginBottom: 10
	},

	day: {
		...GeneralStyles.text_regular,
		fontSize: 12,
		textAlign: "center",
		width: DAY_WITH,
		marginHorizontal: DAY_MARGIN
	},

	numbers: {
		...GeneralStyles.row_wrap,
	},

	number_wrap: {
		...GeneralStyles.row_centered,
		width: DAY_WITH,
		height: DAY_WITH,
		margin: DAY_MARGIN,
		borderRadius: DAY_WITH / 2
	},

	number_text: {
		fontSize: 14,
	}
});

export default DatePickerCalendar;
