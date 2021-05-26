import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Actions from "../../redux/Actions";
import Translations from '../../constants/Translations';
import Switch from '../form/Switch';
import useTranslator from "../../hooks/useTranslator";

const ThemeSwitcher = props => {
	const translate = useTranslator();
	const dispatch = useDispatch();
	const theme = useSelector( state => state.app.theme );

	return (
		<Switch 
			onValueChange={ () => dispatch( Actions.Theme.Toggle()) }
			value={ theme === "dark" }
			label={ translate( Translations.TurnOnDarkTheme )}
			style={ props.style }
		/>
	)
}


export default ThemeSwitcher;