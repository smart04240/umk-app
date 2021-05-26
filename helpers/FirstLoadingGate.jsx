import React from "react";
import Loader from "../components/general/Loader";
import useTranslator from "../hooks/useTranslator";
import Translations from "../constants/Translations";
import {useSelector} from "react-redux";
import ErrorView from "../components/general/ErrorView";

/**
 * Prevents access to the main app content until all data is cached, see DataManager
 * @param children
 * @returns {JSX.Element}
 */
export default function FirstLoadingGate({children}) {
    const translate = useTranslator();
    const {online, cached} = useSelector(state => state.app);

    // is first launch but no internet
    if (!cached && !online)
        return <ErrorView text={translate(Translations.FirstLoadingRequired)}/>;

    // visible loading
    if (!cached && online)
        return <Loader text={translate(Translations.FirstLoading)}/>;

    return children;
};
