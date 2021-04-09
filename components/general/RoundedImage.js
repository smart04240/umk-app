import React from 'react';
import { ImageBackground, View } from 'react-native';

const RoundedImage = props => {

	const { img_source, size } = props;
	const width = size || 77;
	const height = size || 77;
	const border_radius = size ? size / 2 : 77 / 2;

	const sizes = { width, height, borderRadius: border_radius };

	if ( !img_source ) return null;

	return (
		<View style={[ { overflow: "hidden", marginRight: 11 }, sizes, props.box_style || {} ]}>
			<ImageBackground style={[ { resizeMode: "cover" }, sizes ]} source={ img_source } />
		</View>
	)
}


export default RoundedImage;