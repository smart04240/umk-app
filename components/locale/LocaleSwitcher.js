import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Actions from "../../redux/Actions";
import useTranslated from "../../hooks/useTranslated";
import Translations from '../../constants/Translations';
import Switch from '../form/Switch';

const LocaleSwitcher = () => {

	const dispatch = useDispatch();
	const locale = useSelector( state => state.locale );

	return (
		<Switch 
			onValueChange={ () => dispatch( Actions.Locale.Toggle()) }
			value={ locale === "en" }
			label={ useTranslated( Translations.switchLanguage )}
		/>
	)
}


export default LocaleSwitcher;