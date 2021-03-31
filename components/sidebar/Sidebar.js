import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import useThemeStyles from '../../hooks/useThemeStyles';
import Layout from "../../constants/Layout";
import { isFunction } from '../../helpers/functions';

import SidebarMenu from './SidebarMenu';
import SidebarUserInfo from './SidebarUserInfo';
import CloseButton from '../buttons/CloseButton';
import LocaleSwitcher from '../locale/LocaleSwitcher';
import ThemeSwitcher from "../theme/ThemeSwitcher";

const Sidebar = props => {
	
    const ThemeStyles = useThemeStyles();

	const window_w = Layout.width;
	const window_h = Layout.height;
	const sidebar_with = window_w * 0.85;
	const sidebar_height = window_h - 28;

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
			ThemeStyles.box,
			styles.sidebar, 
			{ width: sidebar_with, height: sidebar_height },
			{ transform: [{ translateX: moveAnim }] }
		]}>
			
			<ScrollView>

				<View style={{ flexDirection: "row", marginBottom: 35 }}>
					<SidebarUserInfo/>

					<CloseButton 
						style={{ marginLeft: "auto" }} 
						onPress={ () => toggleSidebar("hide")} 
					/>
				</View>


				<View style={{ flex: 1 }}> 

					<SidebarMenu/>
					<LocaleSwitcher/>
					<ThemeSwitcher style={{ marginVertical: 15 }} />

				</View>

			</ScrollView>
		</Animated.View>
		
	)
}


const styles = StyleSheet.create({
	sidebar: {
		position: "absolute",
		top: 0,
		paddingLeft: 40,
		paddingRight: 10,
		paddingVertical: 24,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		zIndex: 99,
  		elevation: 99, 
	}
})


export default Sidebar;