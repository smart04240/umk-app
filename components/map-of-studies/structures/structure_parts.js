import MOSConstants from "../../../constants/MOSConstants";
import { yearToRomanNumeral } from "../../../helpers/functions";

import Point from "../point/Point";
import Branch from "../Branch";
import BranchesNode from "../BranchesNode";
import FinishCircle from "../FinishCircle";

export const getBeginningBranch = () => (
	{
		Component: Branch,
		year: 1,
		children: [
			{
				Component: Point,
				year: 1,
				term_field_id: 1,
				term_field_tags: "#year#years #term_field#start_date",
				point_type: "year",
				label_position: "left",
				bottom_margin: 5
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 6,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "winter_exam_session",
				label_position: "left",
				bottom_margin: 5
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 7,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "winter_retake_session",
				label_position: "left",
				bottom_margin: 20 
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 8,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "summer_exam_session",
				label_position: "left",
				bottom_margin: 5
			},
			{
				Component: Point,
				year: 1,
				term_field_id: 9,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "summer_retake_session",
				label_position: "left",
				bottom_margin: 20 
			}
		]
	}
)


export const getCompletionBranch = year => (
	{
		Component: Branch,
		year: year,
		year_status: [ "Z", "A", "S" ],
		children: [
			{ 
				Component: Point, 
				year: year, 
				point_type: "completion_year",
				bottom_margin: 20  
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 1,
				term_field_tags: "#year#years #term_field#start_date",
				point_type: "year",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 6,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "winter_exam_session",
				bottom_margin: 20  
			},
			{
				Component: Point,
				year: year + 1,
				term_field_id: 7,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "winter_retake_session",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 8,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "summer_exam_session",
				bottom_margin: 20  
			},
			{
				Component: Point,
				year: year + 1,
				term_field_id: 9,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "summer_retake_session",
				bottom_margin: 20 
			}
		]
	}
)


export const getConditionalCompletionBranch = year => (
	{
		Component: Branch,
		year: year,
		year_status: "W",
		children: [
			{ 
				Component: Point, 
				year: year,
				point_type: "conditional_completing_a_year",
				bottom_margin: 20 
			},
			{ 
				Component: Point,
				year: year,
				term_field_id: 3,
				term_field_tags: "#term_field#start_date",
				point_type: "application_for_a_conditional_admission",
				bottom_margin: 20
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 1,
				point_type: "year_conditional",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 6,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "winter_exam_session", 
				bottom_margin: 20 
			},
			{
				Component: Point,
				year: year + 1,
				term_field_id: 7,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "winter_retake_session",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year + 1,
				term_field_id: 8,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "summer_exam_session",
				bottom_margin: 20 
			},
			{
				Component: Point,
				year: year + 1,
				term_field_id: 9,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "summer_retake_session",
				bottom_margin: 20 
			},
			{
				Component: BranchesNode,
				year: year + 1,
				inner: true,
				branches: [
					{
						Component: Branch,
						year: year + 1,
						year_status: "S",
						children: {
							Component: Point,
							year: year + 1,
							point_type: "passing_the_condition",
							bottom_margin: 100
						}
					},
					{
						Component: Branch,
						year: year + 1,
						year_status: "T",
						dead_end: true,
						absolute: true,
						left: MOSConstants.Column.Default,
						children: [
							{ 
								Component: Point, 
								year: year + 1, 
								point_type: "failure_of_the_condition",
								bottom_margin: 20 
							},
							{ 
								Component: Point, 
								year: year + 1, 
								point_type: "year_retake"
							}
						]
					}
				]
			}
		]
	}
)


export const getFailureBranch = year => (
	{
		Component: Branch,
		year: year,
		year_status: [ "N", "R" ],
		dead_end: true,
		children: [
			{ 
				Component: Point, 
				year: year, 
				point_type: "failure_to_past_the_year", 
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year, 
				term_field_id: 2,
				term_field_tags: "#term_field#start_date #term_field#end_date",
				point_type: "application_for_approval_to_the_retake",
				bottom_margin: 20 
			},
			{ 
				Component: Point, 
				year: year,
				point_type: "year_retake"
			}
		]
	}
)


export const getPreDiplomaPart = year => (
	{
		Component: BranchesNode,
		year,
		branches: [
			{
				Component: Branch,
				year,
				year_status: [ "Z", "A" ],
				children: {
					Component: Point,
					year: year,
					point_type: "completion_year",
				}
			},

			getFailureBranch( year )
		]
	}
)


export const getDiplomaParts = year => (
	[
		{
			Component: Branch,
			year_status: [ "A", "Z", "S" ],
			year,
			children: {
				Component: Point,
				year,
				point_type: "diploma_work"
			}
		},
	
		{
			Component: BranchesNode,
			year_status: [ "A", "Z", "S" ],
			year,
			branches: [
				{
					Component: Branch,
					year,
					dead_end: true,
					children: { 
						Component: Point, 
						year, 
						point_type: "extension_of_the_diploma"
					}
				},
				{
					Component: Branch,
					year,
					children: {
						Component: Point,
						year,
						term_field_id: 10,
						term_field_tags: "#term_field#start_date",
						point_type: "documents",
						bottom_margin: 20
					}
				},
				{
					Component: Branch,
					year,
					dead_end: true,
					children: [
						{ 
							Component: Point,
							year, 
							point_type: "failure_to_requested_documents",
							bottom_margin: 20 
						},
						{ 
							Component: Point, 
							year, 
							point_type: "deletion_from_the_student_list"
						}
					]
				}
			]
		},
	
		{
			Component: Branch,
			year_status: [ "A", "Z", "S" ],
			year,
			dead_end: true,
			children: [
				{
					Component: Point,
					year,
					point_type: "upload_to_APS_system",
					bottom_margin: 20
				},
				{
					Component: Point,
					year,
					point_type: "defence",
					bottom_margin: 20
				},
				{ Component: FinishCircle }
			]
		}
	]
)


export const getMISHEndPart = () => (
	{
		Component: Branch,
		year: 2,
		year_status: [ "A", "Z", "S" ],
		dead_end: true,
		children: { 
			Component: FinishCircle,
			mish: true
		}
	}
)