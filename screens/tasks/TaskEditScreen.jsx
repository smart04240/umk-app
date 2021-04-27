import React from "react";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import ScreenWithRoundedHeader from "../../components/layout/ScreenWithRoundedHeader";
import {EventTaskEditForm} from "../../components/general/EventTaskEditForm";


export default function TaskEditScreen( props ) {
	return (
		<ScreenWithRoundedHeader>
			<MainWithNavigation>
				<ContainerWithScroll>
					<EventTaskEditForm
						route={props.route}
					/>
				</ContainerWithScroll>
			</MainWithNavigation>
		</ScreenWithRoundedHeader>
	)
}
