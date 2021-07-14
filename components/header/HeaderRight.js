import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import useThemeStyles from '../../hooks/useThemeStyles';
import GeneralStyles from "../../constants/GeneralStyles";
import Layout from '../../constants/Layout';
import RemindersBell from '../reminders/RemindersBell';

const HeaderRight = props => {
    const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const openSidebar = () => navigation.openDrawer();

	return (
		<>
			<View style={[ GeneralStyles.row_ac ]}>

				<RemindersBell/>

				<TouchableOpacity onPress={ openSidebar } style={[ styles.menu_button ]}>
					<MaterialCommunityIcons name="menu" size={ 28 } color={ ThemeStyles.icon_color } />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({

	button: { padding: 10 },
	menu_button: {
		padding: 10,
		marginLeft: 14,
		marginRight: Layout.paddingHorizontal - 10
	}
})


export default HeaderRight;
