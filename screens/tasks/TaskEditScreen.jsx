import React, { useLayoutEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";

export default function TaskEditScreen( props ) {

	const theme = useSelector( state => state.theme );
	const ThemeStyles = useThemeStyles();

	useLayoutEffect(() => {
        props.navigation.setOptions({
			headerStyle: [ 
				theme === "light" ? GeneralStyles.header_without_tb : {},
				{ backgroundColor: ThemeStyles.box_bg } 
			]
		});
    }, [ props.navigation, ThemeStyles ]);

	return (
		<View></View>
	)
} 