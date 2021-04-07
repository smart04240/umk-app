import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import GeneralStyles from '../../constants/GeneralStyles';
import { isFunction } from '../../helpers/functions';
import useThemeStyles from '../../hooks/useThemeStyles';

const Tabs = props => {

	const { tabs, onTabChangeCallback } = props;
    const ThemeStyles = useThemeStyles();

	const [ active_tab, setActiveTab ] = useState(0);

	const tabClick = index => setActiveTab( index );


	useEffect(() => {
		if ( isFunction( onTabChangeCallback ))
			onTabChangeCallback( active_tab );
	}, [ active_tab ])


	if ( !tabs || !tabs.length ) return null;

	return (
		<View style={[ GeneralStyles.row_center_between, props.style || {} ]}>
			{ tabs.map(( text, index ) => {
			
				const text_color = index === active_tab ? ThemeStyles.blue_text : ThemeStyles.blue_rgba(0.5); 
				const text_font = index === active_tab ? GeneralStyles.text_bold : GeneralStyles.text_regular;
			
				return (
					<TouchableOpacity key={ index } style={{ flexShrink: 1 }} onPress={ () => tabClick( index )}>
						<Text style={[ text_font, { color: text_color, textTransform: "uppercase" } ]}>
							{ text }
						</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}


export default Tabs;