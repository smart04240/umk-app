
const same_last_part =  [
	{
		name: "zaliczenie III roku",
		value: [ "Z", "A" ],
		options: [
			{
				value: "1",
				name: "Przełużenie terminu obrony",
				text: "Możesz przedłużyć termin obrony do 3 miesiecy - skontaktuj się z dziekanatem i złóż odpowiednie wnioski."
			},
			{
				value: "2",
				name: "Złożenie dokumentów",
				text: "Jeśli chcesz bronić się w terminie musisz złożyć odpowiednie dokumenty. Procedura opisana jest w Twoim profilu, w zakładce \"Zdarzenia\""
			},
			{
				value: "3",
				name: "Niezłożenie dokumentów",
				text: "Jeśli nie złożysz wymaganych dokumentów w terminie, niestety, zostaniesz skreślony z listy studentów!"
			}
		]
	},
	{
		name: "niezaliczenie III roku",
		value: [ "N", "R" ],
		text: "Jeśli nie zaliczysz III roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie III roku!"
	}
]


export default [
	{
		name: "zaliczenie I roku",
		value: [ "Z", "A" ],
		options: [
			{
				name: "zaliczenie II roku",
				value: [ "Z", "A" ],
				options: same_last_part
			},
			{
				name: "warunkowe zaliczenie II roku",
				value: "W",
				options: [
					{
						name: "zaliczenie warunku",
						value: "S",
						options: same_last_part
					},
					{
						name: "niezaliczenie warunku lub III roku",
						value: "T",
						options: null,
						text: "Jeśli nie zaliczysz III roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie III roku!"
					}
				]
			},
			{
				name: "niezaliczenie II roku",
				value: [ "N", "R" ],
				options: null,
				text: "Jeśli nie zaliczysz II roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie II roku!"
			}
		]
	},
	{
		name: "warunkowe zaliczenie I roku",
		value: "W",
		options: [
			{
				name: "zaliczenie warunku",
				value: "S",
				options: [
					{
						name: "zaliczenie II roku",
						value: [ "Z", "A" ],
						options: same_last_part
					},
					{
						name: "warunkowe zaliczenie II roku",
						value: "W",
						options: [
							{
								name: "zaliczenie warunku",
								value: "S",
								options: same_last_part
							},
							{
								name: "niezaliczenie warunku lub III roku",
								value: "T",
								options: null,
								text: "Jeśli nie zaliczysz III roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie III roku!"
							}
						]
					},
					{
						name: "niezaliczenie II roku",
						value: [ "N", "R" ],
						options: null,
						text: "Jeśli nie zaliczysz II roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie II roku!"
					}
				]
			},
			{
				name: "niezaliczenie warunku lub II roku",
				value: "T",
				options: null,
				text: "Jeśli nie zaliczysz II roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie II roku!"
			}
		]
	},
	{
		name: "niezaliczenie I roku",
		value: [ "N", "R" ],
		options: null,
		text: "Jeśli nie zaliczysz I roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie I roku!"
	}
]