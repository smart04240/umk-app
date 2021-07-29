import React from 'react';
import { View } from 'react-native';
import { putDataIntoStructure, getFinalStructure } from '../../helpers/map-of-studies';


const MapOfStudiesStructure = props => {

	const { structure, structure_data, years_amount, study_id } = props;

	const dated_structure = putDataIntoStructure( structure, structure_data );
	const final_structure = getFinalStructure( dated_structure, structure_data, years_amount );
	
	return (
		<View style={{ flex: 1, paddingBottom: 30 }}>
			{ final_structure && !!final_structure.length &&
				final_structure.map(({ Component, ...props }, index ) => (
					<Component 
						key={ study_id + "" + index } 
						{ ...props } 
					/>
				))
			}
		</View>
	)
}


export default MapOfStudiesStructure;
