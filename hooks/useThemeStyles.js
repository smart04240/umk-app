import React from "react";
import {useSelector} from "react-redux";
import {ucfirst} from "../helpers/functions";

export default function useThemeStyles(styles) {
    const theme = ucfirst(useSelector(state => state.theme));
    return styles[theme] || styles.Light;
};
