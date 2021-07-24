import React from 'react';
import { View } from 'react-native';
import { putDataIntoStructure } from '../../helpers/map-of-studies';


const MapOfStudiesStructure = props => {

	const structure = putDataIntoStructure( props.structure, props.structure_data );

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
