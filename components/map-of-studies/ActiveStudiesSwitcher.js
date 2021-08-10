import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from "react-native";

import useDidChange from "../../hooks/useDidChange";
import Translations from "../../constants/Translations";
import useTranslator from "../../hooks/useTranslator";
import { getBasicStructureAndData } from '../../helpers/map-of-studies';

import Dropdown from '../form/Dropdown';

const ActiveStudiesSwitcher = props => {

	const translate = useTranslator();

	const user = useSelector( state => state.user );
    const user_studies = user.studies;

	const [ chosen_study_id, setChosenStudyId ] = useState( null );
	const [ all_structure_data, setAllStructureData ] = useState( null );

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
		studies_options.length === 1 && setChosenStudyId( studies_options[0].value )
	}, [ studies_options ]);


	useDidChange(() => {

		setAllStructureData( null );

		if ( current_study ) {

			const degree = current_study?.study?.level_of_study_short;
			const all_data = getBasicStructureAndData( degree, current_study );

			setTimeout(() => setAllStructureData( all_data ), 100 )
		}
	}, [ current_study ])


	useDidChange(() => props.changeCallback && props.changeCallback( all_structure_data ), [ all_structure_data ])

	
	// console.log( "USER", user );
	// console.log( "USER STUDIES", user_studies );
	// console.log( "CURRENT STUDY", current_study );

	return (
		<>
			{ studies_options.length > 1 &&
				<View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
					<Dropdown
						label={ translate( Translations.FilterSelectDirection )}
						options={ studies_options }
						onChange={ option => setChosenStudyId( option.value )}
					/>
				</View>
			}
		</>
	)
}


export default ActiveStudiesSwitcher;