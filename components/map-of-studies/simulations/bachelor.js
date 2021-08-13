
import { getCompletionYear, getLastCompletionYear, getConditionalCompletionYear, getFailureYear, getFailureCondition } from "./simulations_parts";

const same_last_part =  [
	getLastCompletionYear(3),
	getFailureYear(3)
]


export default [
	{
		...getCompletionYear(1),
		options: [
			{
				...getCompletionYear(2),
				options: same_last_part
			},
			{
				...getConditionalCompletionYear(2),
				options: [
					{
						name: "zaliczenie warunku",
						value: "S",
						options: same_last_part
					},

					getFailureCondition(2)
				]
			},
			
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
					{
						...getCompletionYear(2),
						options: same_last_part
					},
					{
						...getConditionalCompletionYear(2),
						options: [
							{
								name: "zaliczenie warunku",
								value: "S",
								options: same_last_part
							},
							
							getFailureCondition(2)
						]
					},
					
					getFailureYear(2)
				]
			},
			
			getFailureCondition(2)
		]
	},
	
	getFailureYear(1)
]