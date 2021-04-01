import React from "react";
import { Text, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import GeneralStyles from "../constants/GeneralStyles";

export default function EditProfileScreen(props) {

    const ThemeStyles = useThemeStyles();

    return (
		<View style={{ backgroundColor: ThemeStyles.main_bg, flex: 1 }}>
			
			<Text> EDYTUJ PROFIL </Text> 

		</View>
    );
};

const styles = StyleSheet.create({
})