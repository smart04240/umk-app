import React, { useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import { View } from "react-native";

import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";

import Dropdown from "../../components/form/Dropdown";
import MapOfStudiesStructure from "../../components/map-of-studies/MapOfStudiesStructure";

import bachelor_structure from "../../components/map-of-studies/structures/bachelor";
import master_structure from "../../components/map-of-studies/structures/master";
import mish_structure from "../../components/map-of-studies/structures/mish";


const STRUCTURES = {
	"(s1)": bachelor_structure,
	"(s2)": master_structure,
	"(sj)": mish_structure
}

export default function MapOfStudiesScreen() {

	const translate = useTranslator();

	const user = useSelector( state => state.user );
	const all_studies_maps = user.all_studies_maps;
    const user_studies = user.studies
	
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
			: {}	
	), [ chosen_study_id ]);
	

	const all_current_study_studies_maps = useMemo(() => (
		current_study?.id
			? all_studies_maps.filter( item => item.study_id === current_study.id )
			: []
	), [ current_study ]);


	const { studies_maps, graduation_dates } = current_study;

	const structure_type = current_study?.study?.level_of_study_short;
	const structure = STRUCTURES[ structure_type ];

	console.log( "USER STUDIES", user_studies );
	console.log( "CURRENT STUDY", current_study );
	console.log( "GRADUATION DATES", graduation_dates );
	console.log( "CURRENT STUDY STUDIES MAPS", all_current_study_studies_maps );


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

					<MapOfStudiesStructure
						structure={ structure }
					/>				
					
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}