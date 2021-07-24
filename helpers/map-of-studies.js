import bachelor_structure from "../components/map-of-studies/structures/bachelor";
import master_structure from "../components/map-of-studies/structures/master";
import mish_structure from "../components/map-of-studies/structures/mish";

import Point from "../components/map-of-studies/point/Point";
import Branch from "../components/map-of-studies/Branch";
import BranchesNode from "../components/map-of-studies/BranchesNode";

import moment from "moment";

const DEGREES = {
	"(s1)": {
		years_amount: 3,
		structure: bachelor_structure
	},
	
	"(s2)": {
		years_amount: 2,
		structure: master_structure
	},

	"(sj)": {
		years_amount: 5,
		strucrure: null 
	},

	"(mish)": {
		years_amount: 2,
		structure: mish_structure
	}
}


const getDataForAllYears = ( years_amount, graduation_dates, studies_maps ) => {

	const data = [];
	
	const getStudiesMapsForYear = id => studies_maps.filter( item => item.term_id === id );

	graduation_dates.forEach( item  => {

		const year = item.kolejnosc_etapu_osoby;
		const year_id = item.academic_year_term.id; 

		if ( year && !data?.[ year ]) {
			data[ year ] = {
				id: year_id,
				years: item.academic_year_term.usos_id,
				status: item.status_zaliczenia_etapu_osoby,
				studies_maps: getStudiesMapsForYear( year_id )
			};
		}
	});


	if ( data.length - 1 < years_amount ) {
		
		const last_year_index = data.length - 1;

		for ( let i = last_year_index; i < years_amount; i++ ) {
			
			const [ next_years_first, next_years_second ] = data[ i ].years.split("/");
			const next_years = ( +next_years_first + 1 ) + "/" + ( +next_years_second + 1 );
			const next_year_id = studies_maps.find( item => item.term.usos_id === next_years )?.term.id;

			data[ i + 1 ] = {
				id: next_year_id,
				years: next_years,
				studies_maps: getStudiesMapsForYear( next_year_id )
			};
		}
	}

	return data;
}


export const getStructureAndData = ( degree, graduation_dates, studies_maps ) => {

	const current_degree = DEGREES?.[ degree ];
	if ( !current_degree ) return {};

	const { structure, years_amount } = current_degree 

	return { 
		structure,
		data: getDataForAllYears( years_amount, graduation_dates, studies_maps )
	}
}


export const putDataIntoStructure = ( structure, data ) => {

	if ( !structure || !data ) return null;


	const putDataIntoStr = ( str, year, term_field_id ) => {

		const pattern_matches = str.match(/(#\w+)+/g);

		if ( pattern_matches ) {
			pattern_matches.forEach( match => {

				const [ data_param_kind, data_param_name ] = match.split("#").slice(1)

				switch ( data_param_kind ) {
					case "year":
						str = str.replace( match, data[ year ][ data_param_name ]);
						break;

					case "term_field":
						
						let value = data[ year ].studies_maps?.find( item => item.term_field_id === term_field_id )?.[ data_param_name ];
						if ( value && [ "start_date", "end_date" ].includes( data_param_name ))
							value = moment(value).format("DD.MM.YYYY");

						str = value ? str.replace( match, value ) : str;
					break;
				}
			});

		}

		return str;
	}


	const putDataIntoComponentObj = component_obj => {

		if ( !component_obj.year ) return component_obj;

		const { label, small_label, year, term_field_id } = component_obj;

		return {
			...component_obj,
			label: putDataIntoStr( label, year, term_field_id ),
			small_label: putDataIntoStr( small_label, year, term_field_id )
		};
	}


	const getStructureWithData = structure => {

		return structure.map( component_obj => {

			const { Component, children } = component_obj;

			switch ( Component ) {
				
				case Point: return putDataIntoComponentObj( component_obj );

				case Branch: return { 
					...component_obj, 
					children: Array.isArray( children )
						? getStructureWithData( children )
						: putDataIntoComponentObj( children )
				}

				case BranchesNode: return { ...component_obj, branches: getStructureWithData( component_obj.branches )}

				default: return component_obj;
			}
		
		})
	} 

	return getStructureWithData( structure )
}