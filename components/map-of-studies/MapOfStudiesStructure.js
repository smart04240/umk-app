import React from 'react';
import { View } from 'react-native';

import bachelor_structure from "./structures/bachelor";
import master_structure from "./structures/master";


const MapOfStudiesStructure = props => {

	const structure = master_structure; 

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