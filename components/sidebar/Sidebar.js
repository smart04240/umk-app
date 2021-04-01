import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from 'react-redux';

import Actions from "../../redux/Actions";
import useThemeStyles from '../../hooks/useThemeStyles';
import Layout from "../../constants/Layout";
import { isFunction } from '../../helpers/functions';

import SidebarMenu from './SidebarMenu';
import SidebarUserInfo from './SidebarUserInfo';
import CloseButton from '../buttons/CloseButton';
import LocaleSwitcher from '../locale/LocaleSwitcher';
import ThemeSwitcher from "../theme/ThemeSwitcher";
import useTranslated from '../../hooks/useTranslated';
import Translations from '../../constants/Translations';
import GeneralStyles from '../../constants/GeneralStyles';

const Sidebar = props => {
	
	const dispatch = useDispatch();
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
			{ backgroundColor: ThemeStyles.box_bg },
			styles.sidebar, 
			{ width: sidebar_with, height: sidebar_height },
			{ transform: [{ translateX: moveAnim }] }
		]}>
			
			<ScrollView style={{ flex: 1 }}>
				
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


					<TouchableOpacity style={{ marginTop: 40 }} onPress={ () => dispatch( Actions.User.Logout())}>
						<Text style={[ GeneralStyles.text_regular, { color: ThemeStyles.blue_text } ]}> 
							{ useTranslated( Translations.LogOut )} 
						</Text>
					</TouchableOpacity>
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