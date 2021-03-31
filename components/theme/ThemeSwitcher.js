import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Actions from "../../redux/Actions";
import useTranslated from "../../hooks/useTranslated";
import Translations from '../../constants/Translations';
import Switch from '../form/Switch';

const ThemeSwitcher = props => {

	const dispatch = useDispatch();
	const theme = useSelector( state => state.theme );

	return (
		<Switch 
			onValueChange={ () => dispatch( Actions.Theme.Toggle()) }
			value={ theme === "dark" }
			label={ useTranslated( Translations.TurnOnDarkTheme )}
			style={ props.style }
		/>
	)
}


export default ThemeSwitcher;