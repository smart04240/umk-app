import React from "react";
import { ScrollView, View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslated from "../../hooks/useTranslated";
import Translations from "../../constants/Translations";

import Container from "../../components/general/Container";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import TaskSingleInfo from "../../components/tasks/TaskSingleInfo";


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
			
			<TaskSingleInfo {...task_info } />

			<Container>
				<ScrollView>

					{ content && 
						<Text style={[
							styles.content, 
							{ color: ThemeStyles.dark_text },
						]}>
							{ content }
						</Text>
					}
					
					{ attachments && !!attachments.length &&
						<View>
							<Text style={[
								GeneralStyles.text_bold,
								{ color: ThemeStyles.dark_text, marginBottom: 17 }
							]}>
								{ useTranslated( Translations.Attachments )}
							</Text>

							{ attachments.map(( att, index ) => (
								<TouchableWithoutFeedback key={ index } onPress={ () => console.log( att.link )}>
									<View style={ styles.attachment }>
										<MaterialCommunityIcons
											name="download-outline"
											size={ 20 }
											color={ ThemeStyles.icon_color }
										/>

										<Text style={[
											styles.attachment_label,
											{ color: ThemeStyles.blue_text }
										]}>
											{ att.name }
										</Text>
									</View>
								</TouchableWithoutFeedback>
							))}
						</View>
					}

				</ScrollView>
			</Container>
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