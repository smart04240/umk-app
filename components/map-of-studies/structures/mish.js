import StartCircle from "../StartCircle";
import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";

import { getCompletionBranch, getConditionalCompletionBranch, getFailureBranch, getPreDiplomaPart, getMISHEndPart } from "./structure_parts";


export default [
	{
		Component: Branch,
		children: { Component: StartCircle }
	},
	{
		Component: Branch,
		year: 1,
		children: { 
			Component: Point,
			year: 1,
			term_field_id: 1,
			term_field_tags: "#year#years #term_field#start_date", 
			point_type: "year",
			label_position: "left", 
			bottom_margin: 5 
		}
	},
	{
		Component: BranchesNode,
		year: 1,
		year_status: "1",
		branches: [
			{
				Component: Branch,
				year: 1,
				children: [
					{
						Component: Point,
						year: 1,
						term_field_id: 4,
						term_field_tags: "#term_field#start_date",
						point_type: "submission_the_application",
						bottom_margin: 5
					},
					{ 
						Component: Point, 
						year: 1,
						term_field_id: 6,
						term_field_tags: "#term_field#start_date #term_field#end_date",
						point_type: "winter_exam_session",
						bottom_margin: 20 
					},
					{
						Component: Point,
						year: 1,
						term_field_id: 7,
						term_field_tags: "#term_field#start_date #term_field#end_date",
						point_type: "winter_retake_session",
						bottom_margin: 20 
					},
					{
						Component: Point,
						year: 1,
						term_field_id: 11,
						term_field_tags: "#term_field#start_date #term_field#end_date",
						point_type: "summer_prepare_docs",
						bottom_margin: 20
					},
					{
						Component: Point,
						year: 1,
						term_field_id: 12,
						term_field_tags: "#term_field#start_date #term_field#end_date",
						point_type: "chose_study_path",
						bottom_margin: 20
					},
					{
						Component: Point, 
						year: 1,
						term_field_id: 8,
						term_field_tags: "#term_field#start_date #term_field#end_date",
						point_type: "summer_exam_session",
						bottom_margin: 20 
					},
					{
						Component: Point,
						year: 1,
						term_field_id: 9,
						term_field_tags: "#term_field#start_date #term_field#end_date",
						point_type: "summer_retake_session",
						bottom_margin: 20 
					},
					{
						Component: Point,
						year: 1,
						term_field_id: 8,
						point_type: "summer_after_session",
						bottom_margin: 20
					},
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
						point_type: "failure_to_submit_the_program", 
						bottom_margin: 20 
					},
					{ 
						Component: Point,
						year: 1,
						point_type: "deletion_from_the_student_list",
						bottom_margin: 0 
					}
				]
			}
		]
	},
	// If you uncomment this part it will add one more year to map
	// {
	// 	Component: BranchesNode,
	// 	year: 1,
	// 	branches: [
	// 		getCompletionBranch(1),
	// 		getConditionalCompletionBranch(1),
	// 		getFailureBranch(1)
	// 	]
	// },
	getPreDiplomaPart(1),
	getMISHEndPart()
];