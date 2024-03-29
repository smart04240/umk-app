import React from 'react';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import GeneralStyles from "../../constants/GeneralStyles";
import Translations from "../../constants/Translations";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useThemeStyles from "../../hooks/useThemeStyles";
import useTranslator from "../../hooks/useTranslator";

export const Attachments = ({attachments}) => {
    const translate = useTranslator();
    const ThemeStyles = useThemeStyles();

    const downloadFile = (att) => {
        if (!att.url) {
            Alert.alert(
                translate(Translations.FilesExceptionTitle),
                translate(Translations.FilesExceptionDescription),
                [
                    {
                        text: "OK",
                    },
                ]
            );

            return;
        }

        Linking.openURL(att.url)
    };

    return (
        attachments && !!attachments.length && (
            <View>
                <Text style={[
                    GeneralStyles.text_bold,
                    {color: ThemeStyles.dark_text, marginBottom: 17}
                ]}>
                    {translate(Translations.Attachments)}
                </Text>
                {attachments.map((att, index) => (
                    <TouchableOpacity key={index} onPress={() => downloadFile(att)}>
                        <View style={styles.attachment}>
                            <MaterialCommunityIcons
                                name="download-outline"
                                size={20}
                                color={ThemeStyles.icon_color}
                            />
                            <Text style={[
                                styles.attachment_label,
                                {color: ThemeStyles.blue_text}
                            ]}>
                                {att.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    )
};

const styles = {
    attachment: {
        ...GeneralStyles.row_ac,
        marginBottom: 13
    },
    attachment_label: {
        ...GeneralStyles.text_regular,
        ...GeneralStyles.row_wrap,
        flexShrink: 1,
        marginLeft: 20
    },
}
