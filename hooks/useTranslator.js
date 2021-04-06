import React from "react";
import {useSelector} from "react-redux";

export default function useTranslator() {
    const locale = useSelector(state => state.locale);
    return React.useCallback(arg => arg ? (typeof arg === 'string' ? arg : arg[locale]) : null, [locale]);
};
