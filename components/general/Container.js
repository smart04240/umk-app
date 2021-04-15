import React from 'react';
import { View } from "react-native";
import Layout from "../../constants/Layout";

export default props => (
	<View style={{ 
		paddingHorizontal: Layout.paddingHorizontal, 
		paddingVertical: 20, 
		flex: 1, 
		...props.style || null 
	}}>
		{ props.children }
	</View>
)
