import React from 'react';
import {View} from 'react-native';
import MOSConstants from "../../constants/MOSConstants";
import useThemeStyles from '../../hooks/useThemeStyles';

export default props => {

	const ThemeStyles = useThemeStyles();

	return (
		<View
			style={{
				position: props.position || "absolute",
				width: props.width || MOSConstants.Line.Size,
				height: props.height || MOSConstants.Line.Size,
				top: props.top || 0,
				left: props.left || 0,
				backgroundColor: "#C9D1DB",
				...props.style
			}}
		/>
	)
}

