import React from 'react';
import {Text, View} from 'react-native';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslator from '../../hooks/useTranslator';
import Checkbox from '../form/Checkbox';
import {CustomDateTimePicker} from "../form/CustomDateTimePicker";


const TaskEditEventSection = props => {
	const ThemeStyles = useThemeStyles();
	const translate = useTranslator();
	const {data, onChange} = props;
	const {one_day_event, is_full_day} = data;

	return (
		<View style={{marginBottom: 15}}>
			<View>
				<Text style={[
					GeneralStyles.text_regular,
					{color: ThemeStyles.dark_text, marginBottom: 11}
				]}>
					Określ datę wydarzenia
				</Text>
				<View style={[GeneralStyles.row_ac, {marginVertical: 10}]}>
					<CustomDateTimePicker
						label={'Date'}
						buttonStyle={{flex: 1}}
						initialValue={data?.date}
						name='date'
						mode={'date'}
						dateFormat={'DD.MM.YYYY'}
						onChange={onChange}
					/>
				</View>
				<View style={[GeneralStyles.row_ac, {marginVertical: 10, justifyContent: 'space-between', flex: 1}]}>
					{!one_day_event && (
						<>
							<CustomDateTimePicker
								label={'Start time'}
								buttonStyle={{flex: 0.48}}
								initialValue={data?.start}
								name='start'
								mode={'time'}
								dateFormat={'HH:mm'}
								onChange={onChange}
								validateData={props?.validateEndDate}
							/>
							<CustomDateTimePicker
								label={'End time'}
								initialValue={data?.end}
								buttonStyle={{flex: 0.48}}
								name='end'
								mode={'time'}
								dateFormat={'HH:mm'}
								onChange={onChange}
								validateData={props?.validateEndDate}
							/>
						</>
					)}
				</View>
				<Checkbox
					name="one_day_event"
					init_checked={one_day_event}
					label="Wydarzenie jednodniowe"
					onChange={o => onChange(o)}
				/>
			</View>
		</View>
	)
}


export default TaskEditEventSection;
