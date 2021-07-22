import React from "react";
import {StyleSheet, Text} from "react-native";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";
import ContainerWithScroll from "../../components/general/ContainerWithScroll";
import MainWithNavigation from "../../components/general/MainWithNavigation";
import {TopBoxWithContent} from "../../components/general/TobBoxWithContent";


export default function TaskSingleScreen(props) {
	const ThemeStyles = useThemeStyles();
	const dataFromParams = props?.route?.params;

	return (
		<MainWithNavigation>
			<ContainerWithScroll
				header={<TopBoxWithContent id={dataFromParams.id} isTask={true}/>}
			>
				{dataFromParams?.description && (
					<Text style={[
						styles.content,
						{color: ThemeStyles.dark_text},
					]}>
						{dataFromParams?.description}
					</Text>
				)}
				{/*<Attachments attachments={dataFromParams?.files}/>*/}
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
