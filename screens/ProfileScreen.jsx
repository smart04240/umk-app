import React from "react";
import { Text, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";

import useThemeStyles from "../hooks/useThemeStyles";
import GeneralStyles from "../constants/GeneralStyles";

import ProfileMain from "../components/profile/ProfileMain";

export default function ProfileScreen(props) {

    const ThemeStyles = useThemeStyles();

    return (
		<View style={[ ThemeStyles.bg, { flex: 1 }]}>
			
			<ProfileMain/>

			<ScrollView>

			</ScrollView>
		</View>
    );
};

const styles = StyleSheet.create({
})