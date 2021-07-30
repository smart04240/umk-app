import React, { useState } from 'react';
import { LayoutAnimation, Platform, View, UIManager, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Line from './Line';
import MOSConstants from '../../constants/MOSConstants';
import Row from '../general/Row';
import GeneralStyles from '../../constants/GeneralStyles';

if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}


const getChildComponent = ( obj, extra ) => {
	const { Component, ...props } = obj;
	return 
}

const DropdownGroup = props => {

	const [ open, setOpen ] = useState( false );
	const icon_name = open ? "minus" : "plus";

	const { children } = props;

	return (
		<View style={{ width: "100%" }}>

			<View style={{ alignItems: "center" }}>
				<View style={{ alignItems: "center" }}>

					<TouchableOpacity 
						activeOpacity={ 0.8 }
						style={{ paddingHorizontal: 5, justifyContent: "center" }}
						onPress={ () => {
							LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
							setOpen( !open )
						}}
					>
						<LinearGradient
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 0 }}
							colors={[ "#034EA2", "#226EC5" ]}
							style={{
								...GeneralStyles.row_centered,
								width: MOSConstants.DropdownCircle.Size,
								height: MOSConstants.DropdownCircle.Size,
								borderRadius: MOSConstants.DropdownCircle.Radius
							}}
						>
							<MaterialCommunityIcons 
								name={ icon_name } 
								size={ 19 } 
								color="#fff"
							/>

						</LinearGradient>
					</TouchableOpacity>

					<Line
						position="relative"
						height={ 20 }
					/>

				</View>
			</View>

			{ open && 
				<View>
					{ children && !!children.length && 
						children.map(({ Component, ...props }, i ) => (
							<Component key={ i } {...props } />
						))
					}
				</View>
			}
		</View>
	)
}


export default DropdownGroup;