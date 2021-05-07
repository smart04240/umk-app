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

const DropdownGroup = props => {

	const [ open, setOpen ] = useState( false );
	const icon_name = open ? "minus" : "plus";

	return (
		<View>

			<Row style={{ justifyContent: "center" }}>
				<View>

					<TouchableOpacity 
						activeOpacity={ 0.8 }
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
								marginBottom: 22,
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
						height={ MOSConstants.DropdownCircle.Size + 22 }
						left={ MOSConstants.DropdownCircle.Radius - MOSConstants.Line.Size / 2  }
					/>

				</View>
			</Row>

			{ open && 
				<View>
					{ props.children }
				</View>
			}
		</View>
	)
}


export default DropdownGroup;