import React from 'react';
import { View } from "react-native";

export default props => (
	<View style={{ paddingHorizontal: 22, paddingBottom: 30, flex: 1, ...props.style || null }}>
		{ props.children }
	</View>
)
