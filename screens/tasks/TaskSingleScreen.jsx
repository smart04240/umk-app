import React from "react";
import {Text, StyleSheet } from "react-native";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import {Attachments} from "../../components/buttons/Attachments";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";


export default function TaskSingleScreen( props ) {
	const ThemeStyles = useThemeStyles();

	const id = 1;
	const title = "Tytuł zadania na dwie linijki tekstu";
	const category = "Egzamin";
	const address = "Aula 12";
	const date_time = "12.03.2021, 14:00";
	const status = "Niewykonane";

	const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";


	const attachments = [
		{ name: "Załącznik 1", link: "link" },
		{ name: "Załącznik 2", link: "link 2" }
	];

	const task_info = { id, title, category, address, date_time, status };

	return (
		<MainWithNavigation>
			<ContainerWithScroll
				header={<TopBoxWithContent {...task_info} isTask={true}/>}
			>
				{ content &&
					<Text style={[
						styles.content,
						{ color: ThemeStyles.dark_text },
					]}>
						{ content }
					</Text>
				}
				<Attachments attachments={attachments}/>
			</ContainerWithScroll>
		</MainWithNavigation>
	)
}

const styles = StyleSheet.create({
	content: {
		...GeneralStyles.text_regular,
		marginBottom: 20
	},
	attachment: {
		...GeneralStyles.row_ac,
		marginBottom: 13
	},
	attachment_label: {
		...GeneralStyles.text_regular,
		...GeneralStyles.row_wrap,
		flexShrink: 1,
		marginLeft: 20
	}
});
