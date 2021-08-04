import StartCircle from "../StartCircle";
import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";
import FinishCircle from "../FinishCircle";
import MOSConstants from "../../../constants/MOSConstants";

export default [

	{
		Component: Branch,
		year: 1,
		children: [
			{
				Component: StartCircle
			},
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
	},

	{
		Component: BranchesNode,
		year: 1,
		branches: [
			{
				Component: Branch,
				year: 1,
				year_status: [ "Z", "A" ],
				children: [
					{ 
						Component: Point, 
						year: 1, 
						label: "zaliczenie I roku", 
						bottom_margin: 20  
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 1,
						label: "ROK II #year#years",
						small_label: "Wnioski ogólne\n(do #term_field#start_date)",
						bottom_margin: 20  
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 6,
						label: "Sesja egzaminacyjna zimowa", 
						small_label: "(od #term_field#start_date do #term_field#end_date)",
						bottom_margin: 20  
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 7,
						label: "Sesja egzaminacyjna letnia", 
						small_label: "(od #term_field#start_date do #term_field#end_date)",
						bottom_margin: 20  
					}
				]
			},
			{
				Component: Branch,
				year: 1,
				year_status: "W",
				children: [
					{ 
						Component: Point, 
						year: 1,
						label: "warunkowe zaliczenie I roku",
						bottom_margin: 20 
					},
					{ 
						Component: Point,
						year: 1,
						term_field_id: 3,
						label: "podanie o wpis warunkowy", 
						small_label: "(do #term_field#start_date)", 
						bottom_margin: 20
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 1,
						label: "ROK II #year#years\n(wpis warunkowy)", 
						small_label: "Wnioski ogólne\n(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 6,
						label: "Sesja egzaminacyjna zimowa",
						small_label: "(od #term_field#start_date do #term_field#end_date)", 
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 7,
						label: "Sesja egzaminacyjna letnia",
						small_label: "(od #term_field#start_date do #term_field#end_date)", 
						bottom_margin: 20 
					},
					{
						Component: BranchesNode,
						year: 2,
						inner: true,
						branches: [
							{
								Component: Branch,
								year: 2,
								year_status: "S",
								children: {
									Component: Point,
									label: "zaliczenie warunku",
									bottom_margin: 100
								}
							},
							{
								Component: Branch,
								year: 2,
								year_status: "T",
								dead_end: true,
								absolute: true,
								left: MOSConstants.Column.Default,
								children: [
									{ Component: Point,  label: "niezaliczenie warunku", bottom_margin: 20 },
									{ Component: Point,  label: "powtarzanie I roku" }
								]
							}
						]
					}
				]
			},
			{
				Component: Branch,
				year: 1,
				year_status: [ "N", "R" ],
				dead_end: true,
				children: [
					{ 
						Component: Point, 
						year: 1, 
						label: "niezaliczenie I roku", 
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 1,
						term_field_id: 2,
						label: "podanie o powtarzanie", 
						small_label: "(do #term_field#start_date)" 
					}
				]
			}
		]
	},

	{
		Component: BranchesNode,
		year: 2,
		branches: [
			{
				Component: Branch,
				year: 2,
				year_status: [ "Z", "A" ],
				children: [
					{ 
						Component: Point, 
						year: 2, 
						label: "zaliczenie II roku", 
						bottom_margin: 20 
					},
					{ 
						Component: Point,
						year: 3,
						term_field_id: 1, 
						label: "ROK III #year#years", 
						small_label: "Wnioski ogólne\n(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 3,
						term_field_id: 6,
						label: "Sesja egzainacyjna zimowa", 
						small_label: "(od #term_field#start_date do #term_field#end_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 3,
						term_field_id: 7,
						label: "Sesja egzaminacyjna letnia", 
						small_label: "(od #term_field#start_date do #term_field#end_date)",
						bottom_margin: 20 
					}
				]
			},
			{
				Component: Branch,
				year: 2,
				year_status: "W",
				children: [
					{ 
						Component: Point, 
						year: 2, 
						label: "warunkowe zaliczenie II roku", 
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 3,
						label: "podanie o wpis warunkowy", 
						small_label: "(do #term_field#start_date)", 
						bottom_margin: 20 
					},
					{ 
						Component: Point,
						year: 3,
						term_field_id: 1, 
						label: "ROK III #year#years\n(wpis warunkowy)", 
						small_label: "Wnioski ogólne\n(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 3,
						term_field_id: 6,
						label: "Sesja egzainacyjna zimowa", 
						small_label: "(od #term_field#start_date do #term_field#end_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 3,
						term_field_id: 7,
						label: "Sesja egzaminacyjna letnia", 
						small_label: "(od #term_field#start_date do #term_field#end_date)",
						bottom_margin: 20 
					},
					{
						Component: BranchesNode,
						year: 3,
						inner: true,
						branches: [
							{
								Component: Branch,
								year: 3,
								year_status: "S",
								children: {
									Component: Point,
									year: 3,
									label: "zaliczenie warunku",
									bottom_margin: 100
								}
							},
							{
								Component: Branch,
								year: 3,
								year_status: "T",
								dead_end: true,
								absolute: true,
								left: MOSConstants.Column.Default,
								children: [
									{ Component: Point, year: 3, label: "niezaliczenie warunku", bottom_margin: 20 },
									{ Component: Point, year: 3, label: "powtarzanie II roku" }
								]
							}
						]
					}
				]
			},
			{
				Component: Branch,
				year: 2,
				year_status: [ "N", "R" ],
				dead_end: true,
				children: [
					{ 
						Component: Point, 
						year: 2, 
						label: "niezaliczenie II roku", 
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 2, 
						term_field_id: 2,
						label: "podanie o powtarzanie", 
						small_label: "(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ Component: Point, year: 2, label: "powtarzanie II roku" }
				]
			}
		]
	},

	{

		Component: BranchesNode,
		year: 3,
		branches: [
			{
				Component: Branch,
				year: 3,
				year_status: [ "Z", "A" ],
				children: {
					Component: Point,
					year: 3,
					label: "zaliczenie III roku"
				}
			},
			{
				Component: Branch,
				year: 3,
				year_status: [ "N", "R" ],
				dead_end: true,
				children: [
					{ 
						Component: Point, 
						year: 3, 
						label: "niezaliczenie III roku", 
						bottom_margin: 20 
					},
					{
						Component: Point, 
						year: 3, 
						term_field_id: 2,
						label: "podanie o powtarzanie", 
						small_label: "(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ Component: Point, year: 3, label: "powtarzanie III roku" }
				]
			}
		]
	},

	{
		Component: Branch,
		year: 3,
		children: {
			Component: Point,
			label: "PRACA DYPLOMOWA"
		}
	},

	{
		Component: BranchesNode,
		year: 3,
		branches: [
			{
				Component: Branch,
				year: 3,
				dead_end: true,
				children: { Component: Point, year: 3, label: "Przedłużenie terminu obrony do 3 miesięcy" }
			},
			{
				Component: Branch,
				year: 3,
				children: {
					Component: Point,
					year: 3,
					term_field_id: 8,
					label: "DOKUMENTY\n\nPodanie o wszczęcie postępowania\n\nOświadczenie o samodzielności wykonanej pracy\n\nZgoda na archiwizację\n\nPisemna informacja o składzie komisji",
					small_label: "(do #term_field#start_date)",
					bottom_margin: 20
				}
			},
			{
				Component: Branch,
				year: 3,
				dead_end: true,
				children: [
					{ Component: Point, year: 3, label: "Niezłożenie wymaganych dokumentów w terminie", bottom_margin: 20 },
					{ Component: Point, year: 3, label: "skreślenie z listy studentów" }
				]
			}
		]
	},
	{
		Component: Branch,
		year: 3,
		dead_end: true,
		children: [
			{
				Component: Point,
				year: 3,
				label: "Wgranie pracy do APD\n\nZatwierdzenie przez promotora\n\nDostarczenie dokumentów do dziekanatu\n(w ciągu dwóch dni):\n- wydrukowana praca z APD\n- 4 zdjęcia w formacie 3,5 x 4,5 cm\n- dowód wpłaty 60 zł za dyplom\n- informacje o dodatkowych osiągnieciach",
				bottom_margin: 20
			},
			{
				Component: Point,
				year: 3,
				label: "OBRONA",
				bottom_margin: 20
			},
			{
				Component: FinishCircle
			}
		]
	}
]
