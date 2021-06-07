import React from 'react';
import { useSelector } from 'react-redux';
import RoundedImage from '../general/RoundedImage';

const ProfileAvatar = props => {

	const user = useSelector( state => state.user );
	const { size } = props;
	const avatar = { uri: user?.avatar_url } || require("../../assets/images/avatar.jpg");

	return (
		<RoundedImage
			size={ size || 77 }
			img_source={ avatar }
		/>
	)
}

export default ProfileAvatar;