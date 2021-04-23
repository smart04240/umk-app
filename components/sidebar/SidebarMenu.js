import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import useTranslated from "../../hooks/useTranslated";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';
import Menu from "../../constants/Menu";
import Routes from "../../constants/Routes";

const isActive = (item, active) => item.screen === active || (item.subScreens || []).find(screen => screen === active);

const SidebarMenu = ({navigation, route}) => {
    const ThemeStyles = useThemeStyles();

    const navigate = screen => {
    	navigation.reset({
			index: 1,
			routes: [{name: Routes.Start}, {name: screen}],
		});
    	navigation.closeDrawer();
	};

	return (
		<View style={ styles.box }>
			{ Menu.map(( item, index ) => (
				<TouchableOpacity key={ index } onPress={ () => item.screen && navigate( item.screen ) }>
					<Text style={[
						styles.menu_item,
						{ color: ThemeStyles.dark_blue_text, borderColor: ThemeStyles.dark_blue_text }, 
						isActive(item, route) ? GeneralStyles.text_bold : GeneralStyles.text_regular,
						index + 1 === Menu.length ? { borderBottomWidth: 0 } : {} 
					]}> { useTranslated( item.label )} </Text>
				</TouchableOpacity>
			))}
		</View>
	)
}


const styles = {
	box: { flex: 1, paddingRight: 30, marginBottom: 25 },
	menu_item: {
		paddingLeft: 15,
		paddingVertical: 15,
		borderBottomWidth: 0.5
	}
};

export default SidebarMenu;