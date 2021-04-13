import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Colors from "../../constants/Colors";
import GeneralStyles from '../../constants/GeneralStyles';
import useThemeStyles from '../../hooks/useThemeStyles';

import TopBox from "../../components/general/TopBox";
import Button from '../form/Button';
import Routes from '../../constants/Routes';
import useTranslated from '../../hooks/useTranslated';
import Translations from '../../constants/Translations';
import Layout from '../../constants/Layout';

const TaskSingleInfo = props => {

	const ThemeStyles = useThemeStyles();
	const navigation = useNavigation();
	const { id, title, category, address, date_time, status } = props;

	const info = [
		{ circle_color: Colors.Yellow, value: category },
		{ icon: "map-marker-outline", value: address },
		{ icon: "calendar-range", value: date_time },
		{ icon: "playlist-check", value: status },
	];

	const buttons = [
		{ label: useTranslated( Translations.MarkAsDone ), onPress: null },
		{ label: useTranslated( Translations.EditTheTask ), onPress: () => navigation.navigate( Routes.TaskEdit, { id } )}
	]

	return (
		<TopBox>
			{ title && 
				<Text style={[
						GeneralStyles.text_bold,
						{ color: ThemeStyles.dark_blue_text },
						{ marginBottom: 20 }
					]}>
						{ title }
				</Text>
			}

			<View>
				{ info.map(( item, index ) => (
					!!item.value
						? (
							<View key={ index } style={[
								GeneralStyles.row_ac,
								{ marginBottom: 20 }
							]}>

								{ !!item.circle_color && 
									<View style={[ 
										styles.circle,
										{ backgroundColor: item.circle_color } 
									]}/>
								}
								
								{ !!item.icon && 
									<MaterialCommunityIcons 
										name={ item.icon }
										size={ 22 }
										color={ ThemeStyles.icon_color }
									/>
								}

								<Text style={[
									GeneralStyles.text_regular,
									{ color: ThemeStyles.dark_blue_text },
									{ marginLeft: 30 }
								]}>
									{ item.value }
								</Text>
							</View>
						)
						: null
				))}
			</View>

			<View style={[
				GeneralStyles.row_ac,
				{ marginHorizontal: -5 }
			]}>
				{ buttons.map(( b, index ) => (
					<Button 
						key={ index }
						style={ styles.bottom_button }
						transparent_bg={ true }
						onPress={ b.onPress }
					> 
						{ b.label }
					</Button>
				)) }
			</View>
		</TopBox>
	)
}

const styles = StyleSheet.create({
	circle: {
		width: 18,
		height: 18,
		borderRadius: 9
	},

	bottom_button: {
		flexGrow: 1,
		flexShrink: 1,
		marginHorizontal: 5
	}
})


export default TaskSingleInfo;