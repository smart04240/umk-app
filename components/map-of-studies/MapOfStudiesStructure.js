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


const getStartCircleComponentObj = lh => ({
	component: StartCircle,
	props: { line_height: lh }
});

const getFinishCircleComponentObj = () => ({ component: FinishCircle })

const getPointComponentObj = ({ lh, l, el, lw, lp, p, aelh, left }) => ({
	component: Point,
	props: {
		line_height: lh || 0,
		label: l,
		label_width: lw,
		label_position: lp, 
		passed: p,
		absolute_extra_line_height: aelh || 0,
		left: left,
		extra_label: el
	}
});

const getLineComponentObj = ({ w, h, t, l, p }) => ({
	component: Line,
	props: {
		width: w,
		height: h,
		top: t,
		left: l,
		position: p
	}
});


const getComponentFunc = cf => { 
	switch ( cf ) {

		case "start_circle": return getStartCircleComponentObj;
		case "finish_circle": return getFinishCircleComponentObj;
		case "point": return getPointComponentObj;
		case "line": return getLineComponentObj;

		default: return null;
	}
}


const rowWithSameComponents = ( component_type, components, jc, ai ) => {

	let componentFunc = getComponentFunc( component_type );
	if ( !componentFunc ) return null;

	return {
		component: Row,
		props: { style: { justifyContent: jc || "flex-start", alignItems: "flex-start" || ai }},
		children: Array.isArray( components )
			? components.map( c => componentFunc( c ))
			: componentFunc( components )
	}
}

const rowWithStartCircle = () => rowWithSameComponents( "start_circle", 35, "center" );

const rowWithFinishCircle = () => rowWithSameComponents( "finish_circle", null, "center" );

const rowWithLines = ( lines, jc ) => rowWithSameComponents( "line", lines, jc ); 

const centeredRowWithLines = lines => rowWithLines( lines, "center" ); 

const rowWithPoints = ( points, jc ) => rowWithSameComponents( "point", points, jc ); 

const centeredRowWithPoints = points => rowWithPoints( points, "center" ); 


const sample_structure = [
	rowWithStartCircle(),
	centeredRowWithPoints({ lh: 20, l: "ROK I (2015/2016)", lp: "left", p: true }),
	
	{
		component: DropdownGroup,
		children: [
			centeredRowWithPoints({ lh: 24, l: "Rok w trakcie", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "Sesja egzaminacyjna", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "niezaliczenie I roku", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "skreślenie z listy studentów", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "wniosek o wznowienie na studia", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 50, l: "wznowienie na studia", lp: "left", p: true }),
		]
	},
	
	centeredRowWithPoints({ lh: 20, l: "ROK I (2016/2017)", lp: "right", p: true }),

	{
		component: DropdownGroup,
		children: [
			centeredRowWithPoints({ lh: 24, l: "Rok w trakcie", lp: "right", p: true }),		
			centeredRowWithPoints({ lh: 24, l: "Sesja egzaminacyjna", lp: "right", p: true }),
			centeredRowWithPoints({ lh: 24, l: "Warunkowe zaliczenie I roku", lp: "right", p: true }),			
			centeredRowWithPoints({ lh: 50, l: "Podanie o wpis warunkowy", lp: "right", p: true })
		]
	},

	centeredRowWithPoints({ lh: 20, l: "ROK II (2017/2018) (wpis warunkowy)", lp: "left", p: true }),

	{
		component: DropdownGroup,
		children: [
			centeredRowWithPoints({ lh: 24, l: "Rok w trakcie", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "Sesja egzaminacyjna", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "zaliczenie warunku", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "niezaliczenie II roku", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "podanie o powtarzanie", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 50, l: "podanie o urlop", lp: "left", p: true })
		]
	},
	
	centeredRowWithPoints({ lh: 20, l: "Urlop (2018/2019)", lp: "right", p: true }),

	centeredRowWithPoints({ lh: 20, l: "ROK II (2019/2020)", lp: "left", p: true }),

	{
		component: DropdownGroup,
		children: [
			centeredRowWithPoints({ lh: 20, l: "Rok w trakcie", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 24, l: "Sesja egzaminacyjna", lp: "left", p: true }),
			centeredRowWithPoints({ lh: 50, l: "zaliczenie II roku", lp: "left", p: true })
		]
	},

	centeredRowWithPoints({ lh: 20, l: "ROK III (2020/2021)", lp: "right", p: true }),

	{
		component: DropdownGroup,
		children: [
			rowWithLines({
				w: MOSConstants.PointLabel.Width + MOSConstants.Point.Circle.Size + MOSConstants.Point.InnerCircle.Size,
				l: MOSConstants.Point.spaceBetweenCircleAndInnerCircle,
				p: "relative"
			}),

			rowWithLines([
				{ h: 20, l: MOSConstants.Point.spaceBetweenCircleAndInnerCircle, p: "relative" },
				{ h: 20, l: Layout.container_width / 2 - MOSConstants.Line.Size * 1.5, p: "relative" }
			]),

			rowWithPoints([
				{ lh: 20, l: "Wnioski", lp: "right",  aelh: MOSConstants.Point.Circle.Size * 3 + 35 + MOSConstants.Line.Size + 20 + 60 + 70 },
				{ lh: 20, l: "Rok w trakcie", lp: "right", left: MOSConstants.Point.PositionsLeftValue.center - MOSConstants.Point.Circle.Size }
			]),
				
			centeredRowWithPoints({ lh: 35, l: "Sesja egzaminacyjna", lp: "right" }),

			centeredRowWithLines({
				w: MOSConstants.Point.PositionsLeftValue.center_right - MOSConstants.Point.PositionsLeftValue.center_left + MOSConstants.Point.InnerCircle.Size,
				p: "relative"
			}),

			rowWithLines([
				{ h: 20, l: Layout.container_width / 4 - MOSConstants.Line.Size / 2, p: "relative" },
				{ h: 20, l: Layout.container_width / 4 * 3 - MOSConstants.Line.Size * 1.5, p: "relative" }
			]),

			rowWithPoints([
				{ lh: 60, l: "niezaliczenie III roku" },
				{ lh: 60, l: "zaliczenie III roku", aelh: MOSConstants.Point.Circle.Size + 70 + MOSConstants.Line.Size },
			], "space-around"),

			rowWithPoints({ lh: 70, l: "podanie o powtarzanie", left: MOSConstants.Point.PositionsLeftValue.center_left }),

			rowWithLines({
				w: MOSConstants.Point.PositionsLeftValue.center_left + MOSConstants.Point.InnerCircle.Size,
				l: MOSConstants.Point.spaceBetweenCircleAndInnerCircle,
				p: "relative"
			}),

			rowWithLines({
				w: MOSConstants.Point.PositionsLeftValue.center_right - MOSConstants.Point.PositionsLeftValue.center + MOSConstants.Line.Size,
				l: Layout.container_width / 2 - MOSConstants.Line.Size / 2,
				p: "relative"
			})
		]
	},

	centeredRowWithLines({ h: 30, p: "relative" }),

	centeredRowWithPoints({ lh: 20, l: "PRACA DYPLOMOWA", lp: "right" }),

	{
		component: DropdownGroup,
		children: [
			centeredRowWithLines({
				w: Layout.container_width - 40 - MOSConstants.Point.spaceBetweenCircleAndInnerCircle * 2,
				p: "relative"
			}),

			rowWithLines([
				{ h: 20, l: 20 + MOSConstants.Point.spaceBetweenCircleAndInnerCircle, p: "relative"},
				{ h: 20, p: "relative"},
				{ h: 20, l: -20 - MOSConstants.Point.spaceBetweenCircleAndInnerCircle, p: "relative"},

				{ 
					h: 100 + 20 + MOSConstants.Point.Circle.Size, 
					l: 90				},
				{
					w: 90 + MOSConstants.Line.Size - 20 - MOSConstants.Point.spaceBetweenCircleAndInnerCircle,
					l: 20 + MOSConstants.Point.spaceBetweenCircleAndInnerCircle,
					t: 100 + 20 + MOSConstants.Point.Circle.Size
				}
			], "space-between"),

			rowWithPoints([
				{
					lh: 100,
					lw: 96,
					l: "Przedłużenie terminu obrony do 3 miesięcy",
					left: 20
				},
				{
					lh: 400,
					lw: 96,
					l: "DOKUMENTY\n\n" +
						"Podanie o wszczęcie postępowania\n\n" +
						"Oświadczenie o samodzielności wykonanej pracy\n\n" +
						"Zgoda na archiwizację\n\n" +
						"Pisemna informacja o składzie komisji",
				},
				{
					lh: 110,
					lw: 96,
					l: "Niezłożenie wymaganych dokumentów w terminie",
					el: "skreślenie z listy studentów",
					left: -20
				}
			], "space-between"),

			centeredRowWithPoints({
				lh: 220,
				lw: Layout.container_width,
				l: "Wgranie pracy do APD\n\n" + 
					"Zatwierdzenie przez promotora\n\n" +
					
					"Dostarczenie dokumentów do dziekanatu\n" +
					"(w ciągu dwóch dni):\n" +
					"- wydrukowana praca z APD\n" +
					"- 4 zdjęcia w formacie 3,5 x 4,5 cm\n" +
					"- dowód wpłaty 60 zł za dyplom\n" +
					"- informacje o dodatkowych osiągnieciach"
			}),

			centeredRowWithPoints({
				lh: 50,
				l: "OBRONA"
			})
		] 
	},

	rowWithFinishCircle() 
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