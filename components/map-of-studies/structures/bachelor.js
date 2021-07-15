
import StartCircle from "../StartCircle";
import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";
import FinishCircle from "../FinishCircle";

export default [

	{
		Component: Branch,
		children: [
			{
				Component: StartCircle
			},
			{
				Component: Point,
				
				label: "ROK I (2015/2016)",
				small_label: "Wnioski ogólne\n(do 02.03.2016)",
				label_position: "left",
				bottom_margin: 5,
			},
			{
				Component: Point,
				
				label: "Sesja egzaminacyjna zimowa",
				small_label: "(od 21.01.2016 do 22.02.2016)",
				label_position: "left",
				bottom_margin: 5
			},
			{
				Component: Point,
				
				label: "Sesja egzaminacyjna letnia",
				small_label: "(od 21.01.2016 do 22.02.2016)",
				label_position: "left",
				bottom_margin: 5
			},
		]
	},

	{
		Component: BranchesNode,
		end: "half",
		branches: [
			{
				children: [
					{ Component: Point,  label: "zaliczenie I roku", bottom_margin: 20  },
					{ Component: Point,  label: "ROK II", bottom_margin: 20  },
					{ Component: Point,  label: "Sesja egzaminacyjna zimowa", bottom_margin: 20  },
					{ Component: Point,  label: "Sesja egzaminacyjna letnia", bottom_margin: 20  }
				]
			},
			{
				children: [
					{ Component: Point,  label: "warunkowe zaliczenie I roku", bottom_margin: 20 },
					{ Component: Point,  label: "podanie o wpis warunkowy", small_label: "(do 02.03.2016)", bottom_margin: 20, },
					{ Component: Point,  label: "ROK II\n(wpis warunkowy)", bottom_margin: 20 },
					{ Component: Point,  label: "Sesja egzaminacyjna zimowa", bottom_margin: 20 },
					{ Component: Point,  label: "Sesja egzaminacyjna letnia", bottom_margin: 20 },
					{
						Component: BranchesNode,
						inner: true,
						branches: [
							{
								children: { 
									Component: Point, 
									label: "zaliczenie warunku", 
									bottom_margin: 100 
								}								
							},
							{
								dead_end: true,
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
				dead_end: true,
				children: [
					{ Component: Point, label: "niezaliczenie I roku", bottom_margin: 20 },
					{ Component: Point, label: "podanie o powtarzanie", small_label: "(do 02.03.2016)" }
				]
			}
		]
	},
	
	{
		Component: BranchesNode,
		end: "half",
		branches: [
			{
				children: [
					{ Component: Point, label: "zaliczenie II roku", bottom_margin: 20 },
					{ Component: Point, label: "ROK III", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzainacyjna zimowa", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzaminacyjna letnia", bottom_margin: 20 }
				]
			},
			{
				children: [
					{ Component: Point, label: "warunkowe zaliczenie II roku", bottom_margin: 20 },
					{ Component: Point, label: "podanie o wpis warunkowy", bottom_margin: 20 },
					{ Component: Point, label: "ROK III\n(wpis warunkowy)", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzainacyjna zimowa", bottom_margin: 20 },
					{ Component: Point, label: "Sesja egzaminacyjna letnia", bottom_margin: 20 },
					{
						Component: BranchesNode,
						inner: true,
						branches: [
							{
								children: { 
									Component: Point,
									label: "zaliczenie warunku",
									bottom_margin: 100 
								}
							},
							{
								dead_end: true,
								children: [
									{ Component: Point, label: "niezaliczenie warunku", bottom_margin: 20 },
									{ Component: Point, label: "powtarzanie II roku" }
								]
							}
						]
					}
				]
			},
			{
				dead_end: true,
				children: [
					{ Component: Point, label: "niezaliczenie II roku", bottom_margin: 20 },
					{ Component: Point, label: "podanie o powtarzanie", bottom_margin: 20 },
					{ Component: Point, label: "powtarzanie II roku" }
				]
			}
		]
	},

	{

		Component: BranchesNode,
		end: "half",
		branches: [
			{
				children: { 
					Component: Point,
					label: "zaliczenie III roku"
				}
			},
			{
				dead_end: true,
				children: [
					{ Component: Point, label: "niezaliczenie III roku", bottom_margin: 20 },
					{ Component: Point, label: "podanie o powtarzanie", small_label: "(do 02.03.2016)", bottom_margin: 20 },
					{ Component: Point, label: "powtarzanie III roku" }
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
				dead_end: true,
				children: [
					{ Component: Point,  label: "Przedłużenie terminu obrony do 3 miesięcy" }
				]
			},
			{
				children: [
					{ 
						Component: Point,
						label: "DOKUMENTY\n\nPodanie o wszczęcie postępowania\n\nOświadczenie o samodzielności wykonanej pracy\n\nZgoda na archiwizację\n\nPisemna informacja o składzie komisji",
						bottom_margin: 20
					},
					
				]
			},
			{
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