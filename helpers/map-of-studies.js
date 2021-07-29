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
		structure: null 
	},

	"(mish)": {
		years_amount: 2,
		structure: mish_structure
	}
}


export const detectBranchesNodeEndType = branches => {

	if ( !branches.filter( item => item.dead_end ).length ) 
		return "full";

	const first_branch = branches[0];
	const second_branch = branches[1];
	const third_branch = branches[2];

	switch ( branches.length ) {
		case 2 :

			if ( !first_branch.dead_end && second_branch.dead_end ) return "half";

			if ( first_branch.dead_end && !second_branch.dead_end ) return "half-right";

			break;

		case 3:
 
			if ( first_branch.dead_end && !second_branch.dead_end && third_branch.dead_end ) return "middle";

			if ( !first_branch.dead_end && !second_branch.dead_end && third_branch.dead_end ) return "half";
			
			if ( first_branch.dead_end && !second_branch.dead_end && !third_branch.dead_end ) return "half-right";

			if ( !first_branch.dead_end && second_branch.dead_end && !third_branch.dead_end ) return "full";

			break;
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


export const getBasicStructureAndData = ( degree, current_study ) => {

	const current_degree = DEGREES?.[ degree ];
	if ( !current_degree ) return {};

	const { structure, years_amount } = current_degree;

	return { 
		structure,
		years_amount,
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

				const [ data_param_kind, data_param_name ] = match.split("#").slice(1);

				if ( !data?.[ year ] || !term_field ) { 
					return data_param_kind === "year"
						? str.replace(/(#\w+)/g, "")
						: null;
				}

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


	const getChangedPointObj = component_obj => {

		const { label, small_label, year, term_field_id } = component_obj;

		const term_field = data?.[ year ]?.studies_maps?.find( item => item.term_field_id === term_field_id );
		const passed = data?.[ year ] && data?.[ year ].status !== "X";

		return {
			...component_obj,
			label: getStrWithData( label, year, term_field ),
			small_label: getStrWithData( small_label, year, term_field ), 
			passed
		};
	}


	const getStructureWithData = structure => (
		structure.map( component_obj => {

			const { Component, children } = component_obj;
			
			switch ( Component ) {
				
				case Point: return getChangedPointObj( component_obj );

				case Branch: return { 
					...component_obj, 
					children: Array.isArray( children )
						? getStructureWithData( children )
						: children?.Component === Point 
							? getChangedPointObj( children )
							: children 
				}

				case BranchesNode: return { 
					...component_obj, 
					branches: getStructureWithData( component_obj.branches )
				}

				default: return component_obj;
			}
		})
	)


	return getStructureWithData( structure )
}


export const getFinalStructure = ( whole_structure, data, years_amount ) => {

	if ( !whole_structure ) return null;

	const maybe_next_year_part = [];

	const getPastPartOfStructure = past_years_data => {

		const past_part = [{
			Component: Branch,
			children: []
		}];
		
		const isNodePassed = ( node, year, status ) => {

			if ( node.year === year ) {

				const node_year_status = node?.year_status;

				if ( !node_year_status ) return true;
				
				const is_status_arr = Array.isArray( status );

				return Array.isArray( node_year_status )
					? is_status_arr 
						? !!status.filter( s => node_year_status.includes( s ))?.length 
						: node_year_status.includes( status )
					: is_status_arr ? status.includes( node_year_status ) : node_year_status === status;
			}

			return false;
		}


		const parseStructureForPastNodes = ( year, status ) => {

			const parserStructureLevel = level => {

				level.forEach( item => {
					if ( item.year === year ) {
						
						switch ( item.Component ) {
							case Branch:
									if ( isNodePassed( item, year, status )) {

										let children;
										let branches_nodes;

										const is_children_array = Array.isArray( item.children ); 

										if ( is_children_array ) {

											children = item.children
												.filter( child => child.Component !== BranchesNode )
												.map( child => {
													return child.Component === Point
														? {...child, bottom_margin: 20, label_position: "left" }
														: child
												});

											branches_nodes = item.children
												.filter( child => child.Component === BranchesNode )
												.map( branch_node => ({
													...branch_node,
													inner: false,
													branches: branch_node.branches.map( branch => ({
														...branch,
														left: 0,
														absolute: false
													})) 
												}));	

										} else {
											children = {...item.children, bottom_margin: 20, label_position: "left" };
										}


										is_children_array
											? past_part[0].children.push( ...children )
											: past_part[0].children.push( children ) 


										if ( branches_nodes && branches_nodes.length ) { 
											branches_nodes.forEach( branch_nodes => {
												maybe_next_year_part.push( branch_nodes );
											});
										}
									}
								break;
		
							case BranchesNode:
								if ( item.year === year ) parserStructureLevel( item.branches );
								break;
						}
					}
				})
			}

			parserStructureLevel([...maybe_next_year_part, ...whole_structure ]);
		}


		for ( let i = 1; i < past_years_data.length; i++ ) {

			const past_year_obj = past_years_data[ i ];
			parseStructureForPastNodes( i, past_year_obj.status );
		}

		return past_part;
	}


	const getFuturePartOfStructure = current_year_num => {

		const future_part = [];

		maybe_next_year_part?.length && maybe_next_year_part.forEach( item => {
			item.year === current_year_num && future_part.push( item )
		});

		const whole_structure_future_index = whole_structure.findIndex( item => item.year === current_year_num );
		whole_structure_future_index !== -1 && future_part.push( ...whole_structure.slice( whole_structure_future_index )) 

		return future_part;
	}


	const buildFinalStructure = () => {

		const current_year_num = data.findIndex( year => year?.status === "X" );
		const past_years_data = [ null, ...data.filter( year => year?.status !== "X" )];

		const past_part = getPastPartOfStructure( past_years_data );
		const future_part = current_year_num !== -1 ? getFuturePartOfStructure( current_year_num ) : [];

		return [...past_part, ...future_part ];
	}


	return !data?.length || data?.[1]?.status === "X"
		? whole_structure
		: buildFinalStructure();
}