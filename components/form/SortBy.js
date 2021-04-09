import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';

import Dropdown from './Dropdown';

const SortBy = props => {


	const options = [{
		value: "date_asc", label: "data rosnąco",
		value: "date_desc", label: "data malejąco",
		value: "A-Z", label: "nazwa A-Z",
		value: "Z-A", label: "nazwa Z-A"
	}]

	return (
		<View style={[
			styles.container,
			props.container_style || {}
		]}>
			<Text> Sortuj według </Text>

			<Dropdown
				options={ options }
				container_style={{ margin: 0 }}
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 14,
		...GeneralStyles.row_ac
	}
});


export default SortBy;