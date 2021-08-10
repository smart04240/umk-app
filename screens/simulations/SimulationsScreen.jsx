import React, { useState } from "react";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import ActiveStudiesSwitcher from "../../components/map-of-studies/ActiveStudiesSwitcher";

export default function SimulationsScreen() {
	
	const [ all_structure_data, setAllStructureData ] = useState( null );
	!!all_structure_data && console.log( "DATA:", all_structure_data );

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll container_style={{ paddingHorizontal: 0 }}>
					
					<ActiveStudiesSwitcher
						changeCallback={ data => setAllStructureData( data )}
					/>

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}