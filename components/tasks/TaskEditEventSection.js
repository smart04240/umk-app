import React from 'react';
import { View, Text } from 'react-native';
import GeneralStyles from '../../constants/GeneralStyles';
import Layout from '../../constants/Layout';

import Translations from '../../constants/Translations';
import useThemeStyles from '../../hooks/useThemeStyles';
import useTranslator from '../../hooks/useTranslator';

import Checkbox from '../form/Checkbox';
import DatePicker from '../form/datepicker/DatePicker';
import TimePicker from "../form/timepicker/TimePicker";

const INPUT_WIDTH = ( Layout.width - 10 - Layout.paddingHorizontal * 2 ) / 2;


const TaskEditEventSection = props => {

	const ThemeStyles = useThemeStyles();
	const translate = useTranslator();
	const { data, onChange } = props;
	const { is_event, one_day_event } = data;

	const inputs = [
		[
			{ name: "date_from", placeholder: translate( Translations.StartDate ), component: DatePicker },
			{ name: "time_from", component: TimePicker },
		],
		[
			{ name: "date_to", placeholder: translate( Translations.EndDate ), component: DatePicker },
			{ name: "time_to", component: TimePicker },
		]
	];

	return (
		<View style={{ marginBottom: 15 }}>
			<Checkbox
				init_checked={ is_event }
				name="is_event"
				label={ translate( Translations.Event )}
				row_style={{ alignItems: "center" }}
				onChange={ o => onChange( o )}
			/>

			{ is_event && 
				<View>
					<Text style={[
						GeneralStyles.text_regular,
						{ color: ThemeStyles.dark_text, marginBottom: 11 }
					]}>
						Określ datę wydarzenia
					</Text>
					

					{ inputs.map(( row, index ) => (
						<View 
							key={ index } 
							style={ GeneralStyles.row_ac }
						>
							{ row.map(( input, index ) => {
							
								if ( input.component === TimePicker && !!one_day_event ) 
									return null;

								return (
									<input.component
										key={ input.name }
										name={ input.name }
										init_value={ data[ input.name ]}
										placeholder={ input.placeholder }
										value_label_style={{ fontSize: 13 }}
										container_style={{ 
											width: INPUT_WIDTH, 
											marginRight: index === 0 ? 10 : 0,
											marginBottom: 10 
										}}
										onChange={ o => onChange( o )}
									/>
								)}
							)}
						</View>
					)) }

					<Checkbox 
						name="one_day_event"
						init_checked={ one_day_event }
						label="Wydarzenie jednodniowe"
						onChange={ o => onChange( o )}
					/>
				</View>
			}
		</View>
	)
}


export default TaskEditEventSection;