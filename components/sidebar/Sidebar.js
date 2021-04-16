import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import Actions from "../../redux/Actions";
import useThemeStyles from '../../hooks/useThemeStyles';
import Layout from "../../constants/Layout";

import SidebarMenu from './SidebarMenu';
import SidebarUserInfo from './SidebarUserInfo';
import CloseButton from '../buttons/CloseButton';
import LocaleSwitcher from '../locale/LocaleSwitcher';
import ThemeSwitcher from "../theme/ThemeSwitcher";
import useTranslated from '../../hooks/useTranslated';
import Translations from '../../constants/Translations';
import GeneralStyles from '../../constants/GeneralStyles';
import Colors from '../../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/core';


const WINDOW_WIDTH = Layout.width;
const WINDOW_HEIGHT = Layout.height;
const SIDEBAR_WIDTH = WINDOW_WIDTH * 0.85;
const SIDEBAR_HEIGHT = WINDOW_HEIGHT - 28;

const Sidebar = () => {
	
	const sidebar_state = useSelector( state => state.sidebar );
	const user = useSelector( state => state.user );
	const dispatch = useDispatch();
    const ThemeStyles = useThemeStyles();
	const route = useRoute();
	const navigation = useNavigation();

	const animated_value = useRef( new Animated.Value( 0 )).current;
	const anim_duration = 1000;

	const handleSidebarAnimation = params => {
		
		const { open, duration } = params;

		Animated.timing( animated_value, {
			toValue: !!open ? 1 : 0,
			duration: duration >= 0 ? duration : anim_duration,
			useNativeDriver: true
		}).start();
	}


	const closeSidebar = duration => dispatch( Actions.Sidebar.Close({ duration })); 

	useEffect(() => {

		const beforeRemoveHandler = navigation.addListener( "beforeRemove", e => {
	
			e.preventDefault();

			closeSidebar(0);
			setTimeout(() => navigation.dispatch( e.data.action ), 60 );
		});

		return () => navigation.removeListener( "beforeRemove", beforeRemoveHandler );

	}, []);


	useEffect(() => { handleSidebarAnimation( sidebar_state )}, [ sidebar_state ]);

	useEffect(() => { !user && closeSidebar(0) }, [ user ]);

	useEffect(() => { if ( !!sidebar_state.open ) closeSidebar(0) }, [ route ]);


	return (
		<>	
			<Animated.View
				style={[
					styles.overlay,
					{
						opacity: animated_value.interpolate({
							inputRange: [ 0, 1 ],
							outputRange: [ 0, 1 ]
						}),

						zIndex: animated_value.interpolate({
							inputRange: [ 0, 1 ],
							outputRange: [ -1, 90 ]
						})
					} 
				]}
			/>

			<Animated.View 
				style={[ 
					{ backgroundColor: ThemeStyles.box_bg },
					styles.sidebar, 
					{ width: SIDEBAR_WIDTH, height: SIDEBAR_HEIGHT },
					{ transform: [{ 
						translateX: animated_value.interpolate({
							inputRange: [ 0, 1 ],
							outputRange: [ WINDOW_WIDTH, 0 ]
						}) 
					}] }
				]}
			>
			
				<View style={ styles.sidebar_content }>
					
					<CloseButton 
						style={ styles.close_button } 
						onPress={ () => closeSidebar()} 
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
		</>
	)
}


const styles = StyleSheet.create({

	overlay: {
		position: "absolute",
		flex: 1,
		zIndex: 90,
		top: -56,
		left: 0,
		width: WINDOW_WIDTH,
		height: WINDOW_HEIGHT,
		backgroundColor: Colors.BlueRgba(0.7),
	},

	sidebar: {
		position: "absolute",
		top: -56,
		right: 0,
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
		zIndex: 110,
		elevation: 5,
		paddingLeft: 40,
		paddingRight: 10,
		paddingBottom: 24
	}
})


export default Sidebar;