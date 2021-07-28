import React from 'react';
import { View } from 'react-native';
import { putDataIntoStructure, getFinalStructure } from '../../helpers/map-of-studies';


const MapOfStudiesStructure = props => {

	const dated_structure = putDataIntoStructure( props.structure, props.structure_data );
	const final_structure = getFinalStructure( dated_structure, props.structure_data, props.years_amount );
	
	return (
		<View style={{ flex: 1, paddingBottom: 30 }}>
			{ final_structure && !!final_structure.length &&
				final_structure.map(({ Component, ...props }, index ) => {

					return <Component key={ index } { ...props }/>
				})
			}
		</View>
	)
}


export default MapOfStudiesStructure;
