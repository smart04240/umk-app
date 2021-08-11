import React, { useState, useMemo } from "react";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import ActiveStudiesSwitcher from "../../components/map-of-studies/ActiveStudiesSwitcher";
import MapOfStudiesStructure from "../../components/map-of-studies/MapOfStudiesStructure";
import StudySimulations from "../../components/map-of-studies/StudySimulations";
import { getBasicSimulationsStructure } from "../../helpers/map-of-studies";

export default function SimulationsScreen() {
	
	const [ all_structure_data, setAllStructureData ] = useState( null );
	const basic_simulations_structure = useMemo(() => all_structure_data ? getBasicSimulationsStructure( all_structure_data ) : null, [ all_structure_data ]);

	// !!all_structure_data && console.log( "DATA:", all_structure_data );
	
	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll container_style={{ paddingHorizontal: 0 }}>
					
					<ActiveStudiesSwitcher
						changeCallback={ data => setAllStructureData( data )}
					/>

					{ !!all_structure_data && 
						<MapOfStudiesStructure 
							all_data={ all_structure_data }
							simulation_mode
						/>				
					}

					{ !!basic_simulations_structure && 
						<StudySimulations base={ basic_simulations_structure } />
					}

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}