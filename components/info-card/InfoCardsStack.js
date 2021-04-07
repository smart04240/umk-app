import React from 'react';
import { View } from 'react-native';
import Layout from '../../constants/Layout';

import InfoCard from './InfoCard';

const InfoCardsStack = props => {

	const { cards } = props;

	return (
		<View style={{ width: "100%", minHeight: Layout.height * 0.7 }}>
			{ !!cards && !!cards.length && 
				cards.map(( card, index ) => 
					<InfoCard 
						key={ index } 
						{...card }
						item_index={ index }
						total_amount={ cards.length }
						active={ props.active_index === index } 
					/> 
				)
			}
		</View>
	)
}


export default InfoCardsStack;