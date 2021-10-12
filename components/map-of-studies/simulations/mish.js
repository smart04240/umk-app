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
		name: "Złożenie programu studiów",
		value: "1",
		text: "Po złożeniu wniosków zostajesz dopuszczony do sesji!",
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
						name: "zaliczenie warunku",
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
		name: "Niezłożenie w terminie programu studiów",
		value: "2",
		text: "Niezłożenie programu studiów skutkuje skreśleniem z listy studentów!"
	}
]