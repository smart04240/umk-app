import React from 'react';
import {View} from 'react-native';
import mish_structure from "./structures/mish";

const MapOfStudiesStructure = props => {

	const structure = mish_structure;

	return (
		<View style={{ flex: 1, paddingBottom: 30 }}>
			{ structure && !!structure.length &&
				structure.map(({ Component, ...props }, index ) => {

					return <Component key={ index } { ...props }/>
				})
			}
		</View>
	)
}


export default MapOfStudiesStructure;
