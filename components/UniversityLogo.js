import React from 'react';
import { Image, View} from "react-native";
import { useSelector } from 'react-redux';

import GeneralStyles from "../constants/GeneralStyles"

const sources = {
	"pl": require("../assets/images/logo_pl.png"),
	"en": require("../assets/images/logo_en.png")
}

export default props => {
	
	const locale = useSelector( state => state.locale );
	const img_source = React.useMemo(() => sources[ locale ], [ locale ]);

	return (
		<View style={[
			GeneralStyles.row_centered, 
			{ padding: 30, margin: 30 }, 
			props.style || {} 
		]}>
			<Image source={ img_source }/>
		</View>
	)
}
