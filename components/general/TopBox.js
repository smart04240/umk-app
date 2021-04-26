import React from 'react';
import { View, StyleSheet } from "react-native";
import useThemeStyles from '../../hooks/useThemeStyles';
import Layout from "../../constants/Layout";
import WithHeaderConfig from "../layout/WithHeaderConfig";
import shadowGenerator from "../../helpers/shadowGenerator";

const TopBox = ({style, children, ...rest}) => {
	const ThemeStyles = useThemeStyles();

	return (
		<WithHeaderConfig borderless={true}>
			<View style={[ { backgroundColor: ThemeStyles.box_bg }, styles.box, style || {} ]} {...rest}>
				{ children }
			</View>
		</WithHeaderConfig>
	)
}

const styles = StyleSheet.create({
	box: {
		paddingHorizontal: Layout.paddingHorizontal,
		paddingTop: 0,
		paddingBottom: 15,
		zIndex: 10,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		...shadowGenerator(5)
	}
})


export default TopBox;
