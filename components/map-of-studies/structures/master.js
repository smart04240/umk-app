import StartCircle from "../StartCircle";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";

import { getBeginningBranch, getCompletionBranch, getConditionalCompletionBranch, getFailureBranch, getPreDiplomaPart, getDiplomaParts } from "./structure_parts";


export default [
	{
		Component: Branch,
		children: { Component: StartCircle }
	},
	
	getBeginningBranch(),

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
