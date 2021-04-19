import React, {useLayoutEffect} from "react";
import {useNavigation} from "@react-navigation/core";
import useThemeStyles from "../../hooks/useThemeStyles";
import GeneralStyles from "../../constants/GeneralStyles";
import shadowGenerator from "../../helpers/shadowGenerator";
import {useHeaderHeight} from "@react-navigation/stack";
import {View} from "react-native";

export default function WithHeaderConfig({
    // visibility of left section
    left = true,

    // visibility of right section
    right = true,

    // visibility of title
    title = true,

    // completely hides header
    hidden = false,

    // removes shadow and bottom border
    borderless = false,

    // adds border radius from GeneralStyles.bottom_border_radius
    withBorderRadius = false,

    // removes background and pushes screen under the header
    transparent = false,

    // adds shadow, max 20
    elevation = 0,

    // same as 'transparent' but preserves styled background
    semitransparent = false,

    // object with additional options
    rest,

    children,
}) {
    const navigation = useNavigation();
    const theme = useThemeStyles();
    const headerHeight = useHeaderHeight();

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

        if (withBorderRadius) {
            options.headerStyle = {
                ...options.headerStyle,
                ...GeneralStyles.bottom_border_radius,
            };
        }

        if (transparent)
            options.headerTransparent = true;

        if (borderless) {
            options.headerStyle = {
                ...options.headerStyle,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            };
        }

        if (elevation) {
            options.headerStyle = {
                ...options.headerStyle,
                ...shadowGenerator(elevation),
            };
        }

        if (semitransparent) {
            options.headerTransparent = true;
            options.headerStyle.height = headerHeight;
            options.headerBackground = () => <View style={options.headerStyle}/>;
        }

        navigation.setOptions({
            ...options,
            ...(rest || {}),
        });
    }, [theme, left, right, title, hidden, borderless, withBorderRadius, elevation, transparent, rest]);

    return children;
}
