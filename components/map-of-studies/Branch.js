import React from 'react';
import { View } from 'react-native';
import Layout from '../../constants/Layout';
import MOSConstants from '../../constants/MOSConstants';
import Line from './Line';


const getChildComponent = ( obj, extra ) => {
	const { Component, ...props } = obj;
	return <Component {...props } {...extra } />
}

const Branch = props => {

	const { children, absolute, dead_end, hide_line } = props;
	const children_is_array = Array.isArray( children );

	return (
		<View style={{
			position: absolute ? "absolute" : "relative",
			left: absolute ? Layout.width / 3 : 0,
			alignItems: "center",
			flex: 1,
			width: "100%",
		}}>

			{ !dead_end &&
				<Line style={{
						height: "100%",
						top: 0,
						left: "50%",
						marginLeft: -MOSConstants.Line.Size / 2,
					}}
				/>
			}

			{ children_is_array && !!children.length &&

				children.map(( child, i ) => (
					getChildComponent( child, { key: i, hide_line: !dead_end })
				))
			}

			{ !children_is_array && 
				getChildComponent( children, { hide_line: !dead_end })
			}
		</View>
	)
}


export default Branch;