import React from 'react';
import { View, ScrollView } from 'react-native';
import Container from './Container';

const ContainerWithScroll = props => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				{...props.rest}
			>
				<Container style={ props.container_style || {}}>
					{ props.children }
				</Container>
			</ScrollView>
		</View>
	)
}


export default ContainerWithScroll;
