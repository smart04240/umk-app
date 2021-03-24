import React from "react";
import {useSelector} from "react-redux";

export default function useThemeStyles(styles) {
    const theme = useSelector(state => state.theme);
    return styles[theme] || styles.light;
};
