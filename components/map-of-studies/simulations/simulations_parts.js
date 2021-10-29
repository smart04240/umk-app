import Translations from "../../../constants/Translations";
import { yearToRomanNumeral } from "../../../helpers/functions";

export const getCompletionYear = year => ({
	complex_name: `#CompletingYear ${ yearToRomanNumeral( year )}`,
	value: [ "Z", "A", "S" ],
	text: `#CompletingYearTextPart1 ${ yearToRomanNumeral( year )} #CompletingYearTextPart2 ${ yearToRomanNumeral( year + 1 )}`,
});


export const getLastCompletionYear = year => ({
	complex_name: `#CompletingYear ${ yearToRomanNumeral( year )}`,
	value: [ "Z", "A", "S" ],
	complex_text: `#CompletingYearTextPart1 ${ yearToRomanNumeral( year )} #CompletingYearTextPart3`,
	options: [
		{
			value: "1",
			name: Translations.ExtensionOfTheTermOfDefence,
			text: Translations.ExtensionOfTheTermOfDefenceText
		},
		{
			value: "2",
			name: Translations.SubmissionOfDocuments,
			text: Translations.SubmissionOfDocumentsText
		},
		{
			value: "3",
			name: Translations.FailureToSubmitDocuments,
			text: Translations.FailureToSubmitDocumentsText
		}
	]
});


export const getLastCompletionMISHYear = () => ({
	complex_name: '#CompletingYear II',
	value: [ "Z", "A", "S" ],
	complex_text: `#CompletingYearTextPart1 II #CompletingYearTextPart4 III #CompletingYearTextPart5`
});


export const getLastFailureMISHYear = () => ({
	complex_name: `#FailureToPastTheYear II`,
	value: [ "N", "R" ],
	complex_text: `#FailureYearTextPart1 II #FailureYearTextPartMISH`
})


export const getConditionalCompletionYear = year => ({
	name: `#ConditionalCompletingYear ${ yearToRomanNumeral( year )}`,
	value: "W",
	complex_text: `#ConditionalCompletingYearTextPart1 ${ yearToRomanNumeral( year )} #ConditionalCompletingYearTextPart2 ${ yearToRomanNumeral( year + 1 )}!`,
});


export const getFailureYear = year => ({
	complex_name: `#FailureToPastTheYear ${ yearToRomanNumeral( year )}`,
	value: [ "N", "R" ],
	complex_text: `#FailureYearTextPart1 ${ yearToRomanNumeral( year )} #FailureYearTextPart2 ${ yearToRomanNumeral( year )}!`
});


export const getFailureCondition = year => ({
	complex_name: `#FailureOfTheConditionOrYear ${ yearToRomanNumeral( year )}`,
	value: "T",
	text: `#FailureOfTheConditionOrYearText ${ yearToRomanNumeral( year )}!`
});


export const buildSimulations = end_year => {
	
	const buildOneYear = year => {
		
		if ( year === end_year ) {
			return [
				getLastCompletionYear( year ),
				getFailureYear( year )
			]
		}

		return [
			{
				...getCompletionYear( year ),
				options: [ ...buildOneYear( year + 1)]
			},

			{
				...getConditionalCompletionYear( year ),
				options: [
					{
						complex_name: Translations.PassingTheCondition,
						value: "S",
						options: [...buildOneYear( year + 1 )]
					},
					
					getFailureCondition( year + 1 )
				]
			},
		
			getFailureYear( year )
		]
	}

	return buildOneYear(1)
}