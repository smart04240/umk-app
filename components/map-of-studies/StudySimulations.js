import React, { useState } from 'react';
import { View, Text } from 'react-native';

import useThemeStyles from '../../hooks/useThemeStyles';
import GeneralStyles from '../../constants/GeneralStyles';
import Layout from '../../constants/Layout';
import { getSimulationOptionByHistory } from '../../helpers/map-of-studies';
import useTranslator from '../../hooks/useTranslator';

import Button from "../form/Button";
import Translations from '../../constants/Translations';


const isButtonActive = ( value, choice ) => (
	Array.isArray( value )
		? value.includes( choice )
		: value === choice
)


const StudySimulations = props => {

	const translate = useTranslator();
    const ThemeStyles = useThemeStyles();

	const { base } = props;	
	const [ choices, setChoices ] = useState([]);
	
	const text_styles = [
		GeneralStyles.text_regular,
		{ color: ThemeStyles.dark_blue_text }
	];

	if ( !base ) return null;

	return (
		<View style={{ paddingHorizontal: Layout.paddingHorizontal }}>
			<Text style={ text_styles }>
				{ translate( Translations.WhatCouldHappen )}
			</Text>
			
			<Text style={[ text_styles, { marginBottom: 10 }]}>
				{ translate( Translations.ChooseOneOFOptions )}
			</Text>

			{ base && !!base.length &&
				base.map(( item, i ) => (
					<Button
						key={ i } 
						transparent_bg={ !isButtonActive( item.value, choices?.[0]) }
						onPress={() => setChoices([ Array.isArray( item.value ) ? item.value[0] : item.value ])}
					>
						{ item.name }
					</Button>
				))
			}

			{ choices && !!choices.length &&
				choices.map(( choice, index ) => {

					const choice_option = getSimulationOptionByHistory( choices.slice( 0, index + 1 ), base );

					return !choice_option?.options
						? <Text key={ choice } style={ text_styles }> { choice_option.text } </Text>
						: (
							<React.Fragment key={ choice + index }>
								<Text style={[ text_styles, { marginBottom: 10 }]}>
									{ translate( Translations.WhatsNext )}
								</Text>

								{ choice_option.options && !!choice_option.options.length &&
									choice_option.options.map(( item, i ) => (
										<Button
											key={ i }
											transparent_bg={ !isButtonActive( item.value, choices?.[ index + 1 ]) }
											onPress={() => {
												const value = Array.isArray( item.value ) ? item.value[0] : item.value;
												const new_choices = choices.slice(0, index + 1 );
												new_choices[ index + 1 ] = value; 
												setChoices( new_choices );
											}}
										>
											{ item.name }
										</Button>
									)) 
								}
							</React.Fragment>
						) 
				})
			}
		</View>
	)
}


export default StudySimulations;