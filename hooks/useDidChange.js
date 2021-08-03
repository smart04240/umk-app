import React from 'react';

export default function useDidChange ( fn, dependencies = []) {

	const [ did_mount, setDidMount ] = React.useState( false );

	React.useEffect(() => {

		did_mount
			? fn()
			: setDidMount( true );

	}, dependencies )
}