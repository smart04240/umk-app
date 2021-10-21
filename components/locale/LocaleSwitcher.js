import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Actions from "../../redux/Actions";
import Translations from '../../constants/Translations';
import Switch from '../form/Switch';
import useTranslator from "../../hooks/useTranslator";

const LocaleSwitcher = () => {
    const translate = useTranslator();
    const dispatch = useDispatch();
    const locale = useSelector(state => state.app.locale);

    return (
        <Switch
            onValueChange={() => dispatch(Actions.Locale.Toggle())}
            value={locale === "en"}
            label={translate(Translations.switchLanguage)}
        />
    )
}


export default LocaleSwitcher;