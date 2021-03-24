import React from "react";
import {useSelector} from "react-redux";

export default function useTranslated(arg) {
    const locale = useSelector(state => state.locale);

    if (typeof arg === 'string')
        return arg;

    return arg[locale];
};
