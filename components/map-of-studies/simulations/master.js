
import { getCompletionYear, getLastCompletionYear, getConditionalCompletionYear, getFailureYear, getFailureCondition } from "./simulations_parts";

export default [
	{
		...getCompletionYear(1),
		options: [
			getLastCompletionYear(2),
			getFailureYear(2)
		]
	},
	{
		...getConditionalCompletionYear(1),
		options: [
			{
				name: "zaliczenie warunku",
				value: "S",
				options: [
					getLastCompletionYear(2),
					getFailureYear(2)
				]
			},
			
			getFailureCondition(2)
		]
	},
	
	getFailureYear(1)
]