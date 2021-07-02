import React from 'react';
import {Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import HTML from 'react-native-render-html';
import Colors from "../../constants/Colors";
import GeneralStyles from "../../constants/GeneralStyles";
import useThemeStyles from "../../hooks/useThemeStyles";


export const HtmlParser = ({html = {}, pStyles = {}, textStyles = {}}) => {
    const navigation = useNavigation();
    const theme = useThemeStyles();

    if (!html) return null;

    return (
        <HTML
            source={{html: html}}
            baseFontStyle={{
                ...GeneralStyles.text_regular,
                color: theme.dark_text
            }}
            tagsStyles={{
                a: {...textStyles, color: Colors.white},
                p: {...textStyles, ...pStyles},
                ul: {...textStyles, color: Colors.white},
                li: {...textStyles, color: Colors.white}
            }}
            renderers={{
                p: (htmlAttribs, children, convertedCSSStyles, passProps) => (
                    <Text
                        key={passProps.key}
                        style={{
                            marginBottom: 16,
                            ...convertedCSSStyles,
                            ...pStyles
                        }}
                    >
                        {children}
                    </Text>
                ),

                ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                    return <View
                        key={passProps.key}
                        style={{
                            paddingLeft: 15,
                            ...convertedCSSStyles
                        }}>
                        {children}
                    </View>;
                },

                li: (htmlAttribs, children, convertedCSSStyles, passProps) => (
                    <Text
                        key={passProps.key}
                        style={{
                            color: Colors.white,
                            marginBottom: 6,
                            ...convertedCSSStyles
                        }}
                    >
                        {`\u2022`} {children}
                    </Text>
                )
            }}
        />
    )
}
