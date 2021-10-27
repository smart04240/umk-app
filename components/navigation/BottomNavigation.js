import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/core';
import Layout from '../../constants/Layout';
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Menu from "../../constants/Menu";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const BottomNavigation = () => {
	const ThemeStyles = useThemeStyles();
	const route = useRoute();
	const navigation= useNavigation();
	const offset = useSafeAreaInsets();

	const isButtonActive = name => route.name.split(".")[0] === name;

	return (
		<View style={[ GeneralStyles.row_center_between, styles.nav, { backgroundColor: ThemeStyles.box_bg }, {paddingBottom: offset?.bottom + 20}]}>

			{ Menu.map(( item, index ) => {

				const is_active = isButtonActive( item.screen );
				const icon = is_active ? item.icon_active : item.icon;

				return item.bottom
					? (
						<TouchableOpacity key={ index } onPress={ () => navigation.navigate( item.screen )}>
							<MaterialCommunityIcons
								name={ icon }
								size={ 25 }
								color={ ThemeStyles.icon_color }
							/>
						</TouchableOpacity>
					)
					: null
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	nav: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 16,
		paddingBottom: 19,
		paddingHorizontal: Layout.paddingHorizontal,
		elevation: 100,
		zIndex: 100
	}
})


export default BottomNavigation;
