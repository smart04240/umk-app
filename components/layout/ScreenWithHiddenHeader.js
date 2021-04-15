import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const ScreenWithHiddenHeader = props => {

	const navigation = useNavigation();

	React.useLayoutEffect(() => {
        navigation.setOptions({ 
			headerLeft: () => null,
			headerRight: () => null,
			headerTitle: '',
			headerStyle: { height: 0 }
		});
    }, [ navigation ]);

	return (
		<View style={{ flex: 1 }}>
			{ props.children }
		</View>
	)
}


export default ScreenWithHiddenHeader;