import React, {useState} from "react";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import ActiveStudiesSwitcher from "../../components/map-of-studies/ActiveStudiesSwitcher";
import MapOfStudiesStructure from "../../components/map-of-studies/MapOfStudiesStructure";

export default function MapOfStudiesScreen() {

	const [ all_structure_data, setAllStructureData ] = useState( null );

	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll container_style={{ paddingHorizontal: 0 }}>

					<ActiveStudiesSwitcher
						changeCallback={ data => setAllStructureData( data )}
					/>

					{ !!all_structure_data &&
						<MapOfStudiesStructure all_data={ all_structure_data }/>
					}

				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}
