import StartCircle from "../StartCircle";
import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";

import { getBeginningBranch, getCompletionBranch, getConditionalCompletionBranch, getFailureBranch, getPreDiplomaPart, getDiplomaParts } from "./structure_parts";


export default [
	{
		Component: Branch,
		children: { Component: StartCircle }
	},
	
	{
		Component: Branch,
		year: 1,
		children: [
			{ 
				Component: Point,
				year: 1,
				term_field_id: 1, 
				label_position: "left",
				label: "ROK I #year#years", 
				small_label: "Wnioski ogólne\n(do #term_field#start_date)", 
				bottom_margin: 5 
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 4,
				label_position: "left",
				label: "Złożenie wniosków\n(programy studiów)",
				small_label: "(do #term_field#start_date)",
				bottom_margin: 5
			}
		]
	},

	{
		Component: BranchesNode,
		year: 1,
		branches: [
			{
				Component: Branch,
				year: 1,
				children: [
					{ 
						Component: Point, 
						year: 1,
						term_field_id: 6,
						label: "Sesja egzaminacyjna zimowa", 
						small_label: "(od #term_field#start_date do #term_field#end_date)", 
						bottom_margin: 20 
					},
					{
						Component: Point, 
						year: 1,
						term_field_id: 7,
						label: "Sesja egzaminacyjna letnia", 
						small_label: "(od #term_field#start_date do #term_field#end_date)", 
						bottom_margin: 20 
					}
				]
			},
			{
				Component: Branch,
				year: 1,
				dead_end: true,
				children: [
					{ 
						Component: Point, 
						year: 1,
						label: "niezłożenie programu", 
						bottom_margin: 20 
					},
					{ 
						Component: Point,
						year: 1,
						label: "skreślenie z listy studnetów", 
						bottom_margin: 0 
					}
				]
			}
		]
	},

	{
		Component: BranchesNode,
		year: 1,
		branches: [
			getCompletionBranch(1),
			getConditionalCompletionBranch(1),
			getFailureBranch(1)
		]
	},

	getPreDiplomaPart(2),

	...getDiplomaParts(2)
]