import { yearToRomanNumeral } from "../../../helpers/functions";

export const getCompletionYear = year => ({
	name: `zaliczenie ${ yearToRomanNumeral( year )} roku`,
	value: [ "Z", "A" ],
	text: `Jeżeli zaliczysz ${ yearToRomanNumeral( year )} rok zostajesz zapisany na rok ${ yearToRomanNumeral( year + 1 )}`,
})

export const getLastCompletionYear = year => ({
	name: `zaliczenie ${ yearToRomanNumeral( year )} roku`,
	value: [ "Z", "A" ],
	text: `Jeśli zaliczysz ${ yearToRomanNumeral( year )} rok, możesz rozpocząć procedurę złożenia pracy dyplomowej!`,
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
})

export const getConditionalCompletionYear = year => ({
	name: `warunkowe zaliczenie ${ yearToRomanNumeral( year )} roku`,
	value: "W",
	text: `Jeśli zaliczysz warunek, a następnie zaliczysz ${ yearToRomanNumeral( year )} rok warunkowo, musisz złożyć podanie o wpis warunkowy. Pamiętaj, że rok później muszisz zaliczyć warunek oraz rok ${ yearToRomanNumeral( year + 1 )}!`,
})

export const getFailureYear = year => ({
	name: `niezaliczenie ${ yearToRomanNumeral( year )} roku`,
	value: [ "N", "R" ],
	text: `Jeśli nie zaliczysz ${ yearToRomanNumeral( year )} roku, a chcesz kontynuować studia, musisz złożyć podanie o powtarzanie ${ yearToRomanNumeral( year )} roku!`
})

export const getFailureCondition = year => ({
	name: `niezaliczenie warunku lub ${ yearToRomanNumeral( year )} roku`,
	value: "T",
	text: `Jeżeli nie zaliczysz warunku, musisz złożyć podanie o powtarzanie. Czeka Cię powtórka ${ yearToRomanNumeral( year )} roku!`
})