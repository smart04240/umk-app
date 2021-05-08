import React from 'react';
import { View } from 'react-native';
import Layout from '../../constants/Layout';
import MOSConstants from '../../constants/MOSConstants';
import { isObject } from '../../helpers/functions';

import Row from '../general/Row';
import DropdownGroup from './DropdownGroup';
import FinishCircle from './FinishCircle';
import Line from './Line';
import Point from './Point';
import StartCircle from './StartCircle';



const centered_row = {
	component: Row,
	props: { style: { justifyContent: "center" }}
};

const space_around_row = {
	component: Row,
	props: { style: { justifyContent: "space-around" }}
}


const getPointObj = ( tnbp, l, l_p, p, e, left ) => ({
	component: Point,
	props: {
		to_next_bottom_point: tnbp || 0,
		label: l,
		label_position: l_p, 
		passed: p,
		extra_vertical_line_height: e || 0,
		left: left
	}
});

const getLineObj = ( w, h, t, l, p ) => ({
	component: Line,
	props: {
		width: w,
		height: h,
		top: t,
		left: l,
		position: p
	}
})


const sample_structure = [
	{
		...centered_row,
		children: {
			component: StartCircle,
			props: { line_height: 33 }
		}
	},
	{
		...centered_row,
		children: getPointObj( 20, "ROK I (2015/2016)", "left", true )
	},
	{
		component: DropdownGroup,
		children: [
			{
				...centered_row,
				children: getPointObj( 24, "Rok w trakcie", "left", true )				
			},
			{
				...centered_row,
				children: getPointObj( 24, "Sesja egzaminacyjna", "left", true )
			},
			{
				...centered_row,
				children:  getPointObj( 24, "niezaliczenie I roku", "left", true )
			},
			{
				...centered_row,
				children:  getPointObj( 24, "skreślenie z listy studentów", "left", true )
			},
			{
				...centered_row,
				children:  getPointObj( 24, "wniosek o wznowienie na studia", "left", true )
			},
			{
				...centered_row,
				children:  getPointObj( 50, "wznowienie na studia", "left", true )
			}
		]
	},
	{
		...centered_row,
		children: getPointObj( 20, "ROK I (2016/2017)", "right", true )
	},
	{
		component: DropdownGroup,
		children: [
			{
				...centered_row,
				children: getPointObj( 24, "Rok w trakcie", "right", true )				
			},
			{
				...centered_row,
				children: getPointObj( 24, "Sesja egzaminacyjna", "right", true )
			},
			{
				...centered_row,
				children: getPointObj( 24, "Warunkowe zaliczenie I roku", "right", true )				
			},
			{
				...centered_row,
				children: getPointObj( 50, "Podanie o wpis warunkowy", "right", true )
			},
		]
	},
	{
		...centered_row,
		children: getPointObj( 20, "ROK II (2017/2018) (wpis warunkowy)", "left", true )
	},
	{
		component: DropdownGroup,
		children: [
			{
				...centered_row,
				children: getPointObj( 24, "Rok w trakcie", "left", true )				
			},
			{
				...centered_row,
				children: getPointObj( 24, "Sesja egzaminacyjna", "left", true )
			},
			{
				...centered_row,
				children: getPointObj( 24, "zaliczenie warunku", "left", true )				
			},
			{
				...centered_row,
				children: getPointObj( 24, "niezaliczenie II roku", "left", true )
			},
			{
				...centered_row,
				children: getPointObj( 24, "podanie o powtarzanie", "left", true )
			},
			{
				...centered_row,
				children: getPointObj( 50, "podanie o urlop", "left", true )
			},
		]
	},
	{
		...centered_row,
		children: getPointObj( 20, "Urlop (2018/2019)", "right", true )
	},
	{
		...centered_row,
		children: getPointObj( 20, "ROK II (2019/2020)", "left", true )
	},
	{
		component: DropdownGroup,
		children: [
			{
				...centered_row,
				children: getPointObj( 24, "Rok w trakcie", "left", true )
			},
			{
				...centered_row,
				children: getPointObj( 24, "Sesja egzaminacyjna", "left", true )
			},
			{
				...centered_row,
				children: getPointObj( 50, "zaliczenie II roku", "left", true )
			}
		]
	},
	{
		...centered_row,
		children: getPointObj( 20, "ROK III (2020/2021)", "right", true )
	},
	{
		component: DropdownGroup,
		children: [
			{
				component: Row,
				children: getLineObj(
					MOSConstants.PointLabel.Width + MOSConstants.Point.Circle.Size + MOSConstants.Point.InnerCircle.Size,
					MOSConstants.Line.Size,
					false,
					( MOSConstants.Point.Circle.Size - MOSConstants.Point.InnerCircle.Size ) / 2,
					"relative"
				) 
			},
			{
				component: Row,
				children: [
					getLineObj( 
						MOSConstants.Line.Size, 
						20,
						0, 
						( MOSConstants.Point.Circle.Size - MOSConstants.Point.InnerCircle.Size ) / 2, 
						"relative" 
					),
					getLineObj( 
						MOSConstants.Line.Size, 
						20,
						0,
						Layout.container_width / 2 - MOSConstants.Line.Size * 1.5, 
						"relative" 
					),
				]
			},
			{
				component: Row,
				children: [
					getPointObj( 20, "Wnioski", "right", false, MOSConstants.Point.Circle.Size * 3 + 35 + MOSConstants.Line.Size + 20 + 60 + 70 ),
					getPointObj( 20, "Rok w trakcie", "right", false, 0, MOSConstants.Point.PositionsLeftValue.center - MOSConstants.Point.Circle.Size ),
				]
			},
			{
				...centered_row,
				children: getPointObj( 35, "Sesja egzaminacyjna", "right" )
			},
			{
				...centered_row,
				children: getLineObj(
					MOSConstants.Point.PositionsLeftValue.center_right - MOSConstants.Point.PositionsLeftValue.center_left + MOSConstants.Point.InnerCircle.Size,
					MOSConstants.Line.Size,
					false,
					false,
					"relative"
				)
			},
			{
				component: Row,
				children: [
					getLineObj(
						MOSConstants.Line.Size,
						20,
						false,
						Layout.container_width / 4 - MOSConstants.Line.Size / 2,
						"relative"
					),
					getLineObj(
						MOSConstants.Line.Size,
						20,
						false,
						Layout.container_width / 4 * 3 - MOSConstants.Line.Size * 1.5,
						"relative"
					),
				]
			},
			{
				...space_around_row,
				children: [
					getPointObj( 60, "niezaliczenie III roku" ),
					getPointObj( 60, "zaliczenie III roku", "bottom", false, MOSConstants.Point.Circle.Size + 70 + MOSConstants.Line.Size ),
				]
			},
			{
				component: Row,
				children: getPointObj( 
					70, 
					"podanie o powtarzanie",
					false,
					false,
					false,
					MOSConstants.Point.PositionsLeftValue.center_left 
				)
			},
			{
				component: Row,
				children: getLineObj(
					MOSConstants.Point.PositionsLeftValue.center_left + MOSConstants.Point.InnerCircle.Size,
					MOSConstants.Line.Size,
					false,
					( MOSConstants.Point.Circle.Size - MOSConstants.Point.InnerCircle.Size ) / 2,
					"relative"
				)
			},
			{
				component: Row,
				children: getLineObj(
					MOSConstants.Point.PositionsLeftValue.center_right - MOSConstants.Point.PositionsLeftValue.center + MOSConstants.Line.Size,
					MOSConstants.Line.Size,
					false,
					Layout.container_width / 2 - MOSConstants.Line.Size / 2,
					"relative"
				)
			}
		]
	},
	{
		...centered_row,
		children: getPointObj( 20, "PRACA DYPLOMOWA", "right" )
	},
	{
		component: DropdownGroup,
		children: [ ] 
	},
	{
		...centered_row,
		children: {
			component: FinishCircle
		}
	}
]

const MapOfStudiesStructure = props => {

	const getJSXComponents = arr => {
		return Array.isArray( arr ) 
			? arr.map(( c, i ) => {
				return <c.component key={ i } {...c.props}>
					{ Array.isArray( c.children ) && getJSXComponents( c.children ) }
					{ isObject( c.children ) && 
						<c.children.component {...c.children.props } />
					}
				</c.component>
			})
			: null
	}

	const getWholeJSXStructure = () => getJSXComponents( sample_structure );

	return (
		<View style={{ flex: 1 }}>
			{ getWholeJSXStructure()}
		</View>
	)
}


export default MapOfStudiesStructure;