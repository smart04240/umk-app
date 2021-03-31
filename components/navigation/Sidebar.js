import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

import useThemeStyles from '../../hooks/useThemeStyles';
import Layout from "../../constants/Layout";
import { isFunction } from '../../helpers/functions';

const Sidebar = props => {
	
    const ThemeStyles = useThemeStyles();

	const window_w = Layout.width;
	const window_h = Layout.height;
	const sidebar_with = window_w * 0.8;
	const sidebar_height = window_h - 25;

	const moveAnim = useRef( new Animated.Value( window_w )).current;
	const anim_duration = 1000;

	const toggleSidebar = action => {
		Animated.timing( moveAnim, {
			toValue: action === "show" ? 0 : window_w,
			duration: anim_duration,
			useNativeDriver: true
		}).start();
	}


	useEffect(() => {

		if ( isFunction( props.getOpenMethod ))
			props.getOpenMethod({ open: () => toggleSidebar("show") });
		
	}, []);

	return (
		<Animated.View style={[ 
			styles.sidebar, 
			{ width: sidebar_with, height: sidebar_height },
			{ transform: [{ translateX: moveAnim }] }
		]}>
			<TouchableOpacity onPress={ () => toggleSidebar("hid") }> 
				<Text> Sidebar </Text>
			</TouchableOpacity>
		</Animated.View>
	)
}


const styles = StyleSheet.create({
	sidebar: {
		position: "absolute",
		top: 0,
		backgroundColor: "#c2c2c2",
		paddingHorizontal: 40,
		paddingVertical: 24,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20
	}
})


export default Sidebar;