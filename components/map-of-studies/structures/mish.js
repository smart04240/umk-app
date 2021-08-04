import StartCircle from "../StartCircle";
import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";
import FinishCircle from "../FinishCircle";
import MOSConstants from "../../../constants/MOSConstants";

export default [
	{
		Component: Branch,
		children: { Component: StartCircle }
	},
	{
		Component: Branch,
		year: 1,
		children: [
			{ 
				Component: Point,
				year: 1,
				term_field_id: 1, 
				label_position: "left",
				label: "ROK I #year#years", 
				small_label: "Wnioski ogólne\n(do #term_field#start_date)", 
				bottom_margin: 5 
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 4,
				label_position: "left",
				label: "Złożenie wniosków\n(programy studiów)",
				small_label: "(do #term_field#start_date)",
				bottom_margin: 5
			}
		]
	},

	{
		Component: BranchesNode,
		year: 1,
		branches: [
			{
				Component: Branch,
				year: 1,
				children: [
					{ 
						Component: Point, 
						year: 1,
						term_field_id: 6,
						label: "Sesja egzaminacyjna zimowa", 
						small_label: "(od #term_field#start_date do #term_field#end_date)", 
						bottom_margin: 20 
					},
					{
						Component: Point, 
						year: 1,
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
				dead_end: true,
				children: [
					{ 
						Component: Point, 
						year: 1,
						label: "niezłożenie programu", 
						bottom_margin: 20 
					},
					{ 
						Component: Point,
						year: 1,
						label: "skreślenie z listy studnetów", 
						bottom_margin: 0 
					}
				]
			}
		]
	},

	{
		Component: BranchesNode,
		year: 1,
		end: "half-right",
		branches: [
			{
				Component: Branch,
				year: 1,
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
						term_field_id: 4,
						label: "Złożenie wniosków\n(programy studiów)", 
						small_label: "(do #term_field#start_date)",
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
						bottom_margin: 350 
					},
					{
						Component: BranchesNode,
						year: 2,
						inner: true,
						branches: [
							{
								Component: Branch,
								year: 2,
								dead_end: true,
								absolute: true,
								left: 0,
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
										bottom_margin: 0 
									}
								]
							},
							{
								Component: Branch,
								year: 2,
								left: MOSConstants.Column.Default,
								children: {
									Component: Point, 
									label: "zaliczenie II roku",
									bottom_margin: 60
								}
							}
						]
					}
				]
			},
			{
				Component: Branch,
				year: 1,
				dead_end: true,
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
						label: "ROK II #year#years \n(wpis warunkowy)", 
						small_label: "Wnioski ogólne\n(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 2,
						term_field_id: 4,
						label: "Złożenie wniosków\n(programy studiów)",
						small_label: "(do #term_field#start_date)",
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
								dead_end: true,
								absolute: true,
								left: 0,
								children: [
									{ 
										Component: Point, 
										year: 2,
										label: "niezaliczenie warunku lub II roku", 
										bottom_margin: 20 
									},
									{ 
										Component: Point,
										year: 2,
										label: "powtarzanie I roku" 
									},
								]
							},
							{
								Component: Branch,
								year: 2,
								left: MOSConstants.Column.Default,
								children: { 
									Component: Point, 
									year: 2,
									label: "zaliczenie warunku i II roku", 
									bottom_margin: 235 
								}
							}
						]
					}
					
				]
			},
			{
				Component: Branch,
				year: 1,
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
						small_label: "(do #term_field#start_date)",
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 1,
						label: "powtarzanie I roku", 
						bottom_margin: 0 
					}
				]
			}
		]
	},

	{
		Component: Branch,
		children: { 
			Component: Point, 
			year: 2,
			label: "PRACA DYPLOMOWA" 
		}
	},

	{	
		Component: BranchesNode,
		year: 2,
		end: "middle",
		branches: [
			{
				Component: Branch,
				year: 2,
				dead_end: true,
				children: { 
					Component: Point, 
					year: 2, 
					label: "Przedłużenie terminu obrony do 3 miesięcy" 
				}
			},
			{
				Component: Branch,
				year: 2,
				children: { 
					Component: Point,
					year: 2,
					term_field_id: 8,
					label: "DOKUMENTY\n\nPodanie o wszczęcie postępowania\n\nOświadczenie o samodzielności wykonanej pracy\n\nZgoda na archiwizację\n\nPisemna informacja o składzie komisji",
					small_label: "(do #term_field#start_date)",
					bottom_margin: 20
				}	
			},
			{
				Component: Branch,
				year: 2,
				dead_end: true,
				children: [
					{ 
						Component: Point, 
						year: 2, 
						label: "Niezłożenie wymaganych dokumentów w terminie", 
						bottom_margin: 20 
					},
					{ 
						Component: Point, 
						year: 2, 
						label: "skreślenie z listy studentów" 
					}
				]
			}
		]
	},

	{
		Component: Branch,
		year: 2,
		dead_end: true,
		children: [
			{
				Component: Point,
				year: 2,
				label: "Wgranie pracy do APD\n\nZatwierdzenie przez promotora\n\nDostarczenie dokumentów do dziekanatu\n(w ciągu dwóch dni):\n- wydrukowana praca z APD\n- 4 zdjęcia w formacie 3,5 x 4,5 cm\n- dowód wpłaty 60 zł za dyplom\n- informacje o dodatkowych osiągnieciach",
				bottom_margin: 20
			},
			{
				Component: Point,
				year: 2,
				label: "OBRONA",
				bottom_margin: 20
			},
			{
				Component: FinishCircle
			}
		]
	}
]