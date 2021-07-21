import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import bachelor_structure from "./structures/bachelor";
import master_structure from "./structures/master";
import mish_structure from "./structures/mish";

const STRUCTURES = {
	"(s1)": bachelor_structure,
	"(s2)": master_structure,
	"(sj)": mish_structure
}


const MapOfStudiesStructure = () => {

    const user_studies = useSelector( state => state.user?.studies );

	const structure_type = useMemo(() => (
		user_studies && !!user_studies.length
			? user_studies.filter( item => item.year_of_study !== "absolwent" )?.[0]?.study?.level_of_study_short
			: null
	), []); 

	const structure = STRUCTURES[ structure_type ];

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
