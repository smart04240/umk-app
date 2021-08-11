
const same_last_part =  [
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


export default [
	{
		name: "zaliczenie I roku",
		value: [ "Z", "A" ],
		text: "Jeżeli zaliczysz I rok zostajesz zapisany na rok II",
		options: [
			{
				name: "zaliczenie II roku",
				value: [ "Z", "A" ],
				text: "Jeśli zaliczysz II rok, możesz rozpocząć procedurę złożenia pracy dyplomowej!",
				options: same_last_part
			},
			{
				name: "niezaliczenie II roku",
				value: [ "N", "R" ],
				text: "Jeśli nie zaliczysz II roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie II roku!"
			}
		]
	},
	{
		name: "warunkowe zaliczenie I roku",
		value: "W",
		text: "Jeśli zaliczysz warunek, a następnie zaliczysz I rok warunkowo, musisz złożyć podanie o wpis warunkowy. Pamiętaj, że rok później muszisz zaliczyć warunek oraz rok II!",
		options: [
			{
				name: "zaliczenie warunku i II roku",
				value: "S",
				text: "Jeśli zaliczysz II rok, możesz rozpocząć procedurę złożenia pracy dyplomowej!",
				options: same_last_part
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