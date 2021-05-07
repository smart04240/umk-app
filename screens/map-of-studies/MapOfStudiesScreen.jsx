import React from "react";

import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import MapOfStudiesStructure from "../../components/map-of-studies/MapOfStudiesStructure";


export default function MapOfStudiesScreen( props ) {
	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>
					
					<MapOfStudiesStructure/>				
					
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}