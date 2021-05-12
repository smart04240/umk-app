import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {TouchableWithoutFeedback, ScrollView} from "react-native-gesture-handler";
import {FontAwesome} from '@expo/vector-icons';
import GeneralStyles from '../../constants/GeneralStyles';
import Translations from '../../constants/Translations';
import {isFunction} from '../../helpers/functions';
import useThemeStyles from '../../hooks/useThemeStyles';
import Colors from '../../constants/Colors';
import useTranslator from "../../hooks/useTranslator";

const Dropdown = ({init_value, label, name, options, error_message, onChange, ...props}) => {
	const ThemeStyles = useThemeStyles();
	const translate = useTranslator();
	const placeholder = props.placeholder || translate(Translations.ChooseOneOption);
	const [value, setValue] = useState(init_value || null);
	const [open, setOpen] = useState(false);

	const value_label = useMemo(() => (options?.find?.(item => item.value === value)?.label || placeholder), [value, options]);

	const icon_name = open ? "angle-up" : "angle-down";

	const onOptionPress = value => {
		setValue(value);
		isFunction(onChange) && onChange({name, value});
		setOpen(false);
	};

	return (
		<View style={[
			{marginBottom: 8},
			props.container_style,
		]}>
			{label && (
				<Text style={[
					GeneralStyles.text_regular,
					{color: ThemeStyles.dark_text, marginBottom: 8}
				]}>
					{label}
				</Text>
			)}
			<View style={[
				styles.box,
				open ? styles.box_open : null,
				{borderColor: ThemeStyles.blue_text},
				props.box_style,
			]}>
				<TouchableWithoutFeedback onPress={() => setOpen(!open)}>
					<View style={[GeneralStyles.row_ac]}>
						<Text style={[
							GeneralStyles.text_regular,
							styles.value_label,
							{color: ThemeStyles.dark_text},
							props.value_label_style,
						]}>
							{value_label}
						</Text>
						<FontAwesome
							style={{marginLeft: 8}}
							name={icon_name}
							size={24}
							color={ThemeStyles.icon_color}
						/>
					</View>
				</TouchableWithoutFeedback>
			</View>
			{!!error_message && (
				<Text style={styles.error_message}>
					{error_message}
				</Text>
			)}
			{(options && !!options.length && !!open) && (
				<View style={[
					styles.options_box,
					{
						borderColor: ThemeStyles.blue_text,
						backgroundColor: ThemeStyles.box_bg
					},
					props.options_box_style,
				]}>
					<ScrollView>
						{options.map(opt => (
							<TouchableWithoutFeedback
								key={opt.value}
								onPress={() => onOptionPress(opt.value)}
							>
								<Text style={[
									GeneralStyles.text_regular,
									styles.option_text,
									{color: ThemeStyles.blue_text},
									props.option_text_style,
								]}>
									{opt.label}
								</Text>
							</TouchableWithoutFeedback>
						))}
					</ScrollView>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 1
    },
    box_open: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomColor: Colors.BlueRgba(0)
    },
    value_label: {flexWrap: "wrap", flex: 1},
    error_message: {
        ...GeneralStyles.text_regular,
        color: Colors.Red,
        marginTop: 7
    },
    options_box: {
        maxHeight: 120,
        position: "absolute",
        zIndex: 10,
        elevation: 2,
        left: 0,
        top: "100%",
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderTopWidth: 0.4,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
    },
    option_text: {paddingVertical: 5}
})


export default Dropdown;
