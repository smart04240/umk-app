import StartCircle from "../StartCircle";
import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";
import FinishCircle from "../FinishCircle";
import MOSConstants from "../../../constants/MOSConstants";

export default [
	{
		Component: Branch,
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
			}
		]
	},

	{
		Component: BranchesNode,
		end: "half-right",
		branches: [
			{
				Component: Branch,
				children: [
					{ year: 1, Component: Point, label: "zaliczenie I roku", bottom_margin: 20 },
					{ Component: Point, label: "ROK II", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzaminacyjna zimowa", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzaminacyjna letnia", bottom_margin: 350 },
					{
						Component: BranchesNode,
						inner: true,
						branches: [
							{
								Component: Branch,
								dead_end: true,
								absolute: true,
								left: 0,
								children: [
									{ Component: Point, label: "niezaliczenie II roku", bottom_margin: 20 },
									{ Component: Point, label: "podanie o powtarzanie", bottom_margin: 0 },
								]
							},
							{
								Component: Branch,
								left: MOSConstants.Column.Default,
								children: { Component: Point, label: "zaliczenie II roku", bottom_margin: 60 }
							}
						]
					}
				]
			},
			{
				Component: Branch,
				dead_end: true,
				children: [
					{ year: 1, Component: Point, label: "warunkowe zaliczenie I roku", bottom_margin: 20 },
					{ 
						Component: Point,
						year: 1,
						term_field_id: 3,
						label: "podanie o wpis warunkowy", 
						small_label: "(do #term_field#start_date)", 
						bottom_margin: 20 
					},
					{ Component: Point, label: "ROK II\n(wpis warunkowy)", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzaminacyjna zimowa", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzaminacyjna letnia", bottom_margin: 20 },
					{
						Component: BranchesNode,
						inner: true,
						branches: [
							{
								Component: Branch,
								dead_end: true,
								absolute: true,
								left: 0,
								children: [
									{ Component: Point, label: "niezaliczenie warunku lub II roku", bottom_margin: 20 },
									{ Component: Point, label: "powtarzanie I roku" },
								]
							},
							{
								Component: Branch,
								left: MOSConstants.Column.Default,
								children: { Component: Point, label: "zaliczenie warunku i II roku", bottom_margin: 235 }
							}
						]
					}
				]
			},
			{
				Component: Branch,
				dead_end: true,
				children: [
					{ year: 1, Component: Point, label: "niezaliczenie I roku", bottom_margin: 20 },
					{ 
						Component: Point, 
						year: 1,
						term_field_id: 3,
						label: "podanie o powtarzanie", 
						small_label: "(do #term_field#start_date)", 
						bottom_margin: 20 
					},
					{ Component: Point, label: "powtarzanie I roku" }
				]
			}
		]
	},

	{
		Component: Branch,
		children: {
			Component: Point,
			label: "PRACA DYPLOMOWA"
		}
	},

	{
		Component: BranchesNode,
		end: "middle",
		branches: [
			{
				Component: Branch,
				dead_end: true,
				children: { Component: Point,  label: "Przedłużenie terminu obrony do 3 miesięcy" }
			},
			{
				Component: Branch,
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
				dead_end: true,
				children: [
					{ Component: Point, label: "Niezłożenie wymaganych dokumentów w terminie", bottom_margin: 20 },
					{ Component: Point, label: "skreślenie z listy studentów" }
				]
			}
		]
	},

	{
		Component: Branch,
		dead_end: true,
		children: [
			{
				Component: Point,
				label: "Wgranie pracy do APD\n\nZatwierdzenie przez promotora\n\nDostarczenie dokumentów do dziekanatu\n(w ciągu dwóch dni):\n- wydrukowana praca z APD\n- 4 zdjęcia w formacie 3,5 x 4,5 cm\n- dowód wpłaty 60 zł za dyplom\n- informacje o dodatkowych osiągnieciach",
				bottom_margin: 20
			},
			{
				Component: Point,
				label: "OBRONA",
				bottom_margin: 20
			},
			{
				Component: FinishCircle
			}
		]
	}
]
