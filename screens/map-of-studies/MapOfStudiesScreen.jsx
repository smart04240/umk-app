import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from 'react-redux';
import { View } from "react-native";

import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

import Dropdown from "../../components/form/Dropdown";
import MapOfStudiesStructure from "../../components/map-of-studies/MapOfStudiesStructure";
import { getBasicStructureAndData } from "../../helpers/map-of-studies";
import useDidChange from "../../hooks/useDidChange";

export default function MapOfStudiesScreen() {

	const translate = useTranslator();

	const user = useSelector( state => state.user );
    const user_studies = user.studies
	
	const [ all_structure_data, setAllStructureData ] = useState( null );
	const [ chosen_study_id, setChosenStudyId ] = useState( null );

	const studies_options = useMemo(() => (
		user_studies && !!user_studies.length
			? user_studies
				.filter( item => item.year_of_study !== "absolwent" )
				.map( item => ({ label: item.study.name, value: item.id }))
			: []
	), []);


	const current_study = useMemo(() => (
		chosen_study_id
			? user_studies.find( item => item.id === chosen_study_id )
			: null	
	), [ chosen_study_id ]);


	useDidChange(() => {

		setAllStructureData( null );

		if ( current_study ) {

			const degree = current_study?.study?.level_of_study_short;
			const all_data = getBasicStructureAndData( degree, current_study );
		
			setTimeout(() => setAllStructureData( all_data ), 100 )
		}
	}, [ current_study ])


	useEffect(() => {
		studies_options.length === 1 && setChosenStudyId( studies_options[0].value )
	}, [ studies_options ])

	// console.log( "USER", user );
	// console.log( "USER STUDIES", user_studies );
	// console.log( "CURRENT STUDY", current_study );	
	// !!all_structure_data && console.log( "DATA:", all_structure_data );

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll container_style={{ paddingHorizontal: 0 }}>
					
					{ studies_options.length > 1 &&
						<View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
							<Dropdown
								label={ translate( Translations.FilterSelectDirection )}
								options={ studies_options }
								onChange={ option => setChosenStudyId( option.value )}
							/>
						</View>
					}

					{ !!all_structure_data && 
						<MapOfStudiesStructure all_data={ all_structure_data }/>				
					}
					
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}