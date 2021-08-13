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

	{
		Component: BranchesNode,
		year: 2,
		branches: [
			getCompletionBranch(2),
			getConditionalCompletionBranch(2),
			getFailureBranch(2)
		]
	},

	{
		Component: BranchesNode,
		year: 3,
		branches: [
			getCompletionBranch(3),
			getConditionalCompletionBranch(3),
			getFailureBranch(3)
		]
	},

	{
		Component: BranchesNode,
		year: 4,
		branches: [
			getCompletionBranch(4),
			getConditionalCompletionBranch(4),
			getFailureBranch(4)
		]
	},

	getPreDiplomaPart(5),

	...getDiplomaParts(5)
]