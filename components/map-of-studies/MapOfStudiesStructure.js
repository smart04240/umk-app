import React from 'react';
import { View } from 'react-native';
import { getFinalStructure } from '../../helpers/map-of-studies';


const MapOfStudiesStructure = props => {

	const { structure, years_data, years_amount } = props.all_data;
	const final_structure = getFinalStructure( structure, years_data );

	return (
		<View style={{ flex: 1, paddingBottom: 30 }}>
			{ final_structure && !!final_structure.length &&
				final_structure.map(({ Component, ...props }, index ) => (
					<Component 
						key={ index } 
						{ ...props } 
					/>
				))
			}
		</View>
	)
}


export default MapOfStudiesStructure;
