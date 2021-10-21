import MOSConstants from "../../../constants/MOSConstants";
import { yearToRomanNumeral } from "../../../helpers/functions";

import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";
import FinishCircle from "../FinishCircle";

export const getBeginningBranch = () => (
	{
		Component: Branch,
		year: 1,
		children: [
			{
				Component: Point,
				year: 1,
				term_field_id: 1,
				label: "ROK I #year#years",
				small_label: "Wnioski ogólne\n(do #term_field#start_date)",
				label_position: "left",
				bottom_margin: 5,
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 6,
				label: "Sesja egzaminacyjna zimowa",
				small_label: "(od #term_field#start_date do #term_field#end_date)",
				label_position: "left",
				bottom_margin: 5
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 7,
				label: "Sesja egzaminacyjna letnia",
				small_label: "(od #term_field#start_date do #term_field#end_date)",
				label_position: "left",
				bottom_margin: 5
			},
		]
	}
)


export const getCompletionBranch = year => (
	{
		Component: Branch,
		year: year,
		year_status: [ "Z", "A", "S" ],
		children: [
			{ 
				Component: Point, 
				year: year, 
				label: `zaliczenie ${ yearToRomanNumeral( year )} roku`, 
				bottom_margin: 20  
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 1,
				label: `ROK ${ yearToRomanNumeral( year + 1 )} #year#years`,
				small_label: "Wnioski ogólne\n(do #term_field#start_date)",
				bottom_margin: 20  
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 6,
				label: "Sesja egzaminacyjna zimowa", 
				small_label: "(od #term_field#start_date do #term_field#end_date)",
				bottom_margin: 20  
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 7,
				label: "Sesja egzaminacyjna letnia", 
				small_label: "(od #term_field#start_date do #term_field#end_date)",
				bottom_margin: 20  
			}
		]
	}
)


export const getConditionalCompletionBranch = year => (
	{
		Component: Branch,
		year: year,
		year_status: "W",
		children: [
			{ 
				Component: Point, 
				year: year,
				label: `warunkowe zaliczenie ${ yearToRomanNumeral( year )} roku`,
				bottom_margin: 20 
			},
			{ 
				Component: Point,
				year: year,
				term_field_id: 3,
				label: "podanie o wpis warunkowy", 
				small_label: "(do #term_field#start_date)", 
				bottom_margin: 20
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 1,
				label: `ROK ${ yearToRomanNumeral( year + 1)} #year#years\n(wpis warunkowy)`, 
				small_label: "Wnioski ogólne\n(do #term_field#start_date)",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 6,
				label: "Sesja egzaminacyjna zimowa",
				small_label: "(od #term_field#start_date do #term_field#end_date)", 
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 7,
				label: "Sesja egzaminacyjna letnia",
				small_label: "(od #term_field#start_date do #term_field#end_date)", 
				bottom_margin: 20 
			},
			{
				Component: BranchesNode,
				year: year + 1,
				inner: true,
				branches: [
					{
						Component: Branch,
						year: year + 1,
						year_status: "S",
						children: {
							Component: Point,
							year: year + 1,
							label: "zaliczenie warunku",
							bottom_margin: 100
						}
					},
					{
						Component: Branch,
						year: year + 1,
						year_status: "T",
						dead_end: true,
						absolute: true,
						left: MOSConstants.Column.Default,
						children: [
							{ 
								Component: Point, 
								year: year + 1, 
								label: "niezaliczenie warunku", 
								bottom_margin: 20 
							},
							{ 
								Component: Point, 
								year: year + 1, 
								label: `powtarzanie ${ yearToRomanNumeral( year + 1 )} roku` 
							}
						]
					}
				]
			}
		]
	}
)


export const getFailureBranch = year => (
	{
		Component: Branch,
		year: year,
		year_status: [ "N", "R" ],
		dead_end: true,
		children: [
			{ 
				Component: Point, 
				year: year, 
				label: `niezaliczenie ${ yearToRomanNumeral( year )} roku`, 
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year, 
				term_field_id: 2,
				label: "podanie o powtarzanie", 
				small_label: "(do #term_field#start_date)",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: 2, 
				label: `powtarzanie ${ yearToRomanNumeral( year )} roku` 
			}
		]
	}
)


export const getPreDiplomaPart = year => (
	{
		Component: BranchesNode,
		year,
		branches: [
			{
				Component: Branch,
				year,
				year_status: [ "Z", "A" ],
				children: {
					Component: Point,
					year: 3,
					label: `zaliczenie ${ yearToRomanNumeral( year )} roku`
				}
			},

			getFailureBranch( year )
		]
	}
)


export const getDiplomaParts = year => (
	[
		{
			Component: Branch,
			year_status: [ "A", "Z", "S" ],
			year,
			children: {
				Component: Point,
				year,
				label: "PRACA DYPLOMOWA"
			}
		},
	
		{
			Component: BranchesNode,
			year_status: [ "A", "Z", "S" ],
			year,
			branches: [
				{
					Component: Branch,
					year,
					dead_end: true,
					children: { 
						Component: Point, 
						year, 
						label: "Przedłużenie terminu obrony do 3 miesięcy" 
					}
				},
				{
					Component: Branch,
					year,
					children: {
						Component: Point,
						year,
						term_field_id: 8,
						label: "DOKUMENTY\n\nPodanie o wszczęcie postępowania\n\nOświadczenie o samodzielności wykonanej pracy\n\nZgoda na archiwizację\n\nPisemna informacja o składzie komisji",
						small_label: "(do #term_field#start_date)",
						bottom_margin: 20
					}
				},
				{
					Component: Branch,
					year,
					dead_end: true,
					children: [
						{ 
							Component: Point,
							year, 
							label: "Niezłożenie wymaganych dokumentów w terminie", 
							bottom_margin: 20 
						},
						{ 
							Component: Point, 
							year, 
							label: "skreślenie z listy studentów" 
						}
					]
				}
			]
		},
	
		{
			Component: Branch,
			year_status: [ "A", "Z", "S" ],
			year,
			dead_end: true,
			children: [
				{
					Component: Point,
					year,
					label: "Wgranie pracy do APD\n\nZatwierdzenie przez promotora\n\nDostarczenie dokumentów do dziekanatu\n(w ciągu dwóch dni):\n- wydrukowana praca z APD\n- 4 zdjęcia w formacie 3,5 x 4,5 cm\n- dowód wpłaty 60 zł za dyplom\n- informacje o dodatkowych osiągnieciach",
					bottom_margin: 20
				},
				{
					Component: Point,
					year,
					label: "OBRONA",
					bottom_margin: 20
				},
				{ Component: FinishCircle }
			]
		}
	]
)


export const getMISHEndPart = () => (
	{
		Component: Branch,
		year: 2,
		year_status: [ "A", "Z", "S" ],
		dead_end: true,
		children: { 
			Component: FinishCircle,
			mish: true,
			text: "120 ECTS\nPrzeniesienie na III rok kierunku, którego minimum programowe realizujesz " 
		}
	}
)