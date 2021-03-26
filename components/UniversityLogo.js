import React from 'react';
import { Image, View} from "react-native";

import GeneralStyles from "../constants/GeneralStyles"

export default props => (
	<View style={[ GeneralStyles.row_centered, { padding: 20, margin: 20 }, props.style || {} ]}>
		<Image source={ require("../assets/images/university-logo.png") }/>
	</View>
)
