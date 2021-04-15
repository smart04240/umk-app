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

const WINDOW_WIDTH = Layout.width;
const WINDOW_HEIGHT = Layout.height;
const SIDEBAR_WIDTH = WINDOW_WIDTH * 0.85;
const SIDEBAR_HEIGHT = WINDOW_HEIGHT - 28;

const Sidebar = props => {
	
	const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();

	const moveAnim = useRef( new Animated.Value( WINDOW_WIDTH )).current;
	const anim_duration = 1000;

	const toggleSidebar = action => {
		Animated.timing( moveAnim, {
			toValue: action === "show" ? 0 : WINDOW_WIDTH,
			duration: anim_duration,
			useNativeDriver: true
		}).start();
	}


	useEffect(() => {
		isFunction( props.getOpenMethod ) && props.getOpenMethod({ open: () => toggleSidebar("show") });
	}, []);


	return (
		<Animated.View 
			style={[ 
				{ backgroundColor: ThemeStyles.box_bg },
				styles.sidebar, 
				{ width: SIDEBAR_WIDTH, height: SIDEBAR_HEIGHT },
				{ transform: [{ translateX: moveAnim }] }
			]}
		>
		

			<View style={ styles.sidebar_content }>
				
				<CloseButton 
					style={ styles.close_button } 
					onPress={ () => toggleSidebar("hide")} 
				/>

				<ScrollView style={{ flex: 1 }}>
					
					<View style={{ flexDirection: "row", marginBottom: 35 }}>
						<SidebarUserInfo/>
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
			</View>
		</Animated.View>
	)
}


const styles = StyleSheet.create({
	sidebar: {
		position: "absolute",
		top: 0,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		zIndex: 100,
  		elevation: 100, 
	}, 

	close_button: {
		marginLeft: "auto",
		paddingVertical: 5
	},

	sidebar_content: {
		flex: 1,
		paddingLeft: 40,
		paddingRight: 10,
		paddingBottom: 24
	}
})


export default Sidebar;