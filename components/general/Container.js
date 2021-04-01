import React from 'react';
import { View } from "react-native";
import Layout from "../../constants/Layout";

export default props => (
	<View style={{ 
		paddingHorizontal: Layout.paddingHorizontal, 
		paddingTop: 25, 
		paddingBottom: 30, 
		flex: 1, 
		...props.style || null 
	}}>
		{ props.children }
	</View>
)
