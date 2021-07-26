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
import { getStructureAndData } from "../../helpers/map-of-studies";

export default function MapOfStudiesScreen() {

	const translate = useTranslator();

	const user = useSelector( state => state.user );
    const user_studies = user.studies
	
	const [ structure, setStructure ] = useState( null );
	const [ structure_data, setStructureData ] = useState( null );
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


	useEffect(() => {

		if ( current_study ) {

			const degree = current_study?.study?.level_of_study_short;
			const { structure, data } = getStructureAndData( degree, current_study );
			
			setStructure( structure );
			setStructureData( data );
		}

	}, [ current_study ])

	console.log( "USER STUDIES", user_studies );
	console.log( "CURRENT STUDY", current_study );	
	console.log( "DATA:", structure_data );

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll container_style={{ paddingHorizontal: 0 }}>
					
					<View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
						<Dropdown
							label={ translate( Translations.FilterSelectDirection )}
							options={ studies_options }
							onChange={ option => setChosenStudyId( option.value )}
						/>
					</View>

					{ structure && 
						<MapOfStudiesStructure
							structure={ structure }
							structure_data={ structure_data }
						/>				
					}
					
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}