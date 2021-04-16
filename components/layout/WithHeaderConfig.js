import React, {useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/core";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";

export default function WithHeaderConfig({
    left = true,
    right = true,
    title = true,
    hidden = false,
    borderless = false,
    children,
    rest,
}) {
    const navigation = useNavigation();
    const theme = useThemeStyles();

    useLayoutEffect(() => {
        const options = {
            headerStyle: {
                backgroundColor: theme.box_bg,
            },
            headerTitleStyle: {
                ...GeneralStyles.header_title,
                color: theme.blue_text,
                textAlign: "center",
            },
        };

        if (!left)
            options.headerLeft = () => null;

        if (!right)
            options.headerRight = () => null;

        if (!title)
            options.title = null;

        if (hidden)
            options.headerShown = false;

        if (borderless) {
            options.headerStyle = {
                ...options.headerStyle,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            };
        }

        navigation.setOptions({
            ...options,
            ...(rest || {}),
        });
    }, [theme, left, right, title, hidden, rest]);

    return children;
}
