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


const getDataForAllYears = current_study => {

	const data = [];
	const { graduation_dates, studies_maps } = current_study;
	
	const getStudiesMapsForYear = id => studies_maps.filter( item => item.term_id === id );

	graduation_dates.forEach( item  => {

		const year = item.kolejnosc_etapu_osoby;
		const year_id = item.academic_year_term.id; 

		if ( year && !data?.[ year ]) {
			data[ year ] = {
				years: item.academic_year_term.usos_id,
				status: item.status_zaliczenia_etapu_osoby || "X",
				studies_maps: getStudiesMapsForYear( year_id )
			};
		}
	});

	return data;
}


export const getStructureAndData = ( degree, current_study ) => {

	const current_degree = DEGREES?.[ degree ];
	if ( !current_degree ) return {};

	const structure = current_degree?.structure

	return { 
		structure,
		data: getDataForAllYears( current_study )
	}
}


export const putDataIntoStructure = ( structure, data ) => {

	if ( !structure || !data ) return null;

	const getStrWithData = ( str, year, term_field ) => {
		
		if ( !str ) return null;

		const pattern_matches = str.match(/(#\w+)+/g);

		if ( pattern_matches ) {

			for ( const match of pattern_matches ) {

				if ( !data?.[ year ]) return null;

				const [ data_param_kind, data_param_name ] = match.split("#").slice(1);
				let value;

				switch ( data_param_kind ) {
					case "year": value = data[ year ][ data_param_name ];
						break;

					case "term_field":
						value = term_field?.[ data_param_name ];
						if ( value && [ "start_date", "end_date" ].includes( data_param_name ))
							value = moment(value).format("DD.MM.YYYY");
					break;
				}

				str = value ? str.replace( match, value ) : str;
			}
		}

		return str;
	}


	const getChangedComponentObj = component_obj => {

		if ( !component_obj.year ) return component_obj;

		const { label, small_label, year, term_field_id } = component_obj;

		const term_field = data?.[ year ]?.studies_maps?.find( item => item.term_field_id === term_field_id );

		// const passed = data?.[ year ] 
		// 	? data?.[ year ]?.status !== "X"
		// 		? true
		// 		: term_field 
		// 			? moment(term_field.start_date) <= moment()
		// 			: false 
		// 	: false 

		return {
			...component_obj,
			label: getStrWithData( label, year, term_field ),
			small_label: getStrWithData( small_label, year, term_field ),
			passed: false
		};
	}


	const getStructureWithData = structure => {

		return structure.map( component_obj => {

			const { Component, children } = component_obj;

			switch ( Component ) {
				
				case Point: return getChangedComponentObj( component_obj );

				case Branch: return { 
					...component_obj, 
					children: Array.isArray( children )
						? getStructureWithData( children )
						: children?.Component === Point 
							? getChangedComponentObj( children )
							: component_obj 
				}

				case BranchesNode: return { ...component_obj, branches: getStructureWithData( component_obj.branches )}

				default: return component_obj;
			}
		
		})
	} 

	return getStructureWithData( structure )
}