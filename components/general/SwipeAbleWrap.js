import React from 'react';
import { View } from 'react-native';
import { isFunction } from '../../helpers/functions';

const SwipeAbleWrap = props => {

	const { onSwipeRight, onSwipeLeft } = props;

	const onTouch = (function () {

		const position = {
			"start" : null,
			"end": null
		}

		return ( e, type ) => {
			e.persist();

			const touch = e.nativeEvent.changedTouches[0];
			position[ type ] = { x: touch.pageX, y: touch.pageY };

			if ( type === "end" && position?.start?.x && position?.start?.y ) {
				
				const { start, end } = position;

				if ( Math.abs( start.x - end.x ) > 45 ) {
					start.x < end.x 
						? isFunction( onSwipeRight ) && onSwipeRight()
						: isFunction( onSwipeLeft ) && onSwipeLeft() 
				}
			}
		}
	})();

	return (
		<View 
			style={ props.style || {}}
			onTouchStart={ e => onTouch( e, "start" )}
			onTouchEnd={ e => onTouch( e, "end" )}
		>
			{ props.children }
		</View>
	)
}


export default SwipeAbleWrap;