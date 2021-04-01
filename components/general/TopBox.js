import React from 'react';
import { View, StyleSheet } from "react-native";
import useThemeStyles from '../../hooks/useThemeStyles';
import Layout from "../../constants/Layout";

const TopBox = props => {

    const ThemeStyles = useThemeStyles();

	return (
		<View style={[ { backgroundColor: ThemeStyles.box_bg }, styles.box, props.styles || {} ]}>
			{ props.children }
		</View>
	)
}

const styles = StyleSheet.create({
	box: { 
		paddingHorizontal: Layout.paddingHorizontal,
		paddingVertical: 25,
		elevation: 10,
		zIndex: 10,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	}
})


export default TopBox;