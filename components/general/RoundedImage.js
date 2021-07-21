import React from 'react';
import {ImageBackground, View} from 'react-native';

const RoundedImage = props => {
	const { img_source } = props;
	const size = props.size || 77;
	const size_styles = { width: size, height: size, borderRadius: size / 2 };

	if ( !img_source ) return null;

	return (
		<View style={[ { overflow: "hidden" }, size_styles, props.box_style || {} ]}>
			<ImageBackground style={[ { resizeMode: "cover" }, size_styles ]} source={ img_source } />
		</View>
	)
}


export default RoundedImage;
