import React from 'react';
import { View } from 'react-native';
import GeneralStyles from '../../constants/GeneralStyles';

const Row = props => (
	<View style={[
		GeneralStyles.row_ac,
		{ width: "100%" },
		props.style || {}
	]}>
		{ props.children }
	</View>
)



export default Row;