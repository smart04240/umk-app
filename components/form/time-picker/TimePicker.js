import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useThemeStyles from '../../../hooks/useThemeStyles';
import GeneralStyles from "../../../constants/GeneralStyles";
import TimePickerTimeBox from "./TimePickerTimeBox";
import { isFunction, isString } from '../../../helpers/functions';

const time_boxes = ["hours", "minutes"];

const reducer = (state, action) => {

	switch (action.type) {

		case "reset":
			return {};

		case "update":
			return {...state, [action.name]: action.value}

		default:
			throw new Error();
	}
};

const TimePicker = props => {

	const ThemeStyles = useThemeStyles();

	const {name, init_value, onChange} = props;
	const init_arr = isString(init_value) && init_value.split(":").length === 2 ? init_value.split(":") : null;

	const start_value = init_arr
		? {hours: init_arr[0], minutes: init_arr[1]}
		: {};

	const [open, setOpen] = useState(false);
	const [value, dispatch] = useReducer(reducer, start_value);

	const value_label = useMemo(() => (
		!!value.minutes && !!value.hours
			? `${value.hours}:${value.minutes}`
			: "Godzina"
	), [value]);


	useEffect(() => {

		if (isFunction(onChange)) {
			const {hours, minutes} = value;
			const result = hours && minutes ? `${hours}:${minutes}` : null;
			onChange({name, value: result});
		}

	}, [value]);


	return (
		<View style={[
			styles.container,
			props.container_style || {}
		]}>
			<TouchableWithoutFeedback onPress={() => setOpen(!open)}>
				<View style={[
					styles.input,
					{borderColor: ThemeStyles.blue_text},
					props.input_style || {}
				]}>

					<Text style={[
						GeneralStyles.text_regular,
						{color: ThemeStyles.dark_text, marginRight: "auto"}
					]}>
						{value_label}
					</Text>

					{(value.hours && value.minutes) &&
					<TouchableOpacity
						style={{paddingHorizontal: 8}}
						onPress={e => {
							e.stopPropagation();
							dispatch({type: "reset"})
						}}
					>
						<MaterialCommunityIcons
							name="close"
							size={23}
							color={ThemeStyles.icon_color}
						/>
					</TouchableOpacity>
					}

					<MaterialCommunityIcons
						name="clock-time-four-outline"
						size={23}
						color={ThemeStyles.icon_color}
					/>
				</View>
			</TouchableWithoutFeedback>

			<View style={[
				styles.time_boxes,
				open ? styles.time_boxes_visible : {},
				{backgroundColor: ThemeStyles.box_bg},
				props.time_boxes_style || {}
			]}>

				{time_boxes.map((box, index) => (
					<TimePickerTimeBox
						key={index}
						name={box}
						value={value}
						onNumPress={(name, value) => dispatch({type: "update", name, value})}
					/>
				))}

			</View>

		</View>
	)
}

const styles = StyleSheet.create({

	container: {
		width: "100%",
		marginBottom: 8
	},

	input: {
		...GeneralStyles.row_ac,
		borderRadius: 7,
		borderStyle: "solid",
		borderWidth: 1,
		paddingVertical: 10,
		paddingHorizontal: 15,
	},

	time_boxes: {
		flexDirection: "row",
		justifyContent: "space-between",
		position: "absolute",
		zIndex: -1,
		elevation: 0,
		opacity: 0,
		top: "100%",
		left: 0,

		width: 186,
		height: 200,
		borderRadius: 7,
		paddingHorizontal: 35,
		paddingVertical: 17
	},

	time_boxes_visible: {
		zIndex: 999,
		elevation: 5,
		opacity: 1
	}
})

export default TimePicker;
