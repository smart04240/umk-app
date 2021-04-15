import React from 'react';
import { View } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useTranslator from '../../hooks/useTranslator';

import Checkbox from '../form/Checkbox';
import Dropdown from "../form/Dropdown";
import DatePicker from '../form/datepicker/DatePicker';
import TimePicker from "../form/timepicker/TimePicker";
import Layout from '../../constants/Layout';

const INPUT_WIDTH = ( Layout.width - 10 - Layout.paddingHorizontal * 2 ) / 2;

const TaskEditReminderSection = props => {

	const translate = useTranslator();
	const { data, onChange } = props;
	const { reminder, reminder_option, reminder_date, reminder_time } = data;
	
	const reminder_opt = [
		{ value: "10_min", label: translate( Translations.TenMinBefore )},
		{ value: "1_hour", label: translate( Translations.HourBefore )},
		{ value: "6_hours", label: translate( Translations.SixHoursBefore )},
		{ value: "1_day", label: translate( Translations.DayBefore )},
		{ value: "2_days", label: translate( Translations.TwoDaysBefore )},
		{ value: "1_week", label: translate( Translations.WeekBefore )},
		{ value: "custom", label: translate( Translations.Other )}
	];

	const custom_input_cont_style = { 
		width: INPUT_WIDTH, 
		marginBottom: 10 
	}

	return (
		<View style={{ marginBottom: 15 }}>
			
			<Checkbox
				name="reminder"
				init_checked={ reminder }
				label={ translate( Translations.Reminder )}
				row_style={{ alignItems: "center" }}
				onChange={ o => onChange( o )}
			/>

			{ reminder && 
				<Dropdown
					name="reminder_option"
					init_value={ reminder_option }
					options={ reminder_opt }
					options_box_style={{ maxHeight: 75 }}
					onChange={ o => onChange( o )}
				/>
			}
			
			{ reminder && reminder_option === "custom" && 
				<View style={[ GeneralStyles.row_ac ]}>
					<DatePicker
						name="reminder_date"
						init_value={ reminder_date }
						calendar_styles={{ 
							container: {
								top: "auto",
								bottom: "100%"
							}
						}}	
						value_label_style={{ fontSize: 13 }}
						container_style={[ 
							custom_input_cont_style,
							{ marginRight: 10 } 
						]}
						onChange={ o => onChange( o )}
					/>

					<TimePicker
						name="reminder_time"
						init_value={ reminder_time }
						container_style={ custom_input_cont_style }
						time_boxes_style={{ top: "auto", bottom: "100%" }}
						onChange={ o => onChange( o )}
					/>
				</View>
			}
		</View>
	)
}


export default TaskEditReminderSection;