import React from 'react';
import { View } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import useTranslator from '../../hooks/useTranslator';
import Layout from '../../constants/Layout';

import Checkbox from '../form/Checkbox';
import Dropdown from "../form/Dropdown";
import DatePicker from '../form/datepicker/DatePicker';
import TimePicker from "../form/time-picker/TimePicker";
import {CustomDateTimePicker} from "../form/CustomDateTimePicker";


const TaskEditReminderSection = props => {
	const translate = useTranslator();
	const {data, onChange} = props;
	const {reminder, reminder_option, reminder_date, reminder_time} = data;

	const reminder_opt = [
		{value: "10_min", label: translate(Translations.TenMinBefore)},
		{value: "1_hour", label: translate(Translations.HourBefore)},
		{value: "6_hours", label: translate(Translations.SixHoursBefore)},
		{value: "1_day", label: translate(Translations.DayBefore)},
		{value: "2_days", label: translate(Translations.TwoDaysBefore)},
		{value: "1_week", label: translate(Translations.WeekBefore)},
		{value: "custom", label: translate(Translations.Other)}
	];

	return (
		<View style={{marginBottom: 15}}>
			<Checkbox
				name="reminder"
				init_checked={reminder}
				label={translate(Translations.Reminder)}
				row_style={{alignItems: "center"}}
				onChange={o => onChange(o)}
			/>
			{reminder && (
				<View style={[GeneralStyles.row_ac, {marginVertical: 10, justifyContent: 'space-between', flex: 1}]}>
					<Dropdown
						name="reminder_option"
						init_value={reminder_option}
						options={reminder_opt}
						options_box_style={{flex: 0.5}}
						onChange={o => onChange(o)}
						container_style={{flex: 0.55}}
					/>
					<CustomDateTimePicker
						label={'Reminder date'}
						initialValue={reminder_date}
						buttonStyle={{flex: 0.40, marginBottom: 8}}
						name='reminder_date'
						mode={'datetime'}
						dateFormat={'HH:mm DD.MM.YY'}
						onChange={props.onChange}
					/>
				</View>
			)}
		</View>
	)
}


export default TaskEditReminderSection;
