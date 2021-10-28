import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GeneralStyles from '../../../constants/GeneralStyles';
import Translations from '../../../constants/Translations';
import useThemeStyles from '../../../hooks/useThemeStyles';
import useTranslator from '../../../hooks/useTranslator';
import { yearToRomanNumeral } from "../../../helpers/functions";

const PointLabel = props => {

	const translate = useTranslator();
    const ThemeStyles = useThemeStyles();
	const { point_type, dates, label_position } = props;

	const roman_year_num = yearToRomanNumeral( props.year );

	const text_align =
		 label_position === "left"
			? "right"
			: label_position === "bottom" ? "center" : "left"


	const text_styles = [
		GeneralStyles.text_regular,
		{
			color: ThemeStyles.dark_blue_text,
			textAlign: text_align
		}
	];


	let label = "";
	let small_label = "";

	switch ( point_type ) {
		
		case "year":
			label = `${ translate( Translations.YearUpperCase )} ${ roman_year_num } ${ dates?.years ? dates.years : ""}`;
			small_label = dates?.start_date 
				? `${ translate( Translations.YearPointSmallLabel )} (${ translate( Translations.To )} ${ dates.start_date })` 
				: "";
			break;

		case "year_conditional":
			label = `${ translate( Translations.YearUpperCase )} ${ roman_year_num } (${ translate( Translations.ConditionalAdmission )})`;
			small_label = `${ dates?.start_date ? translate( Translations.YearPointSmallLabel ) + " " + dates.start_date : ""}`;
			break;

		case "year_retake":
			label = `${ translate( Translations.RetakeYear )} ${ roman_year_num }`;
			break;

		case "winter_exam_session":
			label = translate( Translations.WinterExamSession );
			small_label = dates?.start_date && dates?.end_date 
				? `(${ translate( Translations.From )} ${ dates.start_date } ${ translate( Translations.To )} ${ dates.end_date })` 
				: ""; 
			break;

		case "summer_exam_session":
			label = translate( Translations.SummerExamSession );
			small_label = dates?.start_date && dates?.end_date 
				? `(${ translate( Translations.From )} ${ dates.start_date } ${ translate( Translations.To )} ${ dates.end_date })` 
				: ""; 
			break;

		case "completion_year":
			label = `${ translate( Translations.CompletionYear )} ${ roman_year_num }`;
			break;

		case "application_for_a_conditional_admission":
			label = translate( Translations.ApplicationForAConditionalAdmission );
			small_label = dates?.start_date ? `(${ translate( Translations.To )} ${ dates.start_date } )` : "";  
			break;

		case "conditional_completing_a_year":
			label = `${ translate( Translations.ConditionalCompletingYear )} ${ roman_year_num }`;
			break;	

		case "passing_the_condition":
			label = translate( Translations.PassingTheCondition )
			break;

		case "failure_of_the_condition":
			label = translate( Translations.FailureOfTheCondition );
			break;

		case "failure_to_past_the_year":
			label = `${ translate( Translations.FailureToPastTheYear )} ${ roman_year_num }`	
			break;	

		case "application_for_approval_to_the_retake":
			label = translate( Translations.ApplicationForApprovalToTheRetake );
			small_label = dates?.start_date
				? `(${ translate( Translations.To )} ${ dates.start_date })`
				: ""
			break;	

		case "diploma_work":
			label = translate( Translations.DiplomaWorkUpperCase );
			break;	

		case "extension_of_the_diploma":
			label = translate( Translations.ExtensionOfTheDiploma )
			break;

		case "documents":
			label = `${ translate( Translations.DocumentsPoint )}`;
			small_label = dates?.start_date ? `(${ translate( Translations.To )} ${ dates.start_date })` : "";
			break;	

		case "failure_to_requested_documents":
			label = translate( Translations.FailureToRequestedDocuments );
			break;	

		case "deletion_from_the_student_list":
			label = translate( Translations.DeletionFromTheStudentList );
			break;	

		case "upload_to_APS_system":
			label = translate( Translations.UploadToAPSSystemPoint )
			break;	

		case "defence":
			label = translate( Translations.DefenceUpperCase )
			break;	
	}


	return (
		<View style={[
			styles.label_box,
			{
				backgroundColor: ThemeStyles.main_bg
			},
		]}>
			{ !!label && 
				<Text style={ text_styles }>
					{ label }
				</Text>
			}

			{ !!small_label &&
				<Text style={[
					...text_styles,
					{ fontSize: 12 }
				]} >
					{ small_label }
				</Text>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	label_box: {
		width: "100%",
		paddingHorizontal: 3,
		paddingVertical: 3,
	}
})

export default PointLabel;
