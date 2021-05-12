import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

import GeneralStyles from '../../../constants/GeneralStyles';
import useThemeStyles from '../../../hooks/useThemeStyles';
import { isFunction } from '../../../helpers/functions';
import Translations from '../../../constants/Translations';
import useTranslator from "../../../hooks/useTranslator";

const DocPicker = props => {
	const translate = useTranslator();
	const ThemeStyles = useThemeStyles();
	const {label, onChange} = props;
	const document_opt = props.document_opt || {};
	const [files, setFiles] = useState(props?.files || []);

	const addDocumentsPress = () => {
		DocumentPicker.getDocumentAsync(document_opt)
			.then(res => {
				if (res.type === "success") {
					const file_already_added = files.find(item => item.size === res.size && item.name === res.name);

					if (!file_already_added) {
						setFiles([...files, {
							name: res.name,
							uri: res.uri,
							size: res.size
						}]);
					}
				}
			})
	}

	const removeFile = index => setFiles(files.filter((item, i) => index !== i));

	useEffect(() => isFunction(onChange) && onChange({name: props.name || "files", value: files}), [files]);

	return (
		<View style={[
			styles.container,
			props.container_style || {}
		]}>
			<Text style={[
				GeneralStyles.text_regular,
				{marginBottom: 15},
				{color: ThemeStyles.dark_text}
			]}>
				{label || translate(Translations.AddAttachments)}
			</Text>
			<View>
				{files && !!files.length && files.map((file, index) => (
					<View key={index} style={[
						styles.file_row,
						props.file_row_style || {}
					]}>
						<MaterialCommunityIcons
							name="download-outline"
							size={20}
							color={ThemeStyles.icon_color}
						/>
						<Text style={[
							styles.file_label,
							{color: ThemeStyles.blue_text},
							props.file_label_style || {}
						]}>
							{file.name}
						</Text>
						<TouchableOpacity
							style={{marginLeft: "auto"}}
							onPress={() => removeFile(index)}
						>
							<MaterialCommunityIcons name="close" size={20} color={ThemeStyles.icon_color}/>
						</TouchableOpacity>
					</View>
				))}
			</View>
			<TouchableOpacity
				style={[
					styles.button,
					{borderColor: ThemeStyles.blue_rgba(1), backgroundColor: ThemeStyles.blue_rgba(0)}
				]}
				onPress={addDocumentsPress}
			>
				<MaterialCommunityIcons
					name="plus-thick"
					size={15}
					color={ThemeStyles.icon_color}
				/>
				<Text style={[
					GeneralStyles.text_regular,
					{marginLeft: 12},
					{color: ThemeStyles.blue_text}
				]}>
					{translate(Translations.AddNewAttachment)}
				</Text>
			</TouchableOpacity>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 17
	},
	file_row: {
		...GeneralStyles.row_ac,
		marginBottom: 13
	},
	file_label: {
		...GeneralStyles.text_regular,
		...GeneralStyles.row_wrap,
		flexShrink: 1,
		marginRight: 15,
		marginLeft: 20
	},
	button: {
		...GeneralStyles.row_centered,
		width: "100%",
		borderRadius: 7,
		borderWidth: 1,
		paddingVertical: 11,
		paddingHorizontal: 13
	}
});


export default DocPicker;
