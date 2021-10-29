import Translations from "../../../constants/Translations";
import { 
	getCompletionYear, 
	getLastCompletionMISHYear, 
	getConditionalCompletionYear, 
	getFailureYear, 
	getLastFailureMISHYear, 
	getFailureCondition 
} from "./simulations_parts";

export default [
	{
		name: Translations.SubmissionOfTheStudyProgram,
		value: "1",
		text: Translations.SubmissionOfTheStudyProgramText,
		options: [
			{
				...getCompletionYear(1),
				options: [
					getLastCompletionMISHYear(2),
					getLastFailureMISHYear(2)
				]
			},
			
			{
				...getConditionalCompletionYear(1),
				options: [
					{
						name: Translations.PassingTheCondition,
						value: "S",
						options: [
							getLastCompletionMISHYear(2),
							getLastFailureMISHYear(2)
						]
					},
					
					getFailureCondition(2)
				]
			},

			getFailureYear(1)
		]
	},
	{
		name: Translations.FailureToSubmitTheStudyProgramOnTime,
		value: "2",
		text: Translations.FailureToSubmitTheStudyProgramOnTimeText
	}
]